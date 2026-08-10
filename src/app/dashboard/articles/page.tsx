import { getAllArticles } from "@/lib/articles";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { NewItemButton } from "@/components/dashboard/new-item-button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { AIBadge } from "@/components/dashboard/ai-badge";

export default function DashboardArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <DashboardPageHeader
        title="Articles"
        description="For the future Market Insights journal — see docs/product/roadmap.md."
        action={<NewItemButton label="New Article" />}
      />

      {articles.length === 0 ? (
        <DashboardEmptyState
          title="No articles yet"
          body="This section activates once the Market Insights sprint begins. A “Generate with AI” draft option will live in the article editor, reviewable before publish."
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-beige-dark/60 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-beige-dark/60 bg-beige/30 text-xs text-ink-soft uppercase">
              <tr>
                <th className="px-5 py-3 font-semibold">Title</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.slug} className="border-b border-beige-dark/40 last:border-0">
                  <td className="px-5 py-3 font-medium text-forest">
                    <div className="flex items-center gap-2">
                      {article.title.en}
                      {article.bodyMeta?.aiAssisted ? <AIBadge /> : null}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-ink-soft">{article.category}</td>
                  <td className="px-5 py-3">
                    <StatusBadge published={article.published} />
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
