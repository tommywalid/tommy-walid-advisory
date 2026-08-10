import { getAllProjects, getPublishedProjects, getDeveloper } from "@/lib/projects";
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

export type IncompleteProjectReason =
  | "missing-recommendation"
  | "missing-cover-media"
  | "missing-price"
  | "missing-payment-plan"
  | "missing-handover"
  | "missing-developer-trust-note"
  | "missing-property-type";

/**
 * Surfaces draft-or-published projects missing something the content
 * guardrails require before they should go live — the Overview's "needs
 * attention" list, enforcing docs/design/projects-information-architecture.md
 * at the point of entry rather than by discipline alone. Real, non-trivial
 * output now that the V1 editorial catalog exists (see
 * docs/product/v1-editorial-catalog.md) — every project in it starts here.
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
      if (project.startingPrice.amount <= 0) {
        reasons.push("missing-price");
      }
      if (!project.paymentPlan.en.trim() || !project.paymentPlan.fr.trim()) {
        reasons.push("missing-payment-plan");
      }
      if (!project.handover.trim()) {
        reasons.push("missing-handover");
      }
      if (project.propertyTypes.length === 0) {
        reasons.push("missing-property-type");
      }
      const developer = getDeveloper(project.developerId);
      if (!developer || !developer.whyITrustThem.en.trim() || !developer.whyITrustThem.fr.trim()) {
        reasons.push("missing-developer-trust-note");
      }
      return { project, reasons };
    })
    .filter((entry) => entry.reasons.length > 0);
}
