import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import type { PropertyType } from "@/types/projects";
import { Link } from "@/i18n/navigation";
import { getPublishedProjects, getAllLocations } from "@/lib/projects";
import { PageHeader } from "@/components/sections/page-header";
import { Button } from "@/components/ui/button";
import { ProjectFilterBar } from "@/components/projects/project-filter-bar";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectsEmptyState } from "@/components/projects/projects-empty-state";

type SearchParams = Promise<{
  bestFor?: string;
  propertyType?: string;
  location?: string;
}>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects.index" });
  return { title: t("title") };
}

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: SearchParams;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const sp = await searchParams;

  const t = await getTranslations("projects");
  const allProjects = getPublishedProjects();

  if (allProjects.length === 0) {
    return (
      <>
        <PageHeader
          kicker={t("index.kicker")}
          title={t("index.title")}
          intro={t("index.intro")}
        />
        <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
          <ProjectsEmptyState
            title={t("index.noProjectsYetTitle")}
            body={t("index.noProjectsYetBody")}
            ctaLabel={t("index.noProjectsYetCta")}
            ctaHref="/contact"
          />
        </div>
      </>
    );
  }

  const filtered = allProjects.filter((project) => {
    if (sp.bestFor && !project.bestFor.includes(sp.bestFor)) return false;
    if (
      sp.propertyType &&
      !project.propertyTypes.includes(sp.propertyType as PropertyType)
    )
      return false;
    if (sp.location && project.location !== sp.location) return false;
    return true;
  });

  return (
    <>
      <PageHeader
        kicker={t("index.kicker")}
        title={t("index.title")}
        intro={t("index.intro")}
      />

      <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10">
        <ProjectFilterBar
          bestForDict={t.raw("bestForTags") as Record<string, string>}
          propertyTypeDict={t.raw("propertyTypes") as Record<string, string>}
          locations={getAllLocations()}
          allLabel={t("index.allLabel")}
          propertyTypeLabel={t("index.propertyTypeLabel")}
          locationLabel={t("index.locationLabel")}
          anyLabel={t("index.anyLabel")}
        />

        <div className="mt-14">
          {filtered.length === 0 ? (
            <ProjectsEmptyState
              body={t("index.emptyStateBody")}
              ctaLabel={t("index.emptyStateCta")}
              ctaHref="/contact"
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => (
                <ProjectCard key={project.slug} project={project} delay={i * 0.05} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-beige-dark/60 bg-beige/40 py-16 text-center">
        <h2 className="font-heading text-2xl text-forest">
          {t("index.closingTitle")}
        </h2>
        <Button asChild className="mt-6">
          <Link href="/contact">{t("index.closingCta")}</Link>
        </Button>
      </div>
    </>
  );
}
