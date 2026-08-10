import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import type { MediaType, PropertyType } from "@/types/projects";
import {
  getPublishedProjects,
  getProjectBySlug,
  getDeveloper,
  getRelatedProjects,
  localizedText,
  localizedTextOrEmpty,
} from "@/lib/projects";
import { ProjectHero } from "@/components/projects/project-hero";
import { ProjectFactsSidebar } from "@/components/projects/project-facts-sidebar";
import { AdvisorInsight } from "@/components/projects/advisor-insight";
import { TagList } from "@/components/projects/tag-list";
import { GatedContentPanel } from "@/components/projects/gated-content-panel";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/motion/reveal";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPublishedProjects().map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.name };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale as AppLocale);

  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const developer = getDeveloper(project.developerId);
  const related = getRelatedProjects(project);
  const t = await getTranslations("projects");
  const locationNote = localizedTextOrEmpty(project.whyThisLocationMatters, locale);

  const propertyTypeDict = t.raw("propertyTypes") as Record<PropertyType, string>;
  const bestForDict = t.raw("bestForTags") as Record<string, string>;
  const highlightDict = t.raw("highlightTags") as Record<string, string>;
  const mediaTypeLabels = t.raw("mediaTypes") as Record<MediaType, string>;

  const contactHref = `/contact?project=${project.slug}`;

  return (
    <>
      <ProjectHero project={project} mediaTypeLabels={mediaTypeLabels} />

      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div className="flex flex-col gap-10">
            <Reveal>
              <p className="text-xs font-semibold tracking-[0.14em] text-ink-soft uppercase">
                {project.location}
              </p>
              <h1 className="mt-1 font-heading text-3xl text-forest sm:text-4xl">
                {project.name}
              </h1>
            </Reveal>

            <AdvisorInsight
              title={t("detail.whyIRecommendTitle")}
              text={localizedText(project.whyIRecommend, locale)}
              size="lg"
            />

            <Reveal className="flex flex-col gap-5">
              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-[0.14em] text-gold uppercase">
                  {t("detail.bestForTitle")}
                </h3>
                <TagList tags={project.bestFor} dictionary={bestForDict} variant="gold" />
              </div>
              {project.keyHighlights.length > 0 ? (
                <div>
                  <h3 className="mb-3 text-xs font-semibold tracking-[0.14em] text-gold uppercase">
                    {t("detail.highlightsTitle")}
                  </h3>
                  <TagList tags={project.keyHighlights} dictionary={highlightDict} />
                </div>
              ) : null}
            </Reveal>

            {developer || locationNote ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {developer ? (
                  <AdvisorInsight
                    title={t("detail.whyTrustDeveloperTitle")}
                    text={localizedText(developer.whyITrustThem, locale)}
                  />
                ) : null}
                {locationNote ? (
                  <AdvisorInsight
                    title={t("detail.whyLocationMattersTitle")}
                    text={locationNote}
                  />
                ) : null}
              </div>
            ) : null}

            <GatedContentPanel
              title={t("detail.gatedTitle")}
              body={t("detail.gatedBody")}
              ctaLabel={t("detail.gatedCta")}
              ctaHref={contactHref}
            />
          </div>

          <ProjectFactsSidebar
            project={project}
            developer={developer}
            locale={locale}
            propertyTypeDict={propertyTypeDict}
            labels={{
              developer: t("detail.developerLabel"),
              location: t("detail.locationLabel"),
              propertyTypes: t("detail.propertyTypesLabel"),
              startingPrice: t("detail.startingPriceLabel"),
              handover: t("detail.handoverLabel"),
              paymentPlan: t("detail.paymentPlanLabel"),
            }}
            ctaHref={contactHref}
            ctaLabel={t("detail.primaryCta")}
          />
        </div>

        {related.length > 0 ? (
          <div className="mt-20 border-t border-beige-dark/60 pt-16">
            <h2 className="font-heading text-2xl text-forest">
              {t("detail.relatedTitle")}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedProject, i) => (
                <ProjectCard
                  key={relatedProject.slug}
                  project={relatedProject}
                  delay={i * 0.05}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
