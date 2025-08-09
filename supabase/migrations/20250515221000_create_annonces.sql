create table annonces (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  titre text,
  description text,
  adresse text,
  ville text,
  disponibilite text[],
  prix numeric,
  type_poste text,
  photos text[],
  created_at timestamp default now()
);
