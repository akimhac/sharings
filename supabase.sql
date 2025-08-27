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

-- Table des villes
create table if not exists cities (
  id uuid primary key default gen_random_uuid(),
  insee_code text unique not null,
  name text not null,
  lat numeric,
  lon numeric,
  population integer
);

alter table cities enable row level security;
create policy "Villes publiques" on cities for select using (true);

-- Table des entreprises
create table if not exists businesses (
  id uuid primary key default gen_random_uuid(),
  kind text check (kind in ('salon','institut')),
  name text not null,
  city_id uuid references cities(id) on delete set null,
  address text,
  price_min integer,
  price_max integer,
  rating numeric,
  tags text[] default '{}',
  images jsonb default '[]'::jsonb,
  created_at timestamptz default now()
);

alter table businesses enable row level security;
create policy "Entreprises publiques" on businesses for select using (true);
