import { supabase } from './supabase';

export async function createCheckoutSession(priceId: string, mode: 'payment' | 'subscription') {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      price_id: priceId,
      success_url: `${window.location.origin}/success`,
      cancel_url: `${window.location.origin}/cancel`,
      mode,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create checkout session');
  }

  const { url } = await response.json();

  if (!url) {
    throw new Error('No checkout URL returned');
  }

  window.location.href = url;
}

export async function getCurrentSubscription() {
  const { data, error } = await supabase
    .from('stripe_user_subscriptions')
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }

  return data;
}

export async function getOrderHistory() {
  const { data, error } = await supabase
    .from('stripe_user_orders')
    .select('*')
    .order('order_date', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return data;
}