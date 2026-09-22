-- Run once in Supabase SQL Editor. Content is JSON so every page section,
-- text, list, URL, and image reference can evolve without database migrations.
create table if not exists public.cms_content (
  key text primary key check (key ~ '^[a-z0-9._-]+$'),
  value jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.cms_content enable row level security;
-- No public policy: the website and admin API access it server-side only.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('jcp-media', 'jcp-media', true, 10485760, array['image/jpeg','image/png','image/webp','image/gif','video/mp4'])
on conflict (id) do update set public = true;
