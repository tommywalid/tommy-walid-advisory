import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type AppLocale } from "@/i18n/routing";
import { company } from "@/config/company";
import { fraunces, inter, notoKufiArabic, notoSansArabic } from "@/lib/fonts";
import "../../globals.css";

/**
 * Standalone landing page (LP1) — a sibling top-level segment to [locale]
 * and dashboard, rendering its own <html>/<body> (same pattern as
 * dashboard/layout.tsx). Deliberately independent from the public site:
 * no Header, no Footer, no navigation, no sitemap entry, not indexed.
 *
 * Reuses the shared design tokens (globals.css) and font loaders
 * (lib/fonts.ts) so the page stays visually consistent with the site, and
 * the same locales as i18n/routing.ts. Excluded from the next-intl
 * middleware (see src/middleware.ts) — the language comes from the
 * [lang] segment: /lp1/fr, /lp1/en, /lp1/ar. Texts live in /messages
 * under the `lp1` namespace.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "lp1.meta" });

  return {
    metadataBase: new URL(company.url),
    // Falls back to the brand name while a locale's LP1 texts are still empty.
    title: { absolute: t("title") || company.name },
    description: t("description") || undefined,
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
  };
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function Lp1Layout({ children, params }: LayoutProps) {
  const { lang } = await params;

  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  setRequestLocale(lang as AppLocale);
  const messages = await getMessages();
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${fraunces.variable} ${inter.variable} ${notoKufiArabic.variable} ${notoSansArabic.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink antialiased">
        <NextIntlClientProvider messages={{ lp1: messages.lp1 }}>
          <main className="flex-1">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
