const express = require('express')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')

const app = express()
const PORT = 3001

const supabase = createClient(
  'https://cjyxjtgserylbfkbpdou.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqeXhqdGdzZXJ5bGJma2JwZG91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2Nzc4NzksImV4cCI6MjA2MTI1Mzg3OX0.3qHLxUf7-F2inblyAKtGzlxcOaHuIL8lk-OdGJcj604'
)

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend stable v2' })
})

app.post('/api/payments/create-checkout', async (req, res) => {
  try {
    const stripe = require('stripe')('sk_test_51RFXd74TwnyssOIs2UVMct1Y4gPO6nSxF7kG0v1cjMMKz0UOtFEpR0Fj2YC9UnsXFUv5GiQmsiXOipM5KFvDMriL001zA3PhuJ')
    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: 'price_1S2XnC4TwnyssOIsEPWvi9Iy', quantity: 1 }],
      success_url: 'http://localhost:5173/dashboard?success=true',
      cancel_url: 'http://localhost:5173/dashboard?canceled=true'
    })

    res.json({ url: session.url })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/api/payments/subscription-status/:userId', async (req, res) => {
  try {
    const { data } = await supabase
      .from('stripe_user_subscriptions')
      .select('status')
      .eq('user_id', req.params.userId)
      .eq('status', 'active')
      .single()
    
    res.json({ hasActiveSubscription: !!data })
  } catch (error) {
    res.json({ hasActiveSubscription: false })
  }
})

app.listen(PORT, () => {
  console.log(`Backend v2 sur port ${PORT}`)
})

// Webhook Stripe - ajouter avant app.listen()
app.use('/webhook', express.raw({type: 'application/json'}))

app.post('/api/stripe/webhook', async (req, res) => {
  const stripe = require('stripe')('sk_test_51RFXd74TwnyssOIs2UVMct1Y4gPO6nSxF7kG0v1cjMMKz0UOtFEpR0Fj2YC9UnsXFUv5GiQmsiXOipM5KFvDMriL001zA3PhuJ')
  
  try {
    const event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], 'whsec_test')
    
    if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object
      await supabase.from('stripe_user_subscriptions').upsert({
        stripe_subscription_id: subscription.id,
        status: subscription.status,
        current_period_end: new Date(subscription.current_period_end * 1000)
      })
    }
    
    res.json({received: true})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})
