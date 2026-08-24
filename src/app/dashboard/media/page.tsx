import { getAllMedia } from "@/lib/media";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function DashboardMediaPage() {
  const media = getAllMedia();

  return (
    <>
      <DashboardPageHeader
        title="Media"
        description="A shared library: type (photo/render/masterplan/aerial/logo) and captions are required at upload, not added later."
        action={
          <Button disabled className="gap-1.5 opacity-50">
            <Upload className="size-4" />
            Upload
            <span className="ml-1 text-[10px] font-normal opacity-70">Coming soon</span>
          </Button>
        }
      />

      {media.length === 0 ? (
        <DashboardEmptyState
          title="No media uploaded yet"
          body="Every asset used across Projects, Developers, and Articles will live here, with usage tracking so nothing gets deleted out from under a live listing."
        />
      ) : null}
    </>
  );
}
