import { randomUUID } from "node:crypto";
import { after, NextResponse } from "next/server";

import { sendCapiLead } from "../../_lib/meta-capi";

import {
  budgetKeys,
  countryCodes,
  goalKeys,
  horizonKeys,
  lp1Langs,
  toE164,
  trackingKeys,
  validateLead,
  type Lp1LeadInput,
} from "../../_lib/lead";

/**
 * LP1 lead endpoint — server-side proxy to the Make webhook.
 *
 * The browser never sees the webhook URL: it is read from the server-only
 * env var LP1_LEAD_WEBHOOK_URL. The payload is re-validated here against
 * the same rules and option lists as the form, then forwarded to Make,
 * which writes the lead to Supabase (`leads`; the initial `lead_events`
 * row is created by a database trigger) and sends the notification.
 *
 * Success is only reported when Make answers 200 with `{ "ok": true }`,
 * i.e. after the Supabase insert succeeded. Any other outcome returns an
 * error to the browser (no false success) and logs the full payload
 * server-side so the lead can be recovered from the logs.
 */
export const dynamic = "force-dynamic";

const WEBHOOK_TIMEOUT_MS = 15_000;

const clip = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const oneOf = <T extends readonly string[]>(list: T, value: string) =>
  (list as readonly string[]).includes(value);

/** First public IP of the request (Vercel sets x-forwarded-for). */
function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  return clip(forwarded.split(",")[0], 64) || clip(request.headers.get("x-real-ip"), 64);
}

export async function POST(request: Request) {
  let body: Partial<Lp1LeadInput>;
  try {
    body = (await request.json()) as Partial<Lp1LeadInput>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const input = {
    lang: clip(body.lang, 2),
    budget: clip(body.budget, 40),
    goal: clip(body.goal, 40),
    horizon: clip(body.horizon, 40),
    firstName: clip(body.firstName, 100),
    lastName: clip(body.lastName, 100),
    countryCode: clip(body.countryCode, 10),
    whatsapp: clip(body.whatsapp, 30),
    email: clip(body.email, 254),
    consent: body.consent === true,
  };

  const validationError = validateLead(input);
  if (
    validationError ||
    !oneOf(lp1Langs, input.lang) ||
    !oneOf(budgetKeys, input.budget) ||
    !oneOf(goalKeys, input.goal) ||
    !oneOf(horizonKeys, input.horizon) ||
    !countryCodes.some((c) => c.value === input.countryCode)
  ) {
    return NextResponse.json(
      { ok: false, error: validationError ?? "invalid_field" },
      { status: 422 },
    );
  }

  const whatsapp = toE164(input.countryCode, input.whatsapp);
  if (!/^\+\d{8,15}$/.test(whatsapp)) {
    return NextResponse.json({ ok: false, error: "phone" }, { status: 422 });
  }

  const [dialCode, country] = input.countryCode.split("|");
  const adConsent = clip(body.adConsent, 10) === "granted" ? "granted" : "denied";
  const tracking = Object.fromEntries(
    trackingKeys.map((key) => [key, clip(body[key], 200)]),
  );

  const payload = {
    // Primary key of the future `leads` row — generated here so Make can
    // insert idempotently and report the exact id back.
    lead_id: randomUUID(),
    source: "site",
    landing: "lp1",
    langue: input.lang,
    segment: clip(body.segment, 10) === "mre" ? "mre" : "general",
    pays: country ?? "",
    first_name: input.firstName,
    last_name: input.lastName,
    full_name: `${input.firstName} ${input.lastName}`,
    country_code: dialCode ?? "",
    whatsapp,
    email: input.email.toLowerCase(),
    budget: input.budget,
    objectif: input.goal,
    horizon: input.horizon,
    consent_rgpd: true,
    page_url: clip(body.pageUrl, 500),
    event_id: randomUUID(),
    submitted_at: new Date().toISOString(),
    ...tracking,
    // Conversions API: this route sends the Lead to Meta server-side ONLY when
    // ad_consent is "granted" (same rule as the browser pixel). Browser
    // identifiers are therefore forwarded only in that case.
    ad_consent: adConsent,
    fbp: adConsent === "granted" ? clip(body.fbp, 200) : "",
    fbc: adConsent === "granted" ? clip(body.fbc, 500) : "",
    client_ip: adConsent === "granted" ? clientIp(request) : "",
    client_user_agent: adConsent === "granted" ? clip(request.headers.get("user-agent"), 500) : "",
  };

  const webhookUrl = process.env.LP1_LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[lp1/lead] LP1_LEAD_WEBHOOK_URL is not set — lead NOT forwarded:", JSON.stringify(payload));
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      cache: "no-store",
    });

    const text = await response.text();
    let confirmed = false;
    try {
      confirmed = response.ok && (JSON.parse(text) as { ok?: unknown }).ok === true;
    } catch {
      confirmed = false;
    }

    if (!confirmed) {
      console.error(
        `[lp1/lead] Make webhook did not confirm (HTTP ${response.status}: ${text.slice(0, 300)}) — lead payload:`,
        JSON.stringify(payload),
      );
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
    }

    // Conversions API: only after Make confirmed the lead, and only with
    // ad consent. Runs after the response is sent, so it never slows down
    // or breaks the visitor's confirmation.
    if (adConsent === "granted") {
      after(() =>
        sendCapiLead({
          eventId: payload.event_id,
          eventTime: Math.floor(Date.parse(payload.submitted_at) / 1000),
          eventSourceUrl: payload.page_url,
          email: payload.email,
          phoneE164: payload.whatsapp,
          firstName: payload.first_name,
          lastName: payload.last_name,
          country: payload.pays,
          leadId: payload.lead_id,
          fbp: payload.fbp,
          fbc: payload.fbc,
          clientIp: payload.client_ip,
          clientUserAgent: payload.client_user_agent,
        }),
      );
    }

    return NextResponse.json({ ok: true, event_id: payload.event_id });
  } catch (error) {
    console.error(
      `[lp1/lead] Make webhook unreachable (${error instanceof Error ? error.message : String(error)}) — lead payload:`,
      JSON.stringify(payload),
    );
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
