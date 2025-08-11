# Sharings Marketplace

Projet React/Vite/Tailwind avec Supabase pour mettre en relation salons et indépendants.

## Configuration

1. Copier `.env.example` vers `.env` et renseigner vos clés Supabase.
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Lancer le projet :
   ```bash
   npm run dev
   ```

## Tables Supabase

```sql
-- Profils utilisateurs
create table user_profiles (
  user_id uuid primary key references auth.users on delete cascade,
  type_utilisateur text check (type_utilisateur in ('salon','independant')) not null
);

-- Annonces
create table annonces (
  id bigserial primary key,
  user_id uuid references auth.users not null,
  titre text not null,
  description text,
  adresse text,
  ville text,
  disponibilite text[] default '{}',
  prix numeric,
  type_poste text,
  photos text[] default '{}',
  created_at timestamptz default now()
);
```
