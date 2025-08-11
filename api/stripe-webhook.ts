import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE as string,
);

async function buffer(req: any): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const sig = req.headers['stripe-signature'] as string;
  const buf = await buffer(req);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const reservationId = session.metadata?.reservation_id as string;
      await supabase
        .from('reservations')
        .update({
          status: 'paid',
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent as string,
        })
        .eq('id', reservationId);
      break;
    }
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await supabase
        .from('reservations')
        .update({ status: 'canceled' })
        .eq('stripe_payment_intent', paymentIntent.id);
      break;
    }
    default:
      break;
  }

  res.json({ received: true });
}
