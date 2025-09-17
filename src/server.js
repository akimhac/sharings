const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de base
app.use(cors({
  origin: ['http://localhost:3000', 'https://jubilant-guacamole-r4wwqgjxp5x7257w5-3000.app.github.dev'],
  credentials: true
}));
app.use(express.json());

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend Sharings stable',
    timestamp: new Date().toISOString()
  });
});

// Route Stripe checkout simplifiée
app.post('/api/payments/create-checkout', async (req, res) => {
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: 'price_1S2XnC4TwnyssOIsEPWvi9Iy',
        quantity: 1,
      }],
      success_url: 'https://jubilant-guacamole-r4wwqgjxp5x7257w5-3000.app.github.dev/compte?success=true',
      cancel_url: 'https://jubilant-guacamole-r4wwqgjxp5x7257w5-3000.app.github.dev/compte?canceled=true',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Erreur Stripe:', error);
    res.status(500).json({ error: 'Erreur de paiement' });
  }
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err);
  res.status(500).json({ error: 'Erreur serveur interne' });
});

app.listen(PORT, () => {
  console.log(`Backend stable sur le port ${PORT}`);
});
