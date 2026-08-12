import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { company } from "@/config/company";
import { PageHeader } from "@/components/sections/page-header";
import { VideoPlaceholder } from "@/components/sections/video-placeholder";
import { PullQuote } from "@/components/sections/pull-quote";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return { title: t("title") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const t = await getTranslations("pages.about");
  const sections = t.raw("sections") as { title: string; body: string }[];

  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} />

      <div className="bg-cream py-16">
        <VideoPlaceholder label={t("videoLabel")} />

        <Reveal className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2.5 px-6 text-center text-sm text-ink-soft">
          <ShieldCheck className="size-4 shrink-0 text-gold" />
          {t("licenseNote")}
        </Reveal>
      </div>

      <div className="bg-beige/40 py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:px-10">
          {sections.map((section, i) => (
            <Reveal
              key={section.title}
              delay={i * 0.06}
              className="rounded-2xl border border-beige-dark/60 bg-white p-7"
            >
              <h2 className="font-heading text-lg text-forest">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {section.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      <PullQuote quote={t("quote")} attribution={t("quoteAttribution")} />

      <div className="bg-cream py-16 text-center">
        <Button asChild size="lg">
          <a href={company.calendlyUrl} target="_blank" rel="noopener noreferrer">
            {t("closingCta")}
          </a>
        </Button>
      </div>
    </>
  );
}
