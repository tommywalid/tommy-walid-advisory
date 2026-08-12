import { getTranslations } from "next-intl/server";

import { company, getWhatsAppLink } from "@/config/company";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { WhatsappIcon } from "@/components/brand/social-icons";

export async function ContactCta() {
  const t = await getTranslations("home.contactCta");
  const whatsappHref = getWhatsAppLink();

  return (
    <section className="relative overflow-hidden bg-forest py-24 sm:py-28">
      {/* Reserved ambient backdrop — abstract, brand-native gradient only (no stock imagery); see docs/design/visual-experience-roadmap.md */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.9]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 65% at 50% 0%, rgba(216,189,127,0.10), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal className="flex flex-col items-center gap-6">
          <h2 className="text-balance font-heading text-3xl text-cream sm:text-4xl">
            {t("title")}
          </h2>
          <p className="max-w-lg text-balance text-base leading-relaxed text-cream/70">
            {t("subtitle")}
          </p>
          <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
            <Button asChild variant="gold" size="lg">
              <a href={company.calendlyUrl} target="_blank" rel="noopener noreferrer">
                {t("cta")}
              </a>
            </Button>
            {whatsappHref ? (
              <Button asChild variant="outlineLight" size="lg">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <WhatsappIcon className="size-4" />
                  {t("whatsappCta")}
                </a>
              </Button>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
