import { getLocale } from "next-intl/server";

import type { MarketInsight } from "@/types/market-insights";
import { localizedMessage } from "@/lib/market-insights";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

/**
 * One Market Insight, in the same card language as ProjectCard (Card,
 * p-0 + inner padding, aspect-[4/3] cover). Cover is an <img> or a
 * <video> depending on `mediaType` — plain HTML elements rather than
 * next/image for the image case: `mediaUrl` comes from Make/Supabase,
 * whose host isn't known ahead of time, and next/image throws on an
 * unconfigured remote hostname — see next.config.ts.
 */
export async function MarketInsightCard({
  insight,
  delay = 0,
}: {
  insight: MarketInsight;
  delay?: number;
}) {
  const locale = await getLocale();
  const date = new Date(insight.publishedAt);
  const formattedDate = Number.isNaN(date.getTime())
    ? null
    : new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);

  return (
    <Reveal delay={delay}>
      <Card className="flex h-full flex-col overflow-hidden bg-white p-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-beige">
          {insight.mediaType === "video" ? (
            <video
              src={insight.mediaUrl}
              controls
              playsInline
              preload="metadata"
              className="size-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={insight.mediaUrl}
              alt=""
              className="size-full object-cover"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="line-clamp-4 leading-relaxed text-ink-soft">
            {localizedMessage(insight.message, locale)}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-xs text-ink-soft">
            <a
              href={insight.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium tracking-wide uppercase transition-colors hover:text-forest"
            >
              {insight.sourceName}
            </a>
            {formattedDate ? <time dateTime={insight.publishedAt}>{formattedDate}</time> : null}
          </div>
        </div>
      </Card>
    </Reveal>
  );
}
