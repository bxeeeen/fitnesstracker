-- Trainingsvorgaben im Profil (für Slider-Defaults/-Ranges) + Trainingstage
-- pro Wochentag (für den Home-Status und den erweiterten Onboarding-Flow).

alter table profiles
  add column if not exists max_weight_kg numeric(6, 2) check (max_weight_kg > 0),
  add column if not exists default_sets integer check (default_sets > 0),
  add column if not exists default_reps integer check (default_reps > 0);

-- weekday folgt ISO-8601 (1 = Montag ... 7 = Sonntag).
create table if not exists training_days (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  weekday integer not null check (weekday between 1 and 7),
  split_label text,
  created_at timestamptz not null default now(),
  unique (user_id, weekday)
);

create index if not exists training_days_user_idx
  on training_days (user_id, weekday);

alter table training_days enable row level security;

create policy "training_days_manage_own"
  on training_days for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
