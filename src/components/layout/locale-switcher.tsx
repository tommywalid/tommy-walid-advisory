"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const labels: Record<string, string> = { fr: "FR", en: "EN" };

export function LocaleSwitcher({ dark = false }: { dark?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-1.5 text-sm font-medium"
      aria-label="Language switcher"
    >
      {routing.locales.map((code, index) => (
        <span key={code} className="flex items-center">
          {index > 0 && (
            <span className={cn("mx-1.5", dark ? "text-cream/30" : "text-beige-dark")}>
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: code })}
            aria-current={locale === code ? "true" : undefined}
            className={cn(
              "transition-colors",
              locale === code
                ? dark
                  ? "text-gold-light"
                  : "text-forest"
                : dark
                  ? "text-cream/60 hover:text-cream"
                  : "text-ink-soft hover:text-forest",
            )}
          >
            {labels[code]}
          </button>
        </span>
      ))}
    </div>
  );
}
