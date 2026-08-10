import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

/**
 * Frames what's withheld (full pricing, floor plans, availability) as a
 * benefit of the conversation, not a locked wall — the CTA asks for an
 * opinion, not a download.
 */
export function GatedContentPanel({
  title,
  body,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <Reveal className="rounded-2xl border border-gold/30 bg-gold/5 p-8 text-center">
      <h3 className="font-heading text-xl text-forest">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-balance leading-relaxed text-ink-soft">
        {body}
      </p>
      <Button asChild variant="gold" className="mt-6">
        <Link href={ctaHref}>{ctaLabel}</Link>
      </Button>
    </Reveal>
  );
}
