import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { getMarketInsights } from "@/lib/market-insights";
import { PageHeader } from "@/components/sections/page-header";
import { MarketInsightCard } from "@/components/sections/market-insight-card";
import { Reveal } from "@/components/motion/reveal";

/**
 * Re-checked at most once a minute (Next.js ISR) instead of only at build
 * time — a new row Make/Supabase writes to `market_insights` shows up here
 * on its own within ~60s, with no code change and no redeploy. See
 * src/lib/market-insights.ts / docs handed to Tommy for the Supabase side.
 */
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.blog" });
  return { title: t("title") };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const t = await getTranslations("pages.blog");
  const insights = await getMarketInsights();

  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} />

      {insights.length === 0 ? (
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
          <Reveal className="flex flex-col items-center gap-4 rounded-2xl border border-beige-dark/70 bg-white px-8 py-16 text-center">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-beige text-forest">
              <Newspaper className="size-5" />
            </span>
            <p className="max-w-sm text-balance leading-relaxed text-ink-soft">
              {t("emptyState")}
            </p>
          </Reveal>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight, i) => (
              <MarketInsightCard key={insight.articleId} insight={insight} delay={i * 0.06} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
