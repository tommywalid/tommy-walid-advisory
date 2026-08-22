import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { PageHeader } from "@/components/sections/page-header";
import { ApproachPrinciples } from "@/components/sections/approach-principles";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.investmentProcess" });
  return { title: t("title") };
}

export default async function InvestmentProcessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const t = await getTranslations("pages.investmentProcess");

  return (
    <>
      <PageHeader title={t("title")} intro={t("intro")} />
      <ApproachPrinciples />
    </>
  );
}
