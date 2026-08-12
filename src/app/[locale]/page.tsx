import { setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { Hero } from "@/components/sections/hero";
import { WhyTommy } from "@/components/sections/why-tommy";
import { WhyDubai } from "@/components/sections/why-dubai";
import { Services } from "@/components/sections/services";
import { SelectedProjects } from "@/components/sections/selected-projects";
import { Faq } from "@/components/sections/faq";
import { ContactCta } from "@/components/sections/contact-cta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);

  return (
    <>
      <Hero />
      <WhyTommy id="why-tommy" />
      <WhyDubai />
      <Services id="services" />
      <SelectedProjects id="projects" />
      <Faq />
      <ContactCta />
    </>
  );
}
