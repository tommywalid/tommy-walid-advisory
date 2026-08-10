import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export async function ContactCta() {
  const t = await getTranslations("home.contactCta");

  return (
    <section className="bg-forest py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal className="flex flex-col items-center gap-6">
          <h2 className="text-balance font-heading text-3xl text-cream sm:text-4xl">
            {t("title")}
          </h2>
          <p className="max-w-lg text-balance text-base leading-relaxed text-cream/70">
            {t("subtitle")}
          </p>
          <Button asChild variant="gold" size="lg" className="mt-2">
            <Link href="/contact">{t("cta")}</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
