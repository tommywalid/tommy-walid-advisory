import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Percent, Landmark, Award, Globe2 } from "lucide-react";

import { company } from "@/config/company";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";

const icons = [Percent, Landmark, Award, Globe2];

export async function WhyDubai() {
  const t = await getTranslations("home.whyDubai");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="bg-forest py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading kicker={t("kicker")} title={t("title")} dark />

        <Reveal className="mt-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-forest">
            <Image
              src="/images/why-dubai/skyline.jpg"
              alt={company.name}
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length]!;
            return (
              <Reveal
                key={item.title}
                delay={i * 0.08}
                className="flex gap-5 rounded-2xl border border-cream/10 bg-cream/[0.04] p-7"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-light">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-lg text-cream">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
