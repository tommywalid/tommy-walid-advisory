/**
 * Meta Pixel helpers for LP1 — consent-gated.
 *
 * Nothing here runs until the visitor has clicked "Accept" in the LP1
 * consent banner (_components/lp1-consent.tsx). The choice is stored in
 * localStorage; without consent, no Meta script is loaded and no event is
 * sent. The pixel ID comes from NEXT_PUBLIC_META_PIXEL_ID (a public ID,
 * not a secret); when it is unset, the banner and the pixel are disabled.
 */
export const CONSENT_KEY = "lp1_ad_consent";
export type ConsentValue = "granted" | "denied";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function readConsent(): ConsentValue | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function storeConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable (private mode…): the choice applies to this visit only */
  }
}

let initialised = false;

/** Loads Meta's script (standard base code) and sends PageView. Idempotent. */
export function loadMetaPixel(pixelId: string) {
  if (initialised || !pixelId || typeof window === "undefined") return;
  initialised = true;

  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as Fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  window.fbq?.("init", pixelId);
  window.fbq?.("track", "PageView");
}

/**
 * Sends the Lead event after a confirmed submission. `eventId` is the same
 * id the server stores in Supabase (`leads.event_id`), so a later
 * Conversions API event can be de-duplicated against this one.
 */
export function trackLead(eventId: string | undefined) {
  if (!initialised || readConsent() !== "granted" || !window.fbq) return;
  window.fbq("track", "Lead", {}, eventId ? { eventID: eventId } : undefined);
}
