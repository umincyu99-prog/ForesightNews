-- Foresight News - Supabase schema
-- Run this in the Supabase SQL Editor

create table if not exists articles (
  id            uuid primary key default gen_random_uuid(),
  title_en      text not null,
  title_ja      text not null,
  description_en text,
  description_ja text,
  content_en    text,
  url           text unique not null,
  image_url     text,
  source_name   text not null,
  published_at  timestamptz not null,
  category      text not null check (category in ('general','technology','ai','business','science','world')),
  created_at    timestamptz default now()
);

-- Index for fast category queries
create index if not exists articles_category_published on articles (category, published_at desc);
create index if not exists articles_published on articles (published_at desc);

-- Enable Row Level Security
alter table articles enable row level security;

-- Public read access
create policy "Public read"
  on articles for select
  using (true);

-- Service role can insert/update
create policy "Service role write"
  on articles for all
  using (auth.role() = 'service_role');
