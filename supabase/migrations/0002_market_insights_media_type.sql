-- Market Insights now carry either a still image or a short (~10s) video.
-- Replaces the image-only image_url column with a generic media_url plus
-- a media_type discriminator, so the site knows which tag to render.
--
-- Written as an ALTER against the table 0001_create_market_insights.sql
-- creates — assumes that table already exists. Preserves any existing
-- rows: every row already in the table predates video support, so it's
-- backfilled as media_type = 'image' before the column is made NOT NULL,
-- nothing is dropped or overwritten. Not run automatically — run once in
-- the Supabase SQL Editor.

-- 1. Add the new column, nullable for now so backfilling existing rows
--    (if any) can't fail against a NOT NULL constraint.
alter table public.market_insights
  add column if not exists media_type text;

-- 2. Backfill: every row already in the table was an image (media_type
--    didn't exist before this migration, so there's nothing to infer —
--    'image' is simply the only value that was ever true until now).
update public.market_insights
  set media_type = 'image'
  where media_type is null;

-- 3. Now that every row has a value, enforce NOT NULL and restrict to
--    exactly the two allowed values.
alter table public.market_insights
  alter column media_type set not null;

alter table public.market_insights
  add constraint market_insights_media_type_check
  check (media_type in ('image', 'video'));

-- 4. Rename image_url -> media_url. A rename preserves the column's data
--    and its existing NOT NULL constraint — nothing else changes.
alter table public.market_insights
  rename column image_url to media_url;
