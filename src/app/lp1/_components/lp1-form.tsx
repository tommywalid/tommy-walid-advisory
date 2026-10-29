"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";

import { company, getWhatsAppLink } from "@/config/company";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { WhatsappIcon } from "@/components/brand/social-icons";
import {
  budgetKeys,
  countryCodes,
  goalKeys,
  horizonKeys,
  trackingKeys,
  validateLead,
  type Lp1ErrorKey,
  type Lp1LeadInput,
} from "../_lib/lead";
import { trackLead } from "../_lib/meta-pixel";

/**
 * LP1 qualification form.
 *
 * Submits to the same-origin server endpoint /lp1/api/lead, which forwards
 * to the Make webhook (Make → Supabase → notification). The browser never
 * holds the webhook URL or any key. The thank-you state is shown only when
 * the server confirms the lead was stored; on failure the visitor sees an
 * error and keeps everything they typed, so they can retry.
 */
type Status = "idle" | "sending" | "success";
type ErrorKey = Lp1ErrorKey | "submit";

function OptionGroup({
  name,
  keys,
  labelOf,
}: {
  name: string;
  keys: readonly string[];
  labelOf: (key: string) => string;
}) {
  return (
    <div role="radiogroup" className="grid grid-cols-1 gap-2 min-[421px]:grid-cols-2">
      {keys.map((key) => {
        const id = `lp1-${name}-${key}`;
        return (
          <div key={key} className="relative">
            <input type="radio" name={name} id={id} value={key} className="peer sr-only" />
            <label
              htmlFor={id}
              className="block h-full cursor-pointer rounded-lg border border-beige-dark bg-white px-3 py-2.5 text-sm leading-snug text-ink transition-colors peer-checked:border-gold peer-checked:bg-beige/60 peer-checked:font-semibold peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold"
            >
              {labelOf(key)}
            </label>
          </div>
        );
      })}
    </div>
  );
}

function StepLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 mb-2.5 text-[11px] font-bold tracking-[0.15em] text-gold-text uppercase">
      {children}
    </p>
  );
}

export function Lp1Form() {
  const t = useTranslations("lp1.form");
  const tThanks = useTranslations("lp1.thanks");
  const lang = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<ErrorKey | null>(null);
  const [firstName, setFirstName] = useState("");
  const thanksRef = useRef<HTMLDivElement>(null);

  // The thank-you block is much shorter than the form it replaces, so
  // without this the visitor is left looking at empty space below it.
  // Bring it into view and move focus to it (screen readers announce it).
  useEffect(() => {
    if (status !== "success") return;
    const node = thanksRef.current;
    if (!node) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    (document.getElementById("form") ?? node).scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    node.focus({ preventScroll: true });
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const fields = {
      budget: get("budget"),
      goal: get("goal"),
      horizon: get("horizon"),
      firstName: get("firstName"),
      lastName: get("lastName"),
      countryCode: get("countryCode"),
      whatsapp: get("whatsapp"),
      email: get("email"),
      consent: data.get("consent") !== null,
    };

    const validationError = validateLead(fields);
    setError(validationError);
    if (validationError) return;

    const params = new URLSearchParams(window.location.search);
    const payload: Lp1LeadInput = {
      ...fields,
      lang,
      segment: params.get("seg") ?? "",
      pageUrl: window.location.href.split("#")[0],
      ...Object.fromEntries(trackingKeys.map((key) => [key, params.get(key) ?? ""])),
    };

    setStatus("sending");
    try {
      const response = await fetch("/lp1/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; event_id?: string } | null;

      if (response.ok && result?.ok === true) {
        trackLead(result.event_id);
        setFirstName(fields.firstName);
        setStatus("success");
        return;
      }
      setStatus("idle");
      setError("submit");
    } catch {
      setStatus("idle");
      setError("submit");
    }
  }

  if (status === "success") {
    const whatsappHref = getWhatsAppLink();
    return (
      <div ref={thanksRef} tabIndex={-1} className="py-4 text-center outline-none" role="status">
        <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-gold">
          <svg aria-hidden width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-forest">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="font-heading text-2xl text-forest sm:text-[28px]">
          {tThanks("title", { name: firstName })}
        </h2>
        <p className="mt-3 mb-6 text-sm leading-relaxed text-ink-soft">{tThanks("body")}</p>
        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
          >
            <WhatsappIcon className="size-4" />
            {tThanks("whatsapp")}
          </a>
        ) : null}
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} noValidate aria-busy={sending}>
      <h2 className="font-heading text-2xl text-forest sm:text-[28px]">{t("title")}</h2>
      <p className="mt-1.5 text-sm text-ink-soft">{t("subtitle")}</p>

      <StepLabel>{t("steps.budget")}</StepLabel>
      <OptionGroup name="budget" keys={budgetKeys} labelOf={(k) => t(`budget.${k}`)} />

      <StepLabel>{t("steps.goal")}</StepLabel>
      <OptionGroup name="goal" keys={goalKeys} labelOf={(k) => t(`goal.${k}`)} />

      <StepLabel>{t("steps.horizon")}</StepLabel>
      <OptionGroup name="horizon" keys={horizonKeys} labelOf={(k) => t(`horizon.${k}`)} />

      <StepLabel>{t("steps.contact")}</StepLabel>
      <div className="flex flex-col gap-2.5">
        <div className="grid grid-cols-1 gap-2.5 min-[421px]:grid-cols-2">
          <Input name="firstName" placeholder={t("firstName")} aria-label={t("firstName")} autoComplete="given-name" required />
          <Input name="lastName" placeholder={t("lastName")} aria-label={t("lastName")} autoComplete="family-name" required />
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-2" dir="ltr">
          <Select name="countryCode" aria-label={t("countryCode")} defaultValue={countryCodes[0].value}>
            {countryCodes.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
          <Input
            type="tel"
            name="whatsapp"
            placeholder={t("whatsapp")}
            aria-label={t("whatsapp")}
            autoComplete="tel-national"
            inputMode="tel"
            required
          />
        </div>
        <Input type="email" name="email" placeholder={t("email")} aria-label={t("email")} autoComplete="email" required />
      </div>

      <label className="mt-4 mb-5 flex items-start gap-2.5 text-xs leading-relaxed text-ink-soft">
        <input type="checkbox" name="consent" required className="mt-0.5 size-4 shrink-0 accent-forest" />
        <span>
          {t.rich("consent", {
            link: (chunks) => (
              <a href={`mailto:${company.email}`} className="text-gold-text underline underline-offset-2">
                {chunks}
              </a>
            ),
          })}
        </span>
      </label>

      <Button type="submit" size="lg" className="w-full" disabled={sending}>
        {t("submit")}
      </Button>
      <p role="alert" className={cn("mt-2.5 min-h-[1em] text-sm text-red-700", !error && "sr-only")}>
        {error ? t(`errors.${error}`) : ""}
      </p>
      <p className="mt-2 text-center text-xs text-ink-soft">{t("reassure")}</p>
    </form>
  );
}
