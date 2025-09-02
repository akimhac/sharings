const Stripe = require('stripe');
const { createClient } = require('@supabase/supabase-js');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const sig = event.headers['stripe-signature'];
  let payload = event.body;
  if (event.isBase64Encoded) payload = Buffer.from(event.body, 'base64').toString('utf8');

  let evt;
  try {
    evt = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('❌ Webhook signature verification failed.', err.message);
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }

  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supaSrv = process.env.SUPABASE_SERVICE_ROLE;
  const supa = (supaUrl && supaSrv) ? createClient(supaUrl, supaSrv) : null;

  try {
    switch (evt.type) {
      case 'checkout.session.completed': {
        const session = evt.data.object;
        const pi = session.payment_intent ? await stripe.paymentIntents.retrieve(session.payment_intent) : null;
        if (supa) {
          await supa.from('payments')
            .update({
              status: 'succeeded',
              stripe_payment_intent_id: session.payment_intent || null,
              amount: pi ? (pi.amount_received / 100) : null,
              currency: pi ? pi.currency : session.currency,
              receipt_url: pi?.charges?.data?.[0]?.receipt_url ?? null,
              updated_at: new Date().toISOString()
            })
            .eq('stripe_checkout_session_id', session.id);
        }
        break;
      }
      case 'invoice.payment_succeeded':
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = evt.data.object;
        if (supa && sub.customer) {
          const status = sub.status || (evt.type === 'customer.subscription.deleted' ? 'canceled' : 'active');
          const period_start = sub.current_period_start ? new Date(sub.current_period_start * 1000).toISOString() : null;
          const period_end = sub.current_period_end ? new Date(sub.current_period_end * 1000).toISOString() : null;

          // On ne connait pas toujours user_id ici; vous pouvez stocker user_id en metadata côté création de sub.
          await supa.from('stripe_user_subscriptions')
            .upsert({
              stripe_customer_id: sub.customer,
              stripe_subscription_id: sub.id,
              plan_id: sub.items?.data?.[0]?.price?.id ?? null,
              status,
              cancel_at_period_end: !!sub.cancel_at_period_end,
              current_period_start: period_start,
              current_period_end: period_end,
              updated_at: new Date().toISOString()
            }, { onConflict: 'stripe_subscription_id' });
        }
        break;
      }
      default:
        // Ignore non-critical events
        break;
    }
  } catch (err) {
    console.error('Webhook handler error:', err);
    return { statusCode: 500, body: 'Handler error' };
  }

  return { statusCode: 200, body: 'ok' };
};
