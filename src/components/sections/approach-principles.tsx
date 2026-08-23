import { getTranslations } from "next-intl/server";

import { ApproachExperience } from "@/components/sections/approach-experience";

type Principle = { title: string; description: string };

/**
 * "Mon approche" — the page's entire content: title, intro and the 5
 * working principles, now paired with an abstract trajectory graphic
 * (ApproachVisual) synchronized to whichever principle is hovered/focused/
 * tapped (ApproachExperience). This replaces the page's previous
 * PageHeader-banner-then-grid structure — title and intro moved here so
 * they can sit in the same two-column layout as the graphic, instead of
 * being restated twice.
 */
export async function ApproachPrinciples() {
  const t = await getTranslations("pages.investmentProcess");
  const principles = t.raw("principles") as Principle[];

  return (
    <section className="bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <ApproachExperience title={t("title")} intro={t("intro")} principles={principles} />
      </div>
    </section>
  );
}
