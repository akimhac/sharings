# Seeds & Tests — Sharings

## Prérequis
- Variables d'env :
  - `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (app)
  - `SUPABASE_URL`, `SERVICE_ROLE_KEY` (scripts seeds)
- Exécute le schéma RLS :
  1. `supabase/sql/001_schema.sql`
  2. `supabase/sql/002_policies.sql`

## Import des villes de France
```bash
SUPABASE_URL=... SERVICE_ROLE_KEY=... npx ts-node scripts/import_cities_fr.ts

Seed de salons & instituts de démo

SUPABASE_URL=... SERVICE_ROLE_KEY=... npx ts-node scripts/seed_businesses_demo.ts

Reset des données de démo

SUPABASE_URL=... SERVICE_ROLE_KEY=... npx ts-node scripts/reset_demo_data.ts

Lancer l’app

npm i
npm run dev

Tests

# E2E
npx playwright install
npm run test:e2e

# API helpers
npm run test:api

# E2E
npx playwright install
npm run test:e2e

# API helpers
npm run test:api
```
