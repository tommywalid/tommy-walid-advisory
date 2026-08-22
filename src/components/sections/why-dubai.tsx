import { getTranslations } from "next-intl/server";

import { SectionHeading } from "@/components/sections/section-heading";
import { WhyDubaiChoices } from "@/components/sections/why-dubai-choices";

type Item = { title: string; description: string };

export async function WhyDubai() {
  const t = await getTranslations("home.whyDubai");
  const investorItems = t.raw("investorItems") as Item[];
  const expatItems = t.raw("expatItems") as Item[];

  return (
    <section className="bg-forest py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading title={t("title")} subtitle={t("intro")} dark />

        <WhyDubaiChoices
          investorLabel={t("investorColumnTitle")}
          investorItems={investorItems}
          expatLabel={t("expatColumnTitle")}
          expatItems={expatItems}
        />
      </div>
    </section>
  );
}
