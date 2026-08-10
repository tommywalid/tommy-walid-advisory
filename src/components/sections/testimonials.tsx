import { getTranslations } from "next-intl/server";
import { Quote } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";

export async function Testimonials() {
  const t = await getTranslations("home.testimonials");
  const items = t.raw("items") as { quote: string; attribution: string }[];

  return (
    <section className="bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <SectionHeading kicker={t("kicker")} title={t("title")} className="gap-3" />
          <Badge variant="outline">{t("notice")}</Badge>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal
              key={item.attribution + i}
              delay={i * 0.08}
              className="flex flex-col gap-5 rounded-2xl border border-dashed border-beige-dark bg-beige/30 p-7"
            >
              <Quote className="size-6 text-gold" />
              <p className="text-balance font-heading text-lg leading-snug text-forest italic">
                “{item.quote}”
              </p>
              <span className="text-xs font-medium tracking-wide text-ink-soft uppercase">
                {item.attribution}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
