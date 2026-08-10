import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/**
 * Shared block for the three first-person advisory notes on a project page
 * ("Why I Recommend," "Why I Trust This Developer," "Why This Location
 * Matters") — one component, a size variant, so the narrative always looks
 * intentional rather than like three different UI patterns bolted together.
 */
export function AdvisorInsight({
  title,
  text,
  size = "sm",
  className,
}: {
  title: string;
  text: string;
  size?: "lg" | "sm";
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div
        className={cn(
          "rounded-2xl border border-beige-dark/60 bg-white",
          size === "lg" ? "p-8" : "p-6",
        )}
      >
        <h3
          className={cn(
            "font-heading text-forest",
            size === "lg" ? "text-2xl" : "text-lg",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-3 leading-relaxed text-ink-soft",
            size === "lg" ? "text-base" : "text-sm",
          )}
        >
          {text}
        </p>
      </div>
    </Reveal>
  );
}
