# Fonctions & Tests

## Préférences
- Page: `/account` → composant `PreferencesForm`
- Sauvegarde en table `user_preferences` (RLS: owner-only)

## Recherche
- Page: `/search` (autocomplete villes, filtres services/budget, cartes)
- Bouton **Créer une alerte** → `saved_searches` (mock de notification en dev)

## Relances / Alertes (dev)
SUPABASE_URL=... SERVICE_ROLE_KEY=... npx ts-node scripts/notify_saved_searches.ts

shell
Copier
Modifier
Affiche en console les “emails” qui seraient envoyés.

## Tests
npm run test:api
npx playwright install
npm run test:e2e

bash
Copier
Modifier
Astuce: si l’inscription UI n’existe pas encore, le test E2E crée un utilisateur via l’API admin, puis teste recherche + sauvegarde.
