import React from 'react';
import { createCheckoutSession } from '../lib/stripe';
import { products } from '../stripe-config';

export default function SubscriptionButton() {
  const handleSubscribe = () => {
    const { priceId, mode } = products.subscription;
    createCheckoutSession(priceId, mode);
  };

  return (
    <button
      onClick={handleSubscribe}
      className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:text-lg md:px-10"
    >
      S'abonner 19,99€/mois
    </button>
  );
}
