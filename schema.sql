-- IN Website — Supabase schema
-- Paste into Supabase → SQL Editor → Run.

-- ========== 1. Connect form (Are you IN?) ==========
create table if not exists public.submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  brings      text,
  message     text,
  source_page text,
  status      text not null default 'new'   -- new | contacted | archived
);

-- ========== 2. Story submissions ==========
create table if not exists public.stories (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  door           text,                       -- 'I lived it' | 'I noticed it'
  body           text not null,              -- the story itself
  format         text[] default '{}',        -- Writing, Drawing, Photo, ...
  arc_stage      text,                       -- IGNITE | ME ≠ WE | ... | Let IN place it
  credit_name    text,                       -- blank = anonymous
  email          text,
  consent        boolean not null default false,
  attachment_url text,
  source_page    text,
  status         text not null default 'pending'  -- pending | published | declined
);

create index if not exists stories_published_idx
  on public.stories (status, created_at desc);

-- ========== 3. Row Level Security: public can submit, not read ==========
alter table public.submissions enable row level security;
alter table public.stories     enable row level security;

drop policy if exists "anon can submit" on public.submissions;
create policy "anon can submit" on public.submissions
  for insert to anon with check (true);

drop policy if exists "anon can submit story" on public.stories;
create policy "anon can submit story" on public.stories
  for insert to anon with check (true);

-- Published stories are readable by the site (Story index / Constellation).
drop policy if exists "anon reads published" on public.stories;
create policy "anon reads published" on public.stories
  for select to anon using (status = 'published');

-- ========== 4. Storage bucket for attachments ==========
insert into storage.buckets (id, name, public)
values ('story-media', 'story-media', true)
on conflict (id) do nothing;

drop policy if exists "anon uploads story media" on storage.objects;
create policy "anon uploads story media" on storage.objects
  for insert to anon with check (bucket_id = 'story-media');

drop policy if exists "public reads story media" on storage.objects;
create policy "public reads story media" on storage.objects
  for select to public using (bucket_id = 'story-media');

-- ========== 5. Realtime: let the Constellation's live "Just shared" feed
--    push new/updated stories to visitors without a page reload. ==========
-- REPLICA IDENTITY FULL sends the whole row (not just the primary key) with
-- each change event — the feed needs status/body/format on the payload it
-- receives, not just the id.
alter table public.stories replica identity full;

-- Add the table to the realtime publication (idempotent — errors if run
-- twice otherwise, since Postgres has no "add table if not attached").
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'stories'
  ) then
    alter publication supabase_realtime add table public.stories;
  end if;
end $$;

-- ========== 6. Workshop catalog (lightweight; static Workshop-*.dc.html
--    pages stay authoritative for copy — this just drives the intake form's
--    dropdown and lets staff toggle which workshops currently accept
--    interest). ==========
create table if not exists public.workshops (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  slug        text not null unique,     -- e.g. 'mobius-making' — matches Workshop-Mobius-Making page
  title       text not null,
  active      boolean not null default true,
  sort_order  int not null default 0
);

-- ========== 7. Workshop interest / registration ==========
create table if not exists public.workshop_registrations (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  workshop_id    uuid references public.workshops(id),
  workshop_slug  text,                  -- denormalized fallback ("something else" / free text)
  name           text not null,
  email          text not null,
  org            text,
  message        text,
  source_page    text,
  status         text not null default 'new'   -- new | contacted | archived
);

alter table public.workshops enable row level security;
alter table public.workshop_registrations enable row level security;

drop policy if exists "anon reads active workshops" on public.workshops;
create policy "anon reads active workshops" on public.workshops
  for select to anon using (active = true);

drop policy if exists "anon can register interest" on public.workshop_registrations;
create policy "anon can register interest" on public.workshop_registrations
  for insert to anon with check (true);

-- ========== 8. Staff allowlist + review policies ==========
-- Onboard staff by hand: they sign in once via magic link, then you add
-- their email here via Supabase Table Editor. No invite UI at this scale.
create table if not exists public.staff_emails (
  email text primary key
);

alter table public.staff_emails enable row level security;

-- Scoped to the caller's own email only, so the app can check "am I staff?"
-- without ever exposing the full staff list to a logged-in-but-non-staff user.
drop policy if exists "authenticated can check own staff status" on public.staff_emails;
create policy "authenticated can check own staff status" on public.staff_emails
  for select to authenticated using (email = auth.jwt() ->> 'email');

drop policy if exists "staff can read submissions" on public.submissions;
create policy "staff can read submissions" on public.submissions
  for select to authenticated
  using (auth.jwt() ->> 'email' in (select email from public.staff_emails));

drop policy if exists "staff can update submission status" on public.submissions;
create policy "staff can update submission status" on public.submissions
  for update to authenticated
  using (auth.jwt() ->> 'email' in (select email from public.staff_emails));

drop policy if exists "staff can read stories" on public.stories;
create policy "staff can read stories" on public.stories
  for select to authenticated
  using (auth.jwt() ->> 'email' in (select email from public.staff_emails));

drop policy if exists "staff can update story status" on public.stories;
create policy "staff can update story status" on public.stories
  for update to authenticated
  using (auth.jwt() ->> 'email' in (select email from public.staff_emails));

drop policy if exists "staff can read workshop registrations" on public.workshop_registrations;
create policy "staff can read workshop registrations" on public.workshop_registrations
  for select to authenticated
  using (auth.jwt() ->> 'email' in (select email from public.staff_emails));

drop policy if exists "staff can update workshop registrations" on public.workshop_registrations;
create policy "staff can update workshop registrations" on public.workshop_registrations
  for update to authenticated
  using (auth.jwt() ->> 'email' in (select email from public.staff_emails));

drop policy if exists "staff can read all workshops" on public.workshops;
create policy "staff can read all workshops" on public.workshops
  for select to authenticated
  using (auth.jwt() ->> 'email' in (select email from public.staff_emails));

drop policy if exists "staff can manage workshops" on public.workshops;
create policy "staff can manage workshops" on public.workshops
  for all to authenticated
  using (auth.jwt() ->> 'email' in (select email from public.staff_emails))
  with check (auth.jwt() ->> 'email' in (select email from public.staff_emails));

-- ========== 9. Seed the workshop catalog from the existing Workshop-*.dc.html pages ==========
insert into public.workshops (slug, title, sort_order) values
  ('mobius-making',       'Möbius Making',            1),
  ('pathfinder',          'Pathfinder',                2),
  ('jungle-jam',          'Jungle Jam',                3),
  ('metanoia',            'Metanoia',                  4),
  ('bucket-list',         'Bucket List',                5),
  ('heros-journey',       'Hero''s Journey',           6),
  ('light-shadow-shift',  'Light/Shadow Shift',        7),
  ('second-life',         'Second Life',               8),
  ('shadow-shifter',      'Shadow Shifter',            9),
  ('two-wings',           'Two Wings',                10)
on conflict (slug) do nothing;
