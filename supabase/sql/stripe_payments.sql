-- ========== Stripe: subscriptions & payments ==========
-- Abstraction simple des abonnements utilisateur
create table if not exists stripe_user_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan_id text,
  status text check (status in ('trialing','active','past_due','canceled','incomplete','incomplete_expired','unpaid')) default 'active',
  cancel_at_period_end boolean default false,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table stripe_user_subscriptions enable row level security;
-- Lecture propre (proprio de ses données)
do $$ begin
  if not exists(select 1 from pg_policies where policyname='sub_select_own') then
    create policy sub_select_own on stripe_user_subscriptions
      for select using (auth.uid() = user_id);
  end if;
end $$;

-- Historique paiements/encaissements
create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  listing_id uuid references annonces(id) on delete set null,
  reservation_id uuid references reservations(id) on delete set null,
  stripe_payment_intent_id text,
  stripe_checkout_session_id text,
  amount numeric,
  currency text default 'eur',
  status text,
  receipt_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table payments enable row level security;
do $$ begin
  if not exists(select 1 from pg_policies where policyname='payments_select_own') then
    create policy payments_select_own on payments
      for select using (auth.uid() = user_id);
  end if;
end $$;
