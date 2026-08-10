import { cn } from "@/lib/utils";

/**
 * Typographic wordmark — a personal name, not a company suffix.
 * This is a personal brand ("Tommy Walid," not "Tommy Walid Advisory"):
 * no "Advisory"/company-style subtitle, deliberately. See
 * docs/branding/brand-identity.md. No graphic mark approved yet either
 * (see docs/branding/logo-guidelines.md) — text-only for now.
 */
export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "font-heading text-[1.2rem] tracking-tight",
        dark ? "text-cream" : "text-forest",
        className,
      )}
    >
      Tommy Walid
    </span>
  );
}
