# Audit UI/UX & Technique — Projet Sharings

## Objectif
Garantir un site aussi fluide et design qu'Airbnb/Uber avec un score Lighthouse mobile/desktop élevé.

---

## 1. **UI/UX**
- ✅ Design system Airbnb-like appliqué
- ✅ Responsive mobile-first
- ✅ Animations douces et cohérentes
- ⏳ Ajouter encore plus d’images immersives
- ⏳ Améliorer transitions page à page

## 2. **Performance**
- ✅ Carousel optimisé avec lazy-loading
- ⏳ Compresser images à <200kb
- ⏳ Vérifier bundle split (React.lazy)

## 3. **Accessibilité**
- ✅ Focus visible
- ✅ Navigation clavier
- ⏳ Vérifier aria-label sur tous les boutons

## 4. **SEO**
- ✅ Balises H1/H2 cohérentes
- ⏳ Ajouter meta description et OpenGraph

## 5. **Base de données (Supabase)**
- ✅ Structure cohérente
- ⏳ Exécuter scripts SQL (schema, policies, seeds)
- ⏳ Utiliser purgeUserByEmail.ts pour nettoyer e-mails tests

---

### Priorité P0 (à faire maintenant)
1. Compresser toutes les images >500kb
2. Ajouter meta SEO
3. Vérifier aria-labels

### Priorité P1 (à faire bientôt)
1. Animations page à page
2. Préchargement images carousel

### Score cible Lighthouse
- Performance : ≥90
- Accessibilité : ≥95
- SEO : ≥90
