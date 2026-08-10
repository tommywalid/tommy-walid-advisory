import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Separator } from "@/components/ui/separator";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.privacyPolicy" });
  return { title: t("title") };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const t = await getTranslations("pages.privacyPolicy");
  const sections = t.raw("sections") as { title: string; body: string }[];

  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} />

      <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
        <Reveal className="flex flex-col">
          {sections.map((section, i) => (
            <div key={section.title}>
              <div className="py-8">
                <h2 className="font-heading text-xl text-forest">
                  {section.title}
                </h2>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  {section.body}
                </p>
              </div>
              {i < sections.length - 1 ? <Separator /> : null}
            </div>
          ))}
        </Reveal>
      </div>
    </>
  );
}
