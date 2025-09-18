const express = require('express')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')

const app = express()
let PORT = 3001

// Configuration Supabase
const supabase = createClient(
  'https://cjyxjtgserylbfkbpdou.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeXhqdGdzZXJ5bGJma2JwZG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2Nzc4NzksImV4cCI6MjA2MTI1Mzg3OX0.3qHLxUf7-F2inblyAKtGzlxcOaHuIL8lk-OdGJcj604'
)

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}))

// Webhook AVANT express.json() - IMPORTANT
app.use('/api/stripe/webhook', express.raw({type: 'application/json'}))
app.use(express.json())

// Routes existantes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend avec webhook Stripe',
    timestamp: new Date().toISOString()
  })
})

app.post('/api/payments/create-checkout', async (req, res) => {
  try {
    const stripe = require('stripe')('sk_test_51RFXd74TwnyssOIs2UVMct1Y4gPO6nSxF7kG0v1cjMMKz0UOtFEpR0Fj2YC9UnsXFUv5GiQmsiXOipM5KFvDMriL001zA3PhuJ')
    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: 'price_1S2XnC4TwnyssOIsEPWvi9Iy',
        quantity: 1,
      }],
      success_url: 'http://localhost:5173/dashboard?success=true',
      cancel_url: 'http://localhost:5173/dashboard?canceled=true',
      metadata: { userId: req.body.userId || 'anonymous' }
    })

    res.json({ url: session.url })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// WEBHOOK STRIPE - Synchronisation automatique
app.post('/api/stripe/webhook', async (req, res) => {
  const stripe = require('stripe')('sk_test_51RFXd74TwnyssOIs2UVMct1Y4gPO6nSxF7kG0v1cjMMKz0UOtFEpR0Fj2YC9UnsXFUv5GiQmsiXOipM5KFvDMriL001zA3PhuJ')
  
  try {
    // En test, on accepte sans vérification de signature
    const event = JSON.parse(req.body.toString())
    console.log('Webhook reçu:', event.type)

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
        console.log('Événement non géré:', event.type)
    }

    res.json({ received: true })
  } catch (error) {
    console.error('Erreur webhook:', error)
    res.status(500).json({ error: error.message })
  }
})

// Fonctions de synchronisation
async function handleCheckoutCompleted(session) {
  console.log('Checkout complété:', session.id)
  
  if (session.mode === 'subscription') {
    const stripe = require('stripe')('sk_test_51RFXd74TwnyssOIs2UVMct1Y4gPO6nSxF7kG0v1cjMMKz0UOtFEpR0Fj2YC9UnsXFUv5GiQmsiXOipM5KFvDMriL001zA3PhuJ')
    const subscription = await stripe.subscriptions.retrieve(session.subscription)
    await handleSubscriptionUpdate(subscription)
  }
}

async function handleSubscriptionUpdate(subscription) {
  console.log('Mise à jour abonnement:', subscription.id)
  
  try {
    const { error } = await supabase
      .from('stripe_user_subscriptions')
      .upsert({
        stripe_subscription_id: subscription.id,
        stripe_customer_id: subscription.customer,
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
    console.error('Erreur sync:', error)
  }
}

async function handleSubscriptionCanceled(subscription) {
  console.log('Abonnement annulé:', subscription.id)
  
  const { error } = await supabase
    .from('stripe_user_subscriptions')
    .update({ status: 'canceled', updated_at: new Date().toISOString() })
    .eq('stripe_subscription_id', subscription.id)

  if (error) console.error('Erreur annulation:', error)
}

// Vérification abonnement améliorée
app.get('/api/payments/subscription-status/:userId', async (req, res) => {
  try {
    const { data } = await supabase
      .from('stripe_user_subscriptions')
      .select('status, current_period_end')
      .eq('user_id', req.params.userId)
      .eq('status', 'active')
      .gte('current_period_end', new Date().toISOString())
      .single()

    res.json({ hasActiveSubscription: !!data })
  } catch (error) {
    res.json({ hasActiveSubscription: false })
  }
})

// Démarrage serveur
function startServer() {
  const server = app.listen(PORT, () => {
    console.log(`Backend avec webhook sur port ${PORT}`)
    console.log(`Webhook: http://localhost:${PORT}/api/stripe/webhook`)
  })

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      PORT++
      setTimeout(startServer, 1000)
    }
  })
}

startServer()
