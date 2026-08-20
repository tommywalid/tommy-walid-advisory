import { getTranslations } from "next-intl/server";
import {
  Percent,
  Landmark,
  TrendingUp,
  Users,
  Globe2,
  Building2,
  Wallet,
  ShieldCheck,
  Sparkles,
  Plane,
  Heart,
  Award,
} from "lucide-react";

import { SectionHeading } from "@/components/sections/section-heading";

type Item = { title: string; description: string };

const investorIcons = [Percent, Landmark, TrendingUp, Users, Globe2, Building2, Wallet];
const expatIcons = [ShieldCheck, Sparkles, Building2, Plane, Percent, Heart, Award];

function Capsule({ item, Icon }: { item: Item; Icon: (typeof investorIcons)[number] }) {
  return (
    <div className="flex gap-5 rounded-2xl border border-cream/10 bg-cream/[0.04] p-7">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-light">
        <Icon className="size-5" />
      </span>
      <div>
        <h4 className="font-heading text-lg text-cream">{item.title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-cream/70">{item.description}</p>
      </div>
    </div>
  );
}

export async function WhyDubai() {
  const t = await getTranslations("home.whyDubai");
  const investorItems = t.raw("investorItems") as Item[];
  const expatItems = t.raw("expatItems") as Item[];

  return (
    <section className="bg-forest py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading title={t("title")} dark />

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8">
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
              {t("investorColumnTitle")}
            </h3>
            <div className="mt-6 flex flex-col gap-4">
              {investorItems.map((item, i) => (
                <Capsule key={item.title} item={item} Icon={investorIcons[i % investorIcons.length]!} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
              {t("expatColumnTitle")}
            </h3>
            <div className="mt-6 flex flex-col gap-4">
              {expatItems.map((item, i) => (
                <Capsule key={item.title} item={item} Icon={expatIcons[i % expatIcons.length]!} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
