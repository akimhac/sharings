# Sharings

Plateforme mettant en relation salons et indépendants pour la location de postes de travail.

## Setup

```bash
npm install
```

Créez un fichier `.env` en vous basant sur `.env.example` et renseignez vos clés Supabase et Stripe.

Appliquez le schéma SQL dans votre projet Supabase :

```sql
-- voir le fichier supabase/schema.sql
```

### Stripe webhook (mode test)

Installez la CLI Stripe puis exécutez :

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

## Développement

```bash
npm run dev
```

## Déploiement

- Frontend via Vercel/Netlify.
- Fonctions serverless `api/create-checkout-session` et `api/stripe-webhook` à déployer sur la même plateforme.
