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
  url: "https://www.tommywalid.com",

  email: "TommyWalid01@gmail.com",
  phone: "+971 58 530 4481",
  /** E.164-derivable — getWhatsAppLink() strips formatting when building the wa.me link. */
  whatsapp: "+971 58 530 4481",
  calendlyUrl: "https://calendly.com/tommywalid01/30min",

  address: {
    line1: null as string | null,
    city: "Dubai",
    country: "United Arab Emirates",
  },
  googleMapsUrl: null as string | null,

  social: {
    linkedin: "https://www.linkedin.com/in/walid-toumi-4a87535",
    instagram: "https://www.instagram.com/tommy_walid_01/",
    facebook: "https://www.facebook.com/search/top?q=tommy%20dubai%20real%20estate",
    tiktok: "https://www.tiktok.com/@walid.tommy7",
    youtube: "https://www.youtube.com/@WalidTOMMY01",
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
