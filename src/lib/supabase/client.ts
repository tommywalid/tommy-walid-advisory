import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client (read access for public content — Market
 * Insights today, more tables later). Deliberately NOT prefixed
 * `NEXT_PUBLIC_`: nothing here needs to reach the browser bundle, every
 * read happens server-side in a Server Component/route.
 *
 * Returns `null` when the env vars aren't set instead of throwing —
 * `createClient()` throws immediately on a missing URL, which would take
 * the whole app down at build/boot before any credentials exist. Callers
 * (see src/lib/market-insights.ts) treat `null` the same way the rest of
 * this codebase treats "no content yet": an honest empty state, never a
 * crash and never fabricated data.
 */
function createSupabaseClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[supabase] SUPABASE_URL / SUPABASE_ANON_KEY not set — Supabase-backed content (Market Insights) will render as empty until configured.",
      );
    }
    return null;
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

export const supabase = createSupabaseClient();
