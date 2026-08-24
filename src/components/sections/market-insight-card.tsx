import { getLocale } from "next-intl/server";

import type { MarketInsight } from "@/types/market-insights";
import { localizedMessage } from "@/lib/market-insights";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";

/**
 * Make currently writes `media_url` as a Google Drive
 * `uc?export=download&id={fileId}` link, which doesn't reliably render
 * inline as an `<img>`/`<video>` source in a browser. Drive's own
 * `lh3.googleusercontent.com/d/{fileId}` form does. This resolves that at
 * render time only — Make and Supabase still write/store the old format
 * unchanged; nothing else in the pipeline is touched.
 *
 * Any URL that isn't a `drive.google.com` link with an `id` query param
 * (already-migrated googleusercontent URLs, any other host, or a
 * malformed value) is returned as-is rather than risk producing a broken
 * one.
 */
function resolveMediaUrl(url: string): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }

  if (parsed.hostname !== "drive.google.com") return url;

  const fileId = parsed.searchParams.get("id");
  if (!fileId) return url;

  return `https://lh3.googleusercontent.com/d/${fileId}`;
}

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
  const mediaUrl = resolveMediaUrl(insight.mediaUrl);
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
              src={mediaUrl}
              controls
              playsInline
              preload="metadata"
              className="size-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mediaUrl}
              alt=""
              className="size-full object-cover"
            />
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="line-clamp-4 leading-relaxed text-ink-soft">
            {localizedMessage(insight.message, locale)}
          </p>

          {formattedDate ? (
            <div className="mt-auto flex items-center justify-end gap-3 pt-6 text-xs text-ink-soft">
              <time dateTime={insight.publishedAt}>{formattedDate}</time>
            </div>
          ) : null}
        </div>
      </Card>
    </Reveal>
  );
}
