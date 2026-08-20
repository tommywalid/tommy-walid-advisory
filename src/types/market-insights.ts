import type { LocalizedText } from "@/types/shared";

/**
 * A Market Insight — a short, sourced market note pushed by the Make
 * automation into Supabase (Make owns the scraping/drafting pipeline;
 * this app only ever reads). One row in `market_insights` maps to one
 * value of this type — see src/lib/market-insights.ts for the mapping
 * from Supabase's snake_case columns to this camelCase shape.
 *
 * `message` reuses the site's existing `LocalizedText` shape (fr/en
 * required, ar optional) rather than three separate string fields, for
 * the same reason every other multilingual field in this codebase does:
 * one shape, one fallback rule (see localizedText() precedent in
 * src/lib/projects.ts). `ar` is captured because Make provides it, but
 * isn't rendered anywhere yet — Arabic isn't a live locale in
 * src/i18n/routing.ts (see types/shared.ts's note on LocalizedText.ar).
 *
 * `mediaUrl`/`mediaType`: an insight's media is either a still image or a
 * short (~10s) video — see supabase/migrations/0002_market_insights_media_type.sql,
 * which replaced the original image-only `image_url` column with this pair.
 */
export type MarketInsight = {
  articleId: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  message: LocalizedText;
  sourceName: string;
  sourceUrl: string;
  /** ISO timestamp, as stored in Supabase's `published_at` column. */
  publishedAt: string;
};
