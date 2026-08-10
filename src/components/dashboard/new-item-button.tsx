import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Present in the IA (every list view has a "+ New" action) but
 * intentionally non-functional — CRUD/persistence isn't implemented yet.
 * Disabled rather than a dead link, so it's honest about its state.
 */
export function NewItemButton({ label }: { label: string }) {
  return (
    <Button disabled className="gap-1.5 opacity-50">
      <Plus className="size-4" />
      {label}
      <span className="ml-1 text-[10px] font-normal opacity-70">Coming soon</span>
    </Button>
  );
}
