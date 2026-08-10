import { developers } from "@/data/developers";
import { getAllProjects } from "@/lib/projects";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { NewItemButton } from "@/components/dashboard/new-item-button";
import { AIBadge } from "@/components/dashboard/ai-badge";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";

export default function DashboardDevelopersPage() {
  const allProjects = getAllProjects();

  return (
    <>
      <DashboardPageHeader
        title="Developers"
        description="One entry per builder, reused across every project of theirs — see src/types/projects.ts."
        action={<NewItemButton label="New Developer" />}
      />

      {developers.length === 0 ? (
        <DashboardEmptyState
          title="No developers yet"
          body="A developer's trust note is written once here and reused across all their projects — no rewriting the same note per listing."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-beige-dark/60 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-beige-dark/60 bg-beige/30 text-xs text-ink-soft uppercase">
              <tr>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Used by</th>
                <th className="px-5 py-3 font-semibold">Why I Trust Them</th>
              </tr>
            </thead>
            <tbody>
              {developers.map((developer) => (
                <tr key={developer.id} className="border-b border-beige-dark/40 last:border-0">
                  <td className="px-5 py-3 font-medium text-forest">{developer.name}</td>
                  <td className="px-5 py-3 text-ink-soft">
                    {allProjects.filter((p) => p.developerId === developer.id).length}{" "}
                    project(s)
                  </td>
                  <td className="px-5 py-3">
                    {developer.whyITrustThemMeta?.aiAssisted && !developer.whyITrustThemMeta?.aiReviewedAt ? (
                      <AIBadge />
                    ) : developer.whyITrustThem.en.trim() ? (
                      <span className="text-xs text-ink-soft">Written</span>
                    ) : (
                      <span className="text-ink-soft/40">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
