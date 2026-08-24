import Link from "next/link";
import { AlertTriangle } from "lucide-react";

import { getDashboardStats, getIncompleteProjects } from "@/lib/dashboard";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";

const reasonLabels: Record<string, string> = {
  "missing-recommendation": "Missing “Why I Recommend” note",
  "recommendation-ai-draft-pending-review": "“Why I Recommend” is an AI draft, needs your review",
  "missing-cover-media": "Missing cover photo",
  "missing-price": "Missing starting price",
  "missing-payment-plan": "Missing payment plan",
  "missing-handover": "Missing handover date",
  "missing-property-type": "Missing property type",
  "missing-developer-trust-note": "Developer missing “Why I Trust Them” note",
  "developer-trust-note-ai-draft-pending-review":
    "Developer's “Why I Trust Them” is an AI draft, needs your review",
};

export default function DashboardOverviewPage() {
  const stats = getDashboardStats();
  const incomplete = getIncompleteProjects();

  return (
    <>
      <DashboardPageHeader
        title="Overview"
        description="A real snapshot of your content, every number below is live, not illustrative."
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard
          label="Projects"
          value={stats.projects.total}
          sublabel={`${stats.projects.published} published`}
        />
        <StatCard label="Developers" value={stats.developers.total} />
        <StatCard
          label="Articles"
          value={stats.articles.total}
          sublabel={`${stats.articles.published} published`}
        />
        <StatCard label="Testimonials" value={stats.testimonials.total} />
        <StatCard label="Media" value={stats.media.total} />
        <StatCard label="Social drafts" value={stats.social.total} />
      </div>

      {incomplete.length > 0 ? (
        <div className="mt-10">
          <h2 className="mb-4 font-heading text-lg text-forest">Needs attention</h2>
          <ul className="flex flex-col gap-2">
            {incomplete.map(({ project, reasons }) => (
              <li
                key={project.slug}
                className="flex flex-col gap-2 rounded-xl border border-gold/30 bg-gold/5 px-5 py-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-gold" />
                  <div>
                    <span className="text-sm font-medium text-forest">
                      {project.name}
                    </span>
                    <p className="mt-0.5 text-xs text-ink-soft">
                      {reasons.map((r) => reasonLabels[r]).join(" · ")}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/dashboard/projects`}
                  className="shrink-0 text-xs font-semibold text-forest underline underline-offset-2"
                >
                  Review
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
