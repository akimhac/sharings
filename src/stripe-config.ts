export const products = {
  jourji: {
    priceId: 'price_1RO3vt4TwnyssOIsKrEAASRN',
    description: 'Accès illimité pendant 1 semaine',
    mode: 'payment' as const,
  },
  subscription: {
    priceId: 'price_19_99_subscription',
    description: 'Abonnement mensuel pour publier ou louer',
    mode: 'subscription' as const,
  },
} as const;