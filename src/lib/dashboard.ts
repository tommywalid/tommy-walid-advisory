import { getAllProjects, getPublishedProjects } from "@/lib/projects";
import { developers } from "@/data/developers";
import { getAllArticles, getPublishedArticles } from "@/lib/articles";
import { getAllTestimonials } from "@/lib/testimonials";
import { getAllMedia } from "@/lib/media";
import { getAllSocialSnippets } from "@/lib/social";

/**
 * Aggregate counts for the Dashboard Overview — every number here is real,
 * computed from the same data layer the public site reads, never a
 * hardcoded placeholder figure.
 */
export function getDashboardStats() {
  const allProjects = getAllProjects();
  const publishedProjects = getPublishedProjects();
  const allArticles = getAllArticles();
  const publishedArticles = getPublishedArticles();

  return {
    projects: { total: allProjects.length, published: publishedProjects.length },
    developers: { total: developers.length },
    articles: { total: allArticles.length, published: publishedArticles.length },
    testimonials: { total: getAllTestimonials().length },
    media: { total: getAllMedia().length },
    social: { total: getAllSocialSnippets().length },
  };
}

export type IncompleteProjectReason = "missing-recommendation" | "missing-cover-media";

/**
 * Surfaces published-or-draft projects missing something the content
 * guardrails require before they should go live — the Overview's "needs
 * attention" list, enforcing docs/design/projects-information-architecture.md
 * at the point of entry rather than by discipline alone.
 */
export function getIncompleteProjects() {
  return getAllProjects()
    .map((project) => {
      const reasons: IncompleteProjectReason[] = [];
      if (!project.whyIRecommend.en.trim() || !project.whyIRecommend.fr.trim()) {
        reasons.push("missing-recommendation");
      }
      if (!project.media.cover.url) {
        reasons.push("missing-cover-media");
      }
      return { project, reasons };
    })
    .filter((entry) => entry.reasons.length > 0);
}
