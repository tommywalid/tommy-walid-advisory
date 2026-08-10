import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal } from "@/components/motion/reveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.blog" });
  return { title: t("title") };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const t = await getTranslations("pages.blog");

  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} />
      <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
        <Reveal className="flex flex-col items-center gap-4 rounded-2xl border border-beige-dark/70 bg-white px-8 py-16 text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-full bg-beige text-forest">
            <Newspaper className="size-5" />
          </span>
          <p className="max-w-sm text-balance leading-relaxed text-ink-soft">
            {t("emptyState")}
          </p>
        </Reveal>
      </div>
    </>
  );
}
