import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";

type Principle = { title: string; description: string };

/**
 * "Mon approche" — 5 working principles, presented as an editorial grid of
 * independent statements, deliberately NOT as a numbered 01→05 journey
 * (that visual language already belongs to /services, both the radial and
 * the 4-step parcours). No cards, no borders, no icons: typography and
 * whitespace alone carry the "premium, editorial" read the brief asks for,
 * and keep this visually distinct from every numbered list elsewhere on
 * the site.
 */
export async function ApproachPrinciples() {
  const t = await getTranslations("pages.investmentProcess");
  const principles = t.raw("principles") as Principle[];

  return (
    <section className="bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2 sm:gap-y-14">
          {principles.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 0.06}>
              <h2 className="font-heading text-xl text-forest sm:text-2xl">{principle.title}</h2>
              <p className="mt-3 max-w-md text-balance leading-relaxed text-ink-soft">
                {principle.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
