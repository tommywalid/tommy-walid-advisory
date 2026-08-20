-- Market Insights — fed by the Make automation (Make writes, this app only
-- reads). Columns match exactly the fields Make provides: article_id,
-- image_url, message_complet_fr/en/ar, source_name, source_url, published_at.
-- No extra bookkeeping columns (created_at, a separate id, a published flag,
-- etc.) were added — every row Make inserts is treated as published, and
-- the brief asked for the table to match the given fields exactly.
--
-- Run this once in the Supabase SQL Editor (or via `supabase db push` if
-- you're using the Supabase CLI with this migrations folder) against the
-- target project. Not run automatically — this repo has no Supabase
-- connection configured yet.

create table if not exists public.market_insights (
  article_id           text primary key,
  image_url             text not null,
  message_complet_fr    text not null,
  message_complet_en    text not null,
  message_complet_ar    text,
  source_name            text not null,
  source_url             text not null,
  published_at           timestamptz not null
);

-- Public, read-only access: the site's Next.js app reads with the anon key.
-- No insert/update/delete policy is added for anon — Make should write
-- using the project's service_role key (server-side, in Make's Supabase
-- module), which bypasses RLS entirely and never touches this policy.
alter table public.market_insights enable row level security;

create policy "Public read access"
  on public.market_insights
  for select
  using (true);

-- Newest-first is the only ordering the site uses (see
-- src/lib/market-insights.ts) — index makes that cheap as the table grows.
create index if not exists market_insights_published_at_idx
  on public.market_insights (published_at desc);
