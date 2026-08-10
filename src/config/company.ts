/**
 * Single source of truth for business/contact information.
 *
 * This is a personal brand, not a company — "Tommy Walid," not
 * "Tommy Walid Advisory." Copy sitewide should read as one person speaking
 * in the first person ("I" / "me" / "my"), never "we" / "our" / "the team."
 * See docs/branding/brand-identity.md.
 *
 * Marketing copy that must vary by locale (hero headline, footer tagline
 * wording, etc.) stays in /messages — this file is for facts: how to reach
 * the business, and in what currency/timezone/languages it operates.
 *
 * Fields not yet confirmed are `null`. Components must handle that by
 * hiding the affected UI, never by rendering a fabricated value.
 */
export const company = {
  name: "Tommy Walid",
  /** Canonical, non-localized fallback (used in metadata/structured data only). */
  tagline: "Dubai real estate investment advisor for international investors.",
  /**
   * Domain unchanged pending a decision on whether it moves off
   * "tommywalidadvisory.com" now that the brand is a personal name — flagged,
   * not assumed. Update here once a real domain/inbox decision is made.
   */
  url: "https://tommywalidadvisory.com",

  email: "contact@tommywalidadvisory.com",
  phone: null as string | null,
  /** E.164 format once available, e.g. "+971501234567". */
  whatsapp: null as string | null,
  calendlyUrl: null as string | null,

  address: {
    line1: null as string | null,
    city: "Dubai",
    country: "United Arab Emirates",
  },
  googleMapsUrl: null as string | null,

  social: {
    linkedin: "#",
    instagram: "#",
  },

  /**
   * Languages the business serves (product scope, per the master PRD).
   * May lead the site's technically implemented locales in i18n/routing.ts —
   * Arabic is planned but not yet built (see docs/design/multilingual-rtl-design.md).
   */
  languages: ["fr", "en", "ar"] as const,

  currency: "AED",
  timezone: "Asia/Dubai",
} as const;

/**
 * Builds a wa.me deep link with an optional prefilled message.
 * Returns null until `company.whatsapp` is set — callers should hide the
 * WhatsApp entry point entirely rather than link to nothing.
 */
export function getWhatsAppLink(prefilledMessage?: string): string | null {
  if (!company.whatsapp) return null;
  const digits = company.whatsapp.replace(/[^\d]/g, "");
  const query = prefilledMessage
    ? `?text=${encodeURIComponent(prefilledMessage)}`
    : "";
  return `https://wa.me/${digits}${query}`;
}
