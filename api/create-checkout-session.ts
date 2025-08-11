import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE as string,
);

export default async function handler(req: Request, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { annonce_id, independant_id } = (req as any).body;

    const { data: annonce } = await supabase
      .from('annonces')
      .select('prix, user_id')
      .eq('id', annonce_id)
      .single();

    if (!annonce) {
      res.status(400).json({ error: 'Annonce not found' });
      return;
    }

    const montant_total = Math.round(Number(annonce.prix) * 100);
    const commission = Math.round(
      montant_total * (Number(process.env.PLATFORM_FEE_PERCENT || '0') / 100),
    );

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('stripe_connect_id')
      .eq('id', annonce.user_id)
      .single();

    const { data: reservation } = await supabase
      .from('reservations')
      .insert({
        annonce_id,
        salon_id: annonce.user_id,
        independant_id,
        montant_total,
        commission_plateforme: commission,
      })
      .select()
      .single();

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      currency: 'eur',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: { name: 'Réservation Sharings' },
            unit_amount: montant_total,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: commission,
        transfer_data: profile?.stripe_connect_id
          ? { destination: profile.stripe_connect_id }
          : undefined,
      },
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.CANCEL_URL as string,
      metadata: { reservation_id: reservation.id },
    });

    await supabase
      .from('reservations')
      .update({ stripe_session_id: session.id })
      .eq('id', reservation.id);

    res.status(200).json({ url: session.url });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
