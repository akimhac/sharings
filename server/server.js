const express = require('express')
const cors = require('cors')

const app = express()
let PORT = 3001

// Middleware essentiel
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}))
app.use(express.json())

// Route de santé - critique
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend stable v3',
    timestamp: new Date().toISOString(),
    port: PORT
  })
})

// Stripe checkout - version robuste
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
      success_url: 'http://localhost:5173/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/dashboard?canceled=true',
      metadata: { userId: req.body.userId || 'anonymous' }
    })

    console.log('Checkout créé:', session.id)
    res.json({ url: session.url, sessionId: session.id })
    
  } catch (error) {
    console.error('Erreur Stripe:', error.message)
    res.status(500).json({ 
      error: 'Erreur de paiement',
      message: error.message 
    })
  }
})

// Vérification abonnement - simplifié
app.get('/api/payments/subscription-status/:userId', (req, res) => {
  // Pour l'instant, retourner false - on implémentera la vraie logique après
  res.json({ hasActiveSubscription: false })
})

// Gestion d'erreurs globale
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err)
  res.status(500).json({ error: 'Erreur interne' })
})

// Fonction de démarrage avec retry automatique
function startServer() {
  const server = app.listen(PORT, () => {
    console.log(`Backend stable sur port ${PORT}`)
    console.log(`Health: http://localhost:${PORT}/api/health`)
  })

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} occupé, essai ${PORT + 1}`)
      PORT++
      setTimeout(startServer, 1000)
    } else {
      console.error('Erreur serveur:', err)
    }
  })
}

startServer()
