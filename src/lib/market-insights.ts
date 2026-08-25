import { supabase } from "@/lib/supabase/client";
import type { MarketInsight } from "@/types/market-insights";
import type { LocalizedText } from "@/types/shared";

/** Exact shape of a row in Supabase's `market_insights` table (snake_case, as Make writes it). */
type MarketInsightRow = {
  article_id: string;
  media_url: string;
  media_type: "image" | "video";
  message_complet_fr: string;
  message_complet_en: string;
  message_complet_ar: string | null;
  source_name: string;
  source_url: string;
  published_at: string;
  is_test: boolean;
};

function toMarketInsight(row: MarketInsightRow): MarketInsight {
  return {
    articleId: row.article_id,
    mediaUrl: row.media_url,
    mediaType: row.media_type,
    message: {
      fr: row.message_complet_fr,
      en: row.message_complet_en,
      ...(row.message_complet_ar ? { ar: row.message_complet_ar } : {}),
    },
    sourceName: row.source_name,
    sourceUrl: row.source_url,
    publishedAt: row.published_at,
  };
}

/**
 * All Market Insights, newest first. Every row Make writes to Supabase is
 * treated as published — there's no draft/published flag on this table
 * (Make only inserts a row once the content is ready to go live).
 *
 * Rows flagged `is_test` (written by debug/test scenarios in Make) are
 * excluded — they never represent real published content.
 *
 * Returns `[]` — never throws — when Supabase isn't configured yet or a
 * request fails, so the public page always has an honest empty state to
 * fall back to instead of a broken page. Logs the failure server-side so
 * a real outage is still visible in the deployment logs.
 */
export async function getMarketInsights(): Promise<MarketInsight[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("market_insights")
    .select("*")
    .eq("is_test", false)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[market-insights] Supabase query failed:", error.message);
    return [];
  }

  return (data as MarketInsightRow[]).map(toMarketInsight);
}

/**
 * Requested locale first, falling back to EN then FR if that one is empty —
 * same rule as localizedText() in src/lib/projects.ts, kept as a local copy
 * rather than a shared import so this file has no dependency on the
 * Projects domain. `ar` is optional on LocalizedText (Make doesn't always
 * populate `message_complet_ar`), so an `ar` request without one falls back
 * to `en` exactly like a missing `fr` field always has.
 */
export function localizedMessage(message: LocalizedText, locale: string): string {
  const byLocale: Record<string, string | undefined> = { fr: message.fr, en: message.en, ar: message.ar };
  const primary = byLocale[locale] ?? message.en;
  return primary.trim() || message.en.trim() || message.fr.trim() || "—";
}
