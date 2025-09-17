const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend stable sans secrets' })
})

app.post('/api/payments/create-checkout', async (req, res) => {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: 'http://localhost:5173/dashboard?success=true',
      cancel_url: 'http://localhost:5173/dashboard?canceled=true'
    })
    res.json({ url: session.url })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(3001, () => console.log('Server on 3001'))
