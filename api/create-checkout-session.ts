/* eslint-env node */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE as string,
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { priceId, mode, userId } = req.body;

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode,
      success_url: `${process.env.FRONT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONT_URL}/cancel`,
    });

    if (userId) {
      await supabase.from('reservations').insert({
        user_id: userId,
        session_id: session.id,
      });
    }

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
