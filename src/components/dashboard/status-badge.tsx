import { cn } from "@/lib/utils";

export function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase",
        published ? "bg-forest/10 text-forest" : "bg-beige text-ink-soft",
      )}
    >
      {published ? "Published" : "Draft"}
    </span>
  );
}
