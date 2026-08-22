import { getTranslations } from "next-intl/server";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";

type Phase = {
  title: string;
  description: string;
  tags: { label: string; mode: "direct" | "partner" }[];
};

function PhaseTags({ tags }: { tags: Phase["tags"] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2 lg:justify-center">
      {tags.map((tag) => (
        <span
          key={tag.label}
          className="inline-flex items-center gap-1.5 rounded-full border border-beige-dark bg-white px-2.5 py-1 text-[11px] text-ink-soft"
        >
          <span
            className={cn(
              "size-1.5 rounded-full",
              tag.mode === "direct" ? "bg-gold" : "bg-beige-dark",
            )}
          />
          {tag.label}
        </span>
      ))}
    </div>
  );
}

export async function Services({
  id,
  showHeading = true,
}: {
  id?: string;
  showHeading?: boolean;
}) {
  const t = await getTranslations("home.services");
  const phases = t.raw("phases") as Phase[];

  return (
    <section id={id} className="scroll-mt-24 bg-beige/50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {showHeading ? (
          <SectionHeading
            kicker={t("kicker")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        ) : null}

        <div
          className={cn(
            "flex items-center justify-center gap-5 text-xs text-ink-soft",
            showHeading ? "mt-4" : "mb-2",
          )}
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-gold" />
            {t("directLabel")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-beige-dark" />
            {t("partnerLabel")}
          </span>
        </div>

        {/* Mobile: vertical rail */}
        <ol className="mt-10 flex flex-col lg:hidden">
          {phases.map((phase, i) => (
            <Reveal as="li" key={phase.title} delay={i * 0.06}>
              <div className="relative pb-12 pl-14 last:pb-0">
                {i < phases.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute top-10 bottom-0 left-5 w-px bg-beige-dark"
                  />
                ) : null}
                <span className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-full bg-forest font-heading text-sm text-gold-light">
                  {i + 1}
                </span>
                <h3 className="font-heading text-xl text-forest">
                  {phase.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {phase.description}
                </p>
                <PhaseTags tags={phase.tags} />
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Desktop: horizontal journey rail */}
        <div className="relative mt-10 hidden lg:grid lg:grid-cols-4 lg:gap-x-8">
          <span
            aria-hidden
            className="absolute inset-x-0 top-5 h-px bg-beige-dark"
          />
          {phases.map((phase, i) => (
            <Reveal
              key={phase.title}
              delay={i * 0.08}
              className="relative flex flex-col items-center text-center"
            >
              <span className="relative z-10 flex size-10 items-center justify-center rounded-full bg-forest font-heading text-sm text-gold-light">
                {i + 1}
              </span>
              <h3 className="mt-5 font-heading text-xl text-forest">
                {phase.title}
              </h3>
              <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-ink-soft">
                {phase.description}
              </p>
              <PhaseTags tags={phase.tags} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-14 flex justify-center">
          <p className="max-w-2xl text-balance text-center text-base leading-relaxed text-forest italic">
            “{t("commitment")}”
          </p>
        </Reveal>
      </div>
    </section>
  );
}
