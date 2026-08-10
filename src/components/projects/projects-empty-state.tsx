import { Sparkles } from "lucide-react";

import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

/**
 * Every dead end in the Projects experience becomes a conversation, not a
 * wall — used both when nothing is published yet at all, and when a
 * specific Best For selection has no current matches. Same visual language
 * as NoticePanel elsewhere on the site, extended with a CTA.
 */
export function ProjectsEmptyState({
  title,
  body,
  ctaLabel,
  ctaHref,
}: {
  title?: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <Reveal className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-2xl border border-dashed border-beige-dark bg-beige/30 px-8 py-14 text-center">
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-beige text-forest">
        <Sparkles className="size-5" />
      </span>
      {title ? (
        <h3 className="font-heading text-xl text-forest">{title}</h3>
      ) : null}
      <p className="text-balance leading-relaxed text-ink-soft">{body}</p>
      <Button asChild className="mt-2">
        <Link href={ctaHref}>{ctaLabel}</Link>
      </Button>
    </Reveal>
  );
}
