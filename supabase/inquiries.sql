create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null,
  service text not null,
  message text not null check (char_length(message) between 10 and 5000),
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

-- Browser clients have no insert policy. Only the server-side API route, using
-- SUPABASE_SERVICE_ROLE_KEY, can write inquiries through the REST API.

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);
