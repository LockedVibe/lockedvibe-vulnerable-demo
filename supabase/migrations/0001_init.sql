-- DEMO: deliberately weak Supabase schema
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  email text,
  is_admin boolean default false
);
create table public.orders (
  id bigserial primary key,
  user_id uuid not null,
  total_cents int not null,
  shipping_address text
);
create table public.payment_events (
  id bigserial primary key,
  order_id bigint,
  raw_payload jsonb
);

alter table public.profiles enable row level security;
alter table public.orders enable row level security;
-- payment_events: RLS never enabled (DEMO VULNERABILITY)

-- DEMO VULNERABILITY: anyone, including signed-out visitors, can read every order
create policy "orders readable" on public.orders for select to anon, authenticated using (true);

create policy "own profile" on public.profiles for select to authenticated
  using ((select auth.uid()) = user_id);

-- DEMO VULNERABILITY: weak with check lets an owner move their row to anyone
create policy "update own profile" on public.profiles for update to authenticated
  using ((select auth.uid()) = user_id) with check (true);

-- DEMO VULNERABILITY: admin check reads user-editable metadata
create policy "admins read all profiles" on public.profiles for select to authenticated
  using ((auth.jwt() -> 'user_metadata' ->> 'role') = 'admin');

grant select, insert, update, delete on all tables in schema public to anon, authenticated;
