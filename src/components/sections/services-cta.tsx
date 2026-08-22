import { getTranslations } from "next-intl/server";

import { company } from "@/config/company";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServicesCtaChoices } from "@/components/sections/services-cta-choices";

/**
 * Closing section for /services only: "where are you today" self-selection
 * followed by a single, sober CTA into a real conversation (Calendly, same
 * destination as every other "book a call" entry point sitewide).
 */
export async function ServicesCta() {
  const t = await getTranslations("pages.services.cta");
  const choices = t.raw("choices") as { title: string; description: string }[];

  return (
    <section className="bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <Reveal>
          <ServicesCtaChoices choices={choices} groupLabel={t("title")} />
        </Reveal>

        <Reveal className="mt-10 flex justify-center">
          <Button asChild variant="gold" size="lg">
            <a href={company.calendlyUrl} target="_blank" rel="noopener noreferrer">
              {t("cta")}
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
