const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * POST /.netlify/functions/stripe-create-session
 * body: { price_cents, currency, success_url, cancel_url, listing_id, reservation_id, user_id, description }
 */
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  try {
    const data = JSON.parse(event.body || '{}');
    const {
      price_cents = 1000,
      currency = 'eur',
      success_url = process.env.PUBLIC_BASE_URL || 'http://localhost:5173/dashboard.html',
      cancel_url = process.env.PUBLIC_BASE_URL || 'http://localhost:5173/dashboard.html',
      listing_id = null,
      reservation_id = null,
      user_id = null,
      description = 'Sharings — réservation'
    } = data;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency,
          product_data: { name: 'Sharings — Réservation', description },
          unit_amount: price_cents
        },
        quantity: 1
      }],
      success_url: `${success_url}?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cancel_url}?checkout=cancel`,
      metadata: { user_id, listing_id, reservation_id }
    });

    // (Optionnel) pré-créer un paiement "pending"
    if (process.env.SUPABASE_SERVICE_ROLE && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supaAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE);
      await supaAdmin.from('payments').insert({
        user_id: user_id || null,
        listing_id,
        reservation_id,
        stripe_checkout_session_id: session.id,
        amount: price_cents / 100,
        currency,
        status: 'pending'
      });
    }

    return {
      statusCode: 200,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: session.id, url: session.url })
    };
  } catch (e) {
    console.error('create-session error', e);
    return { statusCode: 500, body: e.message || 'server error' };
  }
};
