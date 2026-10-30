/**
 * LP1 lead form — single source of truth for the option keys and the
 * validation rules, shared by the client form (_components/lp1-form.tsx)
 * and the server endpoint (api/lead/route.ts) so both always agree.
 *
 * Option keys are the values stored in Supabase `leads` (budget, objectif,
 * horizon); their visible labels live in /messages under lp1.form.*.
 */
export const lp1Langs = ["fr", "en", "ar"] as const;
export type Lp1Lang = (typeof lp1Langs)[number];

export const budgetKeys = ["moins_150k", "150k_250k", "250k_500k", "plus_500k"] as const;
export const goalKeys = ["locatif", "plus_value", "residence", "diversification"] as const;
export const horizonKeys = ["0_3_mois", "3_6_mois", "6_12_mois", "renseigne"] as const;

export const countryCodes = [
  { value: "+33|FR", label: "🇫🇷 +33" },
  { value: "+32|BE", label: "🇧🇪 +32" },
  { value: "+41|CH", label: "🇨🇭 +41" },
  { value: "+352|LU", label: "🇱🇺 +352" },
  { value: "+212|MA", label: "🇲🇦 +212" },
  { value: "+1|CA", label: "🇨🇦 +1" },
  { value: "+971|AE", label: "🇦🇪 +971" },
  { value: "+44|GB", label: "🇬🇧 +44" },
  { value: "+49|DE", label: "🇩🇪 +49" },
  { value: "+31|NL", label: "🇳🇱 +31" },
  { value: "+34|ES", label: "🇪🇸 +34" },
  { value: "+39|IT", label: "🇮🇹 +39" },
  { value: "+216|TN", label: "🇹🇳 +216" },
  { value: "+213|DZ", label: "🇩🇿 +213" },
  { value: "+966|SA", label: "🇸🇦 +966" },
] as const;

export const trackingKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
] as const;

/** What the browser sends to /lp1/api/lead. */
export type Lp1LeadInput = {
  lang: string;
  budget: string;
  goal: string;
  horizon: string;
  firstName: string;
  lastName: string;
  countryCode: string;
  whatsapp: string;
  email: string;
  consent: boolean;
  segment?: string;
  pageUrl?: string;
  /** Ad-measurement cookie choice from the LP1 banner ("granted" | "denied" | ""). */
  adConsent?: string;
  /** Meta browser/click ids (_fbp/_fbc cookies) — only sent when adConsent is "granted". */
  fbp?: string;
  fbc?: string;
} & Partial<Record<(typeof trackingKeys)[number], string>>;

export type Lp1ErrorKey = "questions" | "name" | "phone" | "email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function stripPhone(raw: string): string {
  return raw.replace(/[\s.\-()]/g, "");
}

/** Same rules as the original LP1 form; returns the first failing check. */
export function validateLead(input: {
  budget: string;
  goal: string;
  horizon: string;
  firstName: string;
  lastName: string;
  whatsapp: string;
  email: string;
  consent: boolean;
}): Lp1ErrorKey | null {
  if (!input.budget || !input.goal || !input.horizon) return "questions";
  if (!input.firstName.trim() || !input.lastName.trim()) return "name";
  if (!/^\+?\d{8,15}$/.test(stripPhone(input.whatsapp))) return "phone";
  if (!EMAIL_RE.test(input.email.trim())) return "email";
  return null;
}

/** Builds an E.164 number from the selected country code and the typed number. */
export function toE164(countryCode: string, whatsapp: string): string {
  const dial = countryCode.split("|")[0] ?? "";
  const digits = stripPhone(whatsapp);
  if (digits.startsWith("+")) return digits;
  if (digits.startsWith("00")) return `+${digits.slice(2)}`;
  return `${dial}${digits.replace(/^0+/, "")}`;
}
