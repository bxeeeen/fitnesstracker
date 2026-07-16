-- Profile pro Nutzer: Name (aus Signup-Metadaten), optionale Körperdaten,
-- und ein Flag, ob das Erstlogin-Onboarding abgeschlossen wurde.

create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text,
  age integer check (age > 0 and age < 130),
  height_cm numeric(5, 1) check (height_cm > 0),
  weight_kg numeric(5, 1) check (weight_kg > 0),
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "profiles_select_own"
  on profiles for select
  using (id = auth.uid());

create policy "profiles_update_own"
  on profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- Kein insert/delete für Clients: Zeilen entstehen ausschließlich über den
-- Trigger unten (SECURITY DEFINER umgeht RLS für den Insert beim Signup).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, new.raw_user_meta_data ->> 'name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill für bereits bestehende Accounts (vor dieser Migration registriert):
-- onboarding_completed=true, da diese Nutzer ihre Geräte bereits ohne
-- Onboarding-Flow ausgewählt haben und nicht erneut hindurch geschickt werden sollen.
insert into profiles (id, name, onboarding_completed)
select id, raw_user_meta_data ->> 'name', true
from auth.users
on conflict (id) do nothing;
