import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { company } from "@/config/company";
import { navigation } from "@/config/navigation";
import { Logo } from "@/components/brand/logo";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/10 bg-forest text-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
              {t("tagline")}
            </p>
            <div className="mt-6 flex items-center gap-5 text-xs font-semibold tracking-[0.14em] uppercase">
              <a
                href={company.social.linkedin}
                className="text-cream/60 transition-colors hover:text-gold-light"
              >
                LinkedIn
              </a>
              <a
                href={company.social.instagram}
                className="text-cream/60 transition-colors hover:text-gold-light"
              >
                Instagram
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
              {t("navTitle")}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {navigation.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/75 transition-colors hover:text-cream"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
              {t("legalTitle")}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-cream/75 transition-colors hover:text-cream"
                >
                  {t("privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
              {t("contactTitle")}
            </h3>
            <p className="mt-4 text-sm text-cream/75">
              <a
                href={`mailto:${company.email}`}
                className="transition-colors hover:text-cream"
              >
                {company.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. {t("rights")}
          </p>
          <p className="max-w-2xl sm:text-right">{t("disclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
