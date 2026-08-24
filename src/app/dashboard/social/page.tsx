import { getAllSocialSnippets } from "@/lib/social";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function DashboardSocialPage() {
  const snippets = getAllSocialSnippets();

  return (
    <>
      <DashboardPageHeader
        title="Social"
        description="AI-generated social copy, drafted from an existing Project or Article, never invented independently, always reviewed before use."
        action={
          <Button disabled className="gap-1.5 opacity-50">
            <Sparkles className="size-4" />
            Generate from...
            <span className="ml-1 text-[10px] font-normal opacity-70">Coming soon</span>
          </Button>
        }
      />

      {snippets.length === 0 ? (
        <DashboardEmptyState
          title="No social drafts yet"
          body="This is a drafting surface, not a posting/scheduling tool. Generate a snippet from a Project or Article, review it, then copy it out. Publishing integrations are a later, separate step."
        />
      ) : null}
    </>
  );
}
