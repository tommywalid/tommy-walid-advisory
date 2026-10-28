"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { loadMetaPixel, readConsent, storeConsent, type ConsentValue } from "../_lib/meta-pixel";

/**
 * Ad-measurement consent banner for LP1. The Meta Pixel is loaded only
 * after "Accept"; "Decline" loads nothing. Rendered only when a pixel ID
 * is configured — with no pixel there is nothing to consent to.
 */
export function Lp1Consent({ pixelId }: { pixelId: string }) {
  const t = useTranslations("lp1.consent");
  const [choice, setChoice] = useState<ConsentValue | null | "unknown">("unknown");

  useEffect(() => {
    const stored = readConsent();
    setChoice(stored);
    if (stored === "granted") loadMetaPixel(pixelId);
  }, [pixelId]);

  if (!pixelId || choice !== null) return null;

  function decide(value: ConsentValue) {
    storeConsent(value);
    setChoice(value);
    if (value === "granted") loadMetaPixel(pixelId);
  }

  return (
    <div
      role="region"
      aria-label={t("text")}
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-gold/25 bg-forest px-4 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] text-cream shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.4)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 sm:flex-row sm:justify-between lg:px-6">
        <p className="text-center text-sm text-cream/85 sm:text-start">{t("text")}</p>
        <div className="flex w-full shrink-0 gap-2 sm:w-auto">
          <Button type="button" variant="outlineLight" size="sm" className="flex-1 sm:flex-none" onClick={() => decide("denied")}>
            {t("decline")}
          </Button>
          <Button type="button" variant="gold" size="sm" className="flex-1 sm:flex-none" onClick={() => decide("granted")}>
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
