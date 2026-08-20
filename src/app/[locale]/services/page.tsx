import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { PageHeader } from "@/components/sections/page-header";
import { ServicesRadial, type ServicesRadialIconKey, type ServicesRadialNode } from "@/components/sections/services-radial";
import { Services } from "@/components/sections/services";
import { ServicesCta } from "@/components/sections/services-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  return { title: t("title") };
}

// Icons are design-level metadata, not translatable copy, so they're kept
// out of messages/*.json and zipped onto the translated nodes here, in the
// same order as pages.services.radial.nodes in both locale files.
const NODE_ICONS: ServicesRadialIconKey[] = [
  "target",
  "sliders",
  "search",
  "handshake",
  "scale",
  "landmark",
  "signature",
  "payments",
  "key",
  "sofa",
  "trending",
  "refresh",
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const t = await getTranslations("pages.services");
  const tRadial = await getTranslations("pages.services.radial");
  const nodes = (tRadial.raw("nodes") as ServicesRadialNode[]).map((node, i) => ({
    ...node,
    icon: NODE_ICONS[i],
  }));

  return (
    <>
      <PageHeader title={t("title")} />
      <ServicesRadial
        centerTitle={tRadial("centerTitle")}
        centerSubtitle={tRadial("centerSubtitle")}
        nodes={nodes}
      />
      <Services showHeading={false} />
      <ServicesCta />
    </>
  );
}
