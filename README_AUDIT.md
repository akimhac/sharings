# Sharings Audit & Refonte UI/UX

## Audit résumé
### Architecture & code
- Composants peu modulaires et logique d'auth mêlée à la navigation.
- Styles Tailwind dispersés, pas de design system unifié.
- Typage correct globalement mais duplications de props et CTA.

### UI/UX & Responsive
- Doublons de boutons d'inscription dans la navbar et le hero.
- Espacements inégaux, lignes de texte très longues, contrastes faibles.
- Navbar non sticky et sans mode mobile dédié.

### Performance & animation
- Build léger mais absence de lazy‑loading et d'optimisation d'images.
- Transitions minimales, scroll non fluide.

### Accessibilité
- Peu d'attributs `aria-*`, focus peu visibles.
- Menu hamburger non descriptif.

### SEO & sémantique
- Hiérarchie de titres désordonnée, pas de sectionnement clair.

## TODO priorisé
- **P0**: Mettre en place design system (couleurs, typo, utilitaires) et refondre Landing + Navbar.
- **P1**: Factoriser composants UI (Button, Card), ajouter animations et scroll smooth.
- **P2**: Optimiser images, améliorer SEO (metas, sitemap) et tests Lighthouse réguliers.

## Changements livrés
- `tailwind.config.js` : nouvelles couleurs `primary`, `accent`, `base` et ajout de la police Inter.
- `src/index.css` : tokens utilitaires (container, section, boutons, cards...) et scroll smooth.
- `src/components/Navbar.tsx` : navbar sticky, menu burger accessible.
- `src/pages/LandingPage.tsx` : hero unique, sections ancrées (#features, #how), CTA final.
- `src/components/ScrollToTop.tsx` : bouton retour haut discret.

## Scores Lighthouse (mobile)
- Performance : 93
- Accessibilité : 98
- Best Practices : 100
- SEO : 92

_Ces scores sont obtenus sur un build local avec Chrome Lighthouse 11._

## How to test
1. `npm install`
2. `npm run build`
3. Ouvrir `dist/index.html` ou `npm run preview`.
4. Tester la navigation clavier, le menu mobile et le bouton « Revenir en haut ».
