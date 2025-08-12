# Sharings – Audit initial

## Problèmes détectés

### Structure du code
- Routage incohérent : la navigation pointe vers `/signup` alors que l'application ne déclare qu'une route `/register`, provoquant un 404.
- Absence de composant de carrousel pour les visuels.
- Typage TypeScript minimal : peu de props typées et logique mélangée dans certains composants.

### UI/UX & Responsive
- Design hétérogène : palette limitée aux couleurs primaires, pas de système commun pour les boutons ou cartes.
- Responsive incomplet : certains éléments (navbar, sections) ne gèrent pas encore toutes les tailles d'écran.
- Aucune animation d'apparition ni micro-interactions.

### Performance
- Images non optimisées et absence de lazy-loading.
- Build unique sans code splitting ; bundle principal >300 kB.
- Aucun suivi Lighthouse automatisé.

### Accessibilité
- Focus visuel peu visible et attributs `aria-*` partiels.
- Pas de navigation clavier testée.
- Carrousel manquant (donc aucune prise en charge tactile/clavier pour les visuels).

### SEO & sémantique
- Hiérarchie de titres non uniforme.
- Méta description et balises `alt` souvent absentes.
- Peu d'usage des balises sémantiques HTML5.

### Base Supabase
- Seules les tables `user_profiles` et `annonces` existent ; manque `reservations` et `messages`.
- Peu d'index, contrôles ou vérifications de types.
- RLS basique ; pas de seeds ni scripts de purge pour les comptes de test.

### Routage
- Lien « Créer un compte » renvoie vers `/signup` mais aucune route ne correspond, d'où une erreur 404.

## TODO priorisé
- **P0** : mettre en place un design system complet (palette, typo, utilitaires) et corriger les routes `/signup`/`/login`.
- **P1** : créer un carrousel accessible, optimiser le responsive et ajouter des animations.
- **P2** : optimiser les performances (lazy-loading, images), améliorer le SEO (métas, balises `alt`), automatiser les tests Lighthouse.

## Plan de correction fichier par fichier
- `tailwind.config.js` : ajouter palette Airbnb/Uber, conserver la config existante.
- `src/index.css` : définir utilitaires (`container-page`, `section`, `title-*`, `btn`, `card`, `chip`).
- `src/components/Navbar.tsx` : navbar sticky, liens corrigés, menu mobile accessible.
- `src/components/Carousel.tsx` : nouveau composant responsive, tactile et accessible.
- `src/pages/LandingPage.tsx` : refonte complète (hero + boutons, sections « Pourquoi », « Comment », bloc confiance, CTA final, footer).
- `public/_redirects` : assurer le fallback SPA (`/* /index.html 200`).
- `supabase/sql/schema.sql` : recréer tables `user_profiles`, `annonces`, `reservations`, `messages` avec index et contraintes.
- `supabase/sql/policies.sql` : définir RLS pour chaque table.
- `supabase/sql/seeds.sql` : fournir 2 comptes et 3 annonces avec images.
- `scripts/purgeUserByEmail.ts` : script Node pour supprimer un utilisateur et les entrées liées.
- `README_AUDIT.md` : présent document d'audit.

## Check-list des objectifs
- [ ] Performance Lighthouse ≥90 (mobile & desktop)
- [ ] Accessibilité ≥95
- [ ] SEO ≥90
- [ ] Responsive mobile-first sur toutes les pages
- [ ] Zéro lien 404 (navbar, fallback SPA)
- [ ] Base Supabase fonctionnelle (schéma, RLS, seeds, purge)
