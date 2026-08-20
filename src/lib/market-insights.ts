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
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[market-insights] Supabase query failed:", error.message);
    return [];
  }

  return (data as MarketInsightRow[]).map(toMarketInsight);
}

/**
 * FR falls back to EN and vice versa if one is somehow empty — same rule
 * as localizedText() in src/lib/projects.ts, kept as a local copy rather
 * than a shared import so this file has no dependency on the Projects
 * domain. AR is intentionally not part of this lookup — see MarketInsight.
 */
export function localizedMessage(message: LocalizedText, locale: string): string {
  const primary = locale === "fr" ? message.fr : message.en;
  const fallback = locale === "fr" ? message.en : message.fr;
  return primary.trim() || fallback.trim() || "—";
}
