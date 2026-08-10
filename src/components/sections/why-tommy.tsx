import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";

export async function WhyTommy({ id }: { id?: string }) {
  const t = await getTranslations("home.whyTommy");
  const items = t.raw("items") as { question: string; answer: string }[];

  return (
    <section id={id} className="bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:h-fit">
            <span className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">
              {t("kicker")}
            </span>
            <h2 className="mt-4 max-w-sm text-balance font-heading text-3xl text-forest sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-sm text-balance leading-relaxed text-ink-soft">
              {t("subtitle")}
            </p>
          </Reveal>

          <div className="flex flex-col">
            {items.map((item, i) => (
              <Reveal key={item.question} delay={i * 0.06}>
                <div className="flex gap-6 border-t border-beige-dark py-8 first:border-t-0 first:pt-0 sm:gap-10">
                  <span className="shrink-0 font-heading text-3xl text-beige-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl text-forest sm:text-2xl">
                      {item.question}
                    </h3>
                    <p className="mt-3 leading-relaxed text-ink-soft">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
