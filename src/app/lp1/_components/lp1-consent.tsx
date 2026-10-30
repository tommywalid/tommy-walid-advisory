"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { loadMetaPixel, readConsent, storeConsent, type ConsentValue } from "../_lib/meta-pixel";

/**
 * Ad-measurement consent dialog for LP1, centered over the page so the
 * visitor makes an explicit choice. The Meta Pixel is loaded only after
 * "Accept"; "Decline" loads nothing and the page stays fully usable.
 *
 * Both choices are buttons of identical size and style, one click each:
 * CNIL doctrine requires refusing to be as easy and as visible as
 * accepting. Rendered only when a pixel ID is configured.
 */
export function Lp1Consent({ pixelId }: { pixelId: string }) {
  const t = useTranslations("lp1.consent");
  const [choice, setChoice] = useState<ConsentValue | null | "unknown">("unknown");
  const firstButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = readConsent();
    setChoice(stored);
    if (stored === "granted") loadMetaPixel(pixelId);
  }, [pixelId]);

  const open = Boolean(pixelId) && choice === null;

  useEffect(() => {
    if (!open) return;
    firstButton.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  function decide(value: ConsentValue) {
    storeConsent(value);
    setChoice(value);
    if (value === "granted") loadMetaPixel(pixelId);
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/60 p-4 backdrop-blur-[2px]">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lp1-consent-text"
        className="w-full max-w-sm rounded-xl border border-gold/25 bg-forest p-6 text-center text-cream shadow-2xl"
      >
        <p id="lp1-consent-text" className="text-sm leading-relaxed text-cream/90">
          {t("text")}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Button ref={firstButton} type="button" variant="gold" className="w-full" onClick={() => decide("denied")}>
            {t("decline")}
          </Button>
          <Button type="button" variant="gold" className="w-full" onClick={() => decide("granted")}>
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
