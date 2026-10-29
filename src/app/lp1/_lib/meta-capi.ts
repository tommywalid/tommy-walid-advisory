import { createHash } from "node:crypto";

/**
 * Meta Conversions API — server-side "Lead" event for LP1.
 *
 * Runs on the server only (never imported by client code): the access
 * token is read from the server-only env var META_CAPI_ACCESS_TOKEN.
 *
 * Redundant setup with the browser pixel: both send event_name "Lead"
 * with the SAME event_id, so Meta deduplicates them into one conversion.
 * Called only when the visitor accepted ad cookies (ad_consent "granted").
 *
 * Customer data is normalized then SHA-256 hashed as Meta requires;
 * fbp, fbc, IP and user agent are sent unhashed (Meta's spec).
 */

const GRAPH_API_VERSION = "v24.0";
const CAPI_TIMEOUT_MS = 8_000;

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

/** Hash a normalized value, or return undefined when empty (field omitted). */
const hashed = (value: string) => (value ? [sha256(value)] : undefined);

export type CapiLead = {
  eventId: string;
  eventTime: number; // unix seconds
  eventSourceUrl: string;
  email: string;
  phoneE164: string; // "+9715..."
  firstName: string;
  lastName: string;
  country: string; // ISO 3166-1 alpha-2
  leadId: string;
  fbp: string;
  fbc: string;
  clientIp: string;
  clientUserAgent: string;
};

export async function sendCapiLead(lead: CapiLead): Promise<void> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) {
    console.error("[lp1/capi] META_CAPI_ACCESS_TOKEN or NEXT_PUBLIC_META_PIXEL_ID not set — Lead not sent", lead.eventId);
    return;
  }

  const userData: Record<string, unknown> = {
    em: hashed(lead.email.trim().toLowerCase()),
    ph: hashed(lead.phoneE164.replace(/\D/g, "")),
    fn: hashed(lead.firstName.trim().toLowerCase()),
    ln: hashed(lead.lastName.trim().toLowerCase()),
    country: hashed(lead.country.trim().toLowerCase()),
    external_id: hashed(lead.leadId),
    fbp: lead.fbp || undefined,
    fbc: lead.fbc || undefined,
    client_ip_address: lead.clientIp || undefined,
    client_user_agent: lead.clientUserAgent || undefined,
  };

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: "Lead",
        event_time: lead.eventTime,
        event_id: lead.eventId,
        action_source: "website",
        event_source_url: lead.eventSourceUrl || undefined,
        user_data: userData,
      },
    ],
  };

  // Optional: routes events to Events Manager > Test events. Set only on
  // Preview, never on Production.
  const testCode = process.env.META_CAPI_TEST_EVENT_CODE;
  if (testCode) body.test_event_code = testCode;

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(CAPI_TIMEOUT_MS),
        cache: "no-store",
      },
    );
    const text = await response.text();
    if (!response.ok) {
      console.error(`[lp1/capi] Meta rejected Lead ${lead.eventId} (HTTP ${response.status}): ${text.slice(0, 500)}`);
      return;
    }
    console.info(`[lp1/capi] Lead ${lead.eventId} sent: ${text.slice(0, 200)}`);
  } catch (error) {
    console.error(
      `[lp1/capi] Meta unreachable for Lead ${lead.eventId}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
