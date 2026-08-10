import { Star } from "lucide-react";

import { getAllProjects, getDeveloper } from "@/lib/projects";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { NewItemButton } from "@/components/dashboard/new-item-button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";

const tierOrder = { A: 0, B: 1, C: 2 } as const;

export default function DashboardProjectsPage() {
  const projects = [...getAllProjects()].sort((a, b) => {
    const tierDiff = (tierOrder[a.tier ?? "C"] ?? 3) - (tierOrder[b.tier ?? "C"] ?? 3);
    return tierDiff !== 0 ? tierDiff : a.name.localeCompare(b.name);
  });

  return (
    <>
      <DashboardPageHeader
        title="Projects"
        description="The curated selection shown on the public site — target 20–30 live at a time."
        action={<NewItemButton label="New Project" />}
      />

      {projects.length === 0 ? (
        <DashboardEmptyState
          title="No projects yet"
          body="Projects you add here will appear on /projects and, if featured, on the homepage — matching src/types/projects.ts exactly."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-beige-dark/60 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-beige-dark/60 bg-beige/30 text-xs text-ink-soft uppercase">
              <tr>
                <th className="px-5 py-3 font-semibold">Tier</th>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Developer</th>
                <th className="px-5 py-3 font-semibold">Location</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Featured</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.slug} className="border-b border-beige-dark/40 last:border-0">
                  <td className="px-5 py-3 text-ink-soft">{project.tier ?? "—"}</td>
                  <td className="px-5 py-3 font-medium text-forest">{project.name}</td>
                  <td className="px-5 py-3 text-ink-soft">
                    {getDeveloper(project.developerId)?.name ?? "—"}
                  </td>
                  <td className="px-5 py-3 text-ink-soft">{project.location}</td>
                  <td className="px-5 py-3">
                    <StatusBadge published={project.published} />
                  </td>
                  <td className="px-5 py-3">
                    {project.featured ? (
                      <Star className="size-4 fill-gold text-gold" />
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
