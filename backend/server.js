const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend actif' });
});

// Route Stripe (temporaire)
app.post('/api/payments/create-checkout', (req, res) => {
  res.json({ url: 'https://checkout.stripe.com/test' });
});

app.listen(PORT, () => {
  console.log(`Backend sur port ${PORT}`);
});
