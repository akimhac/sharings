import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Configuration Stripe et Supabase
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51RFXd74TwnyssOIs2UVMct1Y4gPO6nSxF7kG0v1cjMMKz0UOtFEpR0Fj2YC9UnsXFUv5GiQmsiXOipM5KFvDMriL001zA3PhuJ')
const supabase = createClient(
  'https://cjyxjtgserylbfkbpdou.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeXhqdGdzZXJ5bGJma2JwZG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2Nzc4NzksImV4cCI6MjA2MTI1Mzg3OX0.3qHLxUf7-F2inblyAKtGzlxcOaHuIL8lk-OdGJcj604'
)

// Middleware avec gestion d'erreurs
app.use(helmet())
app.use(morgan('combined'))
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://*.app.github.dev'],
  credentials: true
}))

// Middleware webhook Stripe AVANT express.json()
app.use('/api/stripe/webhook', express.raw({type: 'application/json'}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Routes principales
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend Sharings stable',
    timestamp: new Date().toISOString(),
    version: '2.0.0'
  })
})

// Stripe Checkout
app.post('/api/payments/create-checkout', async (req, res) => {
  try {
    console.log('Creating checkout session...')
    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: 'price_1S2XnC4TwnyssOIsEPWvi9Iy',
        quantity: 1,
      }],
      success_url: 'http://localhost:5173/dashboard?success=true',
      cancel_url: 'http://localhost:5173/dashboard?canceled=true',
      metadata: {
        userId: req.body.userId || 'anonymous'
      }
    })

    console.log('Checkout session created:', session.id)
    res.json({ url: session.url })
  } catch (error) {
    console.error('Erreur création checkout:', error)
    res.status(500).json({ 
      error: 'Erreur de paiement', 
      details: error.message 
    })
  }
})

// Vérification statut abonnement
app.get('/api/payments/subscription-status/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    
    const { data, error } = await supabase
      .from('stripe_user_subscriptions')
      .select('status, current_period_end')
      .eq('user_id', userId)
      .eq('status', 'active')
      .gte('current_period_end', new Date().toISOString())
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    res.json({ 
      hasActiveSubscription: !!data,
      subscription: data
    })
  } catch (error) {
    console.error('Erreur vérification abonnement:', error)
    res.json({ hasActiveSubscription: false })
  }
})

// WEBHOOK STRIPE - SYNCHRONISATION AUTOMATIQUE
app.post('/api/stripe/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature']
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_key'
  
  let event
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
    console.log('Webhook reçu:', event.type)
  } catch (err) {
    console.error('Erreur signature webhook:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object)
        break
        
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object)
        break
        
      case 'customer.subscription.deleted':
        await handleSubscriptionCanceled(event.data.object)
        break
        
      default:
        console.log(`Événement non géré: ${event.type}`)
    }

    res.json({ received: true })
  } catch (error) {
    console.error('Erreur traitement webhook:', error)
    res.status(500).json({ error: 'Erreur traitement webhook' })
  }
})

// Fonctions de synchronisation Stripe -> Supabase
async function handleCheckoutCompleted(session) {
  console.log('Checkout complété:', session.id)
  
  if (session.mode === 'subscription') {
    const subscription = await stripe.subscriptions.retrieve(session.subscription)
    await handleSubscriptionUpdate(subscription)
  }
}

async function handleSubscriptionUpdate(subscription) {
  console.log('Mise à jour abonnement:', subscription.id)
  
  try {
    // Récupérer le customer pour lier à l'utilisateur
    const customer = await stripe.customers.retrieve(subscription.customer)
    
    const { error } = await supabase
      .from('stripe_user_subscriptions')
      .upsert({
        user_id: customer.metadata?.user_id || subscription.metadata?.userId,
        stripe_customer_id: subscription.customer,
        stripe_subscription_id: subscription.id,
        stripe_price_id: subscription.items.data[0].price.id,
        status: subscription.status,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('Erreur Supabase:', error)
    } else {
      console.log('Abonnement synchronisé dans Supabase')
    }
  } catch (error) {
    console.error('Erreur sync abonnement:', error)
  }
}

async function handleSubscriptionCanceled(subscription) {
  console.log('Abonnement annulé:', subscription.id)
  
  const { error } = await supabase
    .from('stripe_user_subscriptions')
    .update({ 
      status: 'canceled',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    console.error('Erreur annulation:', error)
  }
}

// Gestion d'erreurs globale
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err)
  res.status(500).json({ 
    error: 'Erreur serveur interne',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
})

// Démarrage serveur avec gestion d'erreurs
const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Backend Sharings stable sur le port ${PORT}`)
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
    console.log(`💳 Stripe webhook: http://localhost:${PORT}/api/stripe/webhook`)
  })

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} occupé, essai port ${PORT + 1}...`)
      PORT = PORT + 1
      setTimeout(startServer, 1000)
    } else {
      console.error('Erreur serveur:', err)
      process.exit(1)
    }
  })

  // Arrêt propre
  process.on('SIGTERM', () => {
    console.log('Arrêt du serveur...')
    server.close(() => {
      console.log('Serveur arrêté proprement')
      process.exit(0)
    })
  })
}

startServer()
