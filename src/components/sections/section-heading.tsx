import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

type SectionHeadingProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {kicker ? (
        <span
          className={cn(
            "text-xs font-semibold tracking-[0.28em] uppercase",
            dark ? "text-gold-light" : "text-gold-text",
          )}
        >
          {kicker}
        </span>
      ) : null}
      <h2
        className={cn(
          "max-w-2xl text-balance font-heading text-3xl sm:text-4xl",
          dark ? "text-cream" : "text-forest",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "max-w-xl text-balance text-base leading-relaxed",
            dark ? "text-cream/70" : "text-ink-soft",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
