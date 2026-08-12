import type { Metadata } from "next";
import { Mail, CalendarDays } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { company, getWhatsAppLink } from "@/config/company";
import { mapBestForToGoal } from "@/config/projects";
import { getProjectBySlug } from "@/lib/projects";
import { PageHeader } from "@/components/sections/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import {
  WhatsappIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  TiktokIcon,
} from "@/components/brand/social-icons";

const socialLinks = [
  { href: company.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: company.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: company.social.facebook, label: "Facebook", Icon: FacebookIcon },
  { href: company.social.youtube, label: "YouTube", Icon: YoutubeIcon },
  { href: company.social.tiktok, label: "TikTok", Icon: TiktokIcon },
];

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
  const whatsappHref = getWhatsAppLink();

  return (
    <>
      <PageHeader kicker={t("kicker")} title={t("title")} intro={t("intro")} />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-24 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:px-10">
        <Reveal>
          <h2 className="font-heading text-xl text-forest">
            {t("directTitle")}
          </h2>

          <div className="mt-4 flex flex-col gap-4">
            <a
              href={`mailto:${company.email}`}
              className="inline-flex items-center gap-3 text-sm text-ink-soft transition-colors hover:text-forest"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-beige text-forest">
                <Mail className="size-4" />
              </span>
              {company.email}
            </a>

            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-ink-soft transition-colors hover:text-forest"
              >
                <span className="inline-flex size-9 items-center justify-center rounded-full bg-beige text-forest">
                  <WhatsappIcon className="size-4" />
                </span>
                {t("whatsappCta")}
              </a>
            ) : null}

            <a
              href={company.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-ink-soft transition-colors hover:text-forest"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-beige text-forest">
                <CalendarDays className="size-4" />
              </span>
              {t("calendlyCta")}
            </a>
          </div>

          <div className="mt-10 border-t border-beige-dark/60 pt-6">
            <h3 className="text-xs font-semibold tracking-[0.14em] text-ink-soft uppercase">
              {t("socialTitle")}
            </h3>
            <div className="mt-4 flex items-center gap-4">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-ink-soft transition-colors hover:text-forest"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
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
