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
