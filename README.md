# Sharings

Marketplace reliant salons de coiffure/esthétique et indépendants avec réservation de sièges, messagerie et création de contrat.

## Installation

1. Cloner le dépôt puis installer les dépendances :
   ```bash
   npm install
   ```
2. Copier `.env.example` vers `.env` et renseigner :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Lancer en développement :
   ```bash
   npm run dev
   ```
4. Construire pour la production :
   ```bash
   npm run build
   ```

## Déploiement Netlify
- Ajouter les variables d'environnement ci-dessus dans Netlify.
- `netlify.toml` et `public/_redirects` sont déjà configurés pour le mode SPA.

## Schéma Supabase
À exécuter dans la console SQL Supabase :

```sql
-- Schema Supabase pour Sharings

-- Table des profils utilisateurs
create table if not exists user_profiles (
  user_id uuid primary key references auth.users on delete cascade,
  type_utilisateur text check (type_utilisateur in ('salon','independant')),
  nom text,
  avatar_url text,
  created_at timestamptz default now()
);

alter table user_profiles enable row level security;

create policy "Select own profile" on user_profiles for select using (auth.uid() = user_id);
create policy "Insert own profile" on user_profiles for insert with check (auth.uid() = user_id);
create policy "Update own profile" on user_profiles for update using (auth.uid() = user_id);

-- Table des annonces
create table if not exists annonces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade,
  titre text,
  description text,
  adresse text,
  ville text,
  disponibilite text[],
  prix numeric,
  type_poste text,
  photos text[],
  created_at timestamptz default now()
);

alter table annonces enable row level security;

create policy "Annonces publiques" on annonces for select using (true);
create policy "Gestion proprieataire" on annonces for insert using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Update propre" on annonces for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Delete propre" on annonces for delete using (auth.uid() = user_id);
```

Configurer l'onglet **Auth** avec les URL de redirection `http://localhost:5173` et le domaine Netlify.

## Routes
- `/` : landing page
- `/login` / `/register`
- `/creer-annonce` réservé aux salons
- `/recherche` réservé aux indépendants
- `/reservations` : planning de réservation de siège
- `/messages` : messagerie simple
- `/contrat` : génération de contrat

## Types
- `salon` : peut créer des annonces
- `independant` : peut rechercher des annonces

## Déploiement
- Après `npm run build`, publier le dossier `dist` sur Netlify.
