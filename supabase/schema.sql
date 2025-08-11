-- Profils utilisateur
create table if not exists user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  type_utilisateur text check (type_utilisateur in ('salon','independant')) not null,
  stripe_connect_id text,
  created_at timestamp with time zone default now()
);

-- Annonces
create table if not exists annonces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  titre text not null,
  description text,
  adresse text,
  ville text,
  disponibilite text[] default '{}',
  prix numeric not null,
  type_poste text,
  photos text[] default '{}',
  created_at timestamp with time zone default now()
);

-- Réservations
create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  annonce_id uuid references annonces(id) on delete cascade,
  salon_id uuid references auth.users(id) on delete set null,
  independant_id uuid references auth.users(id) on delete set null,
  status text check (status in ('pending','paid','canceled','refunded')) default 'pending',
  stripe_session_id text,
  stripe_payment_intent text,
  montant_total integer,
  commission_plateforme integer,
  created_at timestamp with time zone default now()
);

alter table user_profiles enable row level security;
alter table annonces enable row level security;
alter table reservations enable row level security;

create policy "read_anon" on annonces for select using (true);
create policy "insert_own_annonce" on annonces for insert with check (auth.uid() = user_id);
create policy "update_own_annonce" on annonces for update using (auth.uid() = user_id);

create policy "read_own_reservations" on reservations for select using (
  auth.uid() = salon_id or auth.uid() = independant_id
);
create policy "insert_reservation" on reservations for insert with check (true);
