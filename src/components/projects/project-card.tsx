import { getLocale, getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { Project } from "@/types/projects";
import { formatStartingPriceOrPending, localizedText } from "@/lib/projects";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TagList } from "@/components/projects/tag-list";
import { MediaCover } from "@/components/projects/media-cover";
import { Reveal } from "@/components/motion/reveal";

/**
 * Reused as-is across three contexts: the homepage "Selected Projects"
 * teaser, the /projects grid, and "related projects" on a detail page — one
 * component, so all three stay visually and behaviorally consistent as the
 * catalogue grows (see docs/design/projects-information-architecture.md).
 */
export async function ProjectCard({
  project,
  delay = 0,
}: {
  project: Project;
  delay?: number;
}) {
  const locale = await getLocale();
  const t = await getTranslations("projects");
  const bestForDict = t.raw("bestForTags") as Record<string, string>;

  return (
    <Reveal delay={delay}>
      <Card className="flex h-full flex-col overflow-hidden bg-white p-0">
        <Link
          href={`/projects/${project.slug}`}
          className="relative aspect-[4/3] w-full overflow-hidden bg-beige"
        >
          <MediaCover
            url={project.media.cover.url}
            alt={project.name}
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </Link>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-xs font-semibold tracking-[0.14em] text-ink-soft uppercase">
            {project.location}
          </p>
          <h3 className="mt-1 font-heading text-lg text-forest">
            {project.name}
          </h3>

          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-soft">
            {localizedText(project.whyIRecommend, locale)}
          </p>

          <TagList
            tags={project.bestFor.slice(0, 2)}
            dictionary={bestForDict}
            variant="gold"
            className="mt-4"
          />

          <div className="mt-auto flex items-center justify-between pt-6">
            <span className="text-sm text-ink-soft">
              {t("card.startingFromLabel")}{" "}
              <span className="font-semibold text-forest">
                {formatStartingPriceOrPending(project.startingPrice, locale)}
              </span>
            </span>
          </div>

          <div className="mt-4 flex gap-2">
            <Button asChild size="sm" className="flex-1">
              <Link href={`/contact?project=${project.slug}`}>
                {t("card.primaryCta")}
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="flex-1">
              <Link href={`/projects/${project.slug}`}>
                {t("card.secondaryCta")}
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </Reveal>
  );
}
