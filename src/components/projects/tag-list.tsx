import { getTagLabel } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * Renders Best For / Key Highlights / Property Type pills. Shared across
 * project cards and detail pages. `dictionary` is a raw translation object
 * (t.raw(namespace)) — unknown keys fall back to a humanized label, which is
 * what makes Best For / Key Highlights genuinely open tag systems rather
 * than a closed enum requiring a translation before a new tag can be used.
 */
export function TagList({
  tags,
  dictionary,
  variant = "default",
  className,
}: {
  tags: string[];
  dictionary: Record<string, string>;
  variant?: "default" | "gold";
  className?: string;
}) {
  if (tags.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className={cn(
            "rounded-full border px-3 py-1 text-xs",
            variant === "gold"
              ? "border-gold/40 bg-gold/10 text-gold"
              : "border-beige-dark bg-white text-ink-soft",
          )}
        >
          {getTagLabel(dictionary, tag)}
        </li>
      ))}
    </ul>
  );
}
