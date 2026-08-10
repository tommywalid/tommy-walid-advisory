import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { company } from "@/config/company";
import { mapBestForToGoal } from "@/config/projects";
import { getProjectBySlug } from "@/lib/projects";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return { title: t("title") };
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ project?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);
  const t = await getTranslations("pages.contact");

  const sp = await searchParams;
  const project = sp.project ? getProjectBySlug(sp.project) : undefined;
  const goalDict = t.raw("goalLabels") as Record<string, string>;
  const initialGoal = project
    ? (goalDict[mapBestForToGoal(project.bestFor)] ?? "")
    : "";
  const initialMessage = project
    ? t("projectInterestMessage", { name: project.name })
    : "";

  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-24 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:px-10">
        <Reveal>
          <h2 className="font-heading text-xl text-forest">
            {t("directTitle")}
          </h2>
          <a
            href={`mailto:${company.email}`}
            className="mt-4 inline-flex items-center gap-3 text-sm text-ink-soft transition-colors hover:text-forest"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-beige text-forest">
              <Mail className="size-4" />
            </span>
            {company.email}
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="bg-white p-8">
            <h2 className="font-heading text-xl text-forest">{t("formTitle")}</h2>
            <p className="mt-2 text-sm text-ink-soft">{t("formSubtitle")}</p>
            <div className="mt-6">
              <ContactForm initialGoal={initialGoal} initialMessage={initialMessage} />
            </div>
          </Card>
        </Reveal>
      </div>
    </>
  );
}
