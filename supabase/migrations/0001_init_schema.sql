-- Fitnesstracker-App: Basisschema
-- Tabellen: exercises (globaler Katalog + eigene Übungen), user_exercises ("Meine Geräte"),
-- workout_logs (geloggte Trainingseinheiten). Row Level Security sorgt dafür, dass Nutzer
-- nur den globalen Katalog sowie ihre eigenen Daten sehen/bearbeiten können.

create extension if not exists "pgcrypto";

create table if not exists exercises (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  muscle_group text not null check (
    muscle_group in ('Brust', 'Rücken', 'Beine', 'Schultern', 'Arme', 'Bauch', 'Ganzkörper')
  ),
  owner_id uuid references auth.users (id) on delete cascade,
  is_custom boolean not null default false,
  created_at timestamptz not null default now()
);

-- Eindeutige Namen innerhalb des globalen Katalogs bzw. je Nutzer (case-insensitive).
create unique index if not exists exercises_global_name_unique
  on exercises (lower(name))
  where owner_id is null;

create unique index if not exists exercises_owner_name_unique
  on exercises (owner_id, lower(name))
  where owner_id is not null;

create table if not exists user_exercises (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  exercise_id uuid not null references exercises (id) on delete cascade,
  added_at timestamptz not null default now(),
  unique (user_id, exercise_id)
);

create table if not exists workout_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  exercise_id uuid not null references exercises (id) on delete cascade,
  logged_date date not null default current_date,
  weight_kg numeric(6, 2) not null check (weight_kg > 0),
  reps integer check (reps > 0),
  sets integer check (sets > 0),
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists workout_logs_user_exercise_date_idx
  on workout_logs (user_id, exercise_id, logged_date desc);

-- Row Level Security

alter table exercises enable row level security;
alter table user_exercises enable row level security;
alter table workout_logs enable row level security;

create policy "exercises_select_global_or_own"
  on exercises for select
  using (owner_id is null or owner_id = auth.uid());

create policy "exercises_insert_own_custom"
  on exercises for insert
  with check (owner_id = auth.uid() and is_custom = true);

create policy "exercises_delete_own_custom"
  on exercises for delete
  using (owner_id = auth.uid());

create policy "user_exercises_manage_own"
  on user_exercises for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "workout_logs_manage_own"
  on workout_logs for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
