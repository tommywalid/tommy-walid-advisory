import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { getFeaturedProjects } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProjectCard } from "@/components/projects/project-card";

/**
 * Deliberately restrained — a small curated teaser (see
 * docs/design/projects-information-architecture.md), not the full
 * catalogue; depth lives on /projects. Renders nothing at all if there are
 * no featured projects yet, rather than showing an empty section on the
 * homepage — the honest empty state belongs on /projects, a page visitors
 * navigate to specifically seeking this content.
 */
export async function SelectedProjects({ id }: { id?: string }) {
  const featured = getFeaturedProjects(3);
  if (featured.length === 0) return null;

  const t = await getTranslations("home.selectedProjects");

  return (
    <section id={id} className="bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeading kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} delay={i * 0.08} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/projects">{t("cta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
