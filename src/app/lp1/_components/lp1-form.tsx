"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

import { company } from "@/config/company";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";

/**
 * LP1 qualification form — DISPLAY ONLY, NOT CONNECTED.
 *
 * Fields are rendered and validated client-side, but a valid submission
 * deliberately does nothing: no network call, no storage, no tracking.
 * The integration (Make webhook → Supabase) will be wired here later, at
 * the marked TODO, once approved. Option keys mirror the values expected
 * by the future lead pipeline.
 */
const budgetKeys = ["moins_150k", "150k_250k", "250k_500k", "plus_500k"] as const;
const goalKeys = ["locatif", "plus_value", "residence", "diversification"] as const;
const horizonKeys = ["0_3_mois", "3_6_mois", "6_12_mois", "renseigne"] as const;

const countryCodes = [
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

type ErrorKey = "questions" | "name" | "phone" | "email" | "consent";

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
  const [error, setError] = useState<ErrorKey | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    let next: ErrorKey | null = null;
    if (!get("budget") || !get("goal") || !get("horizon")) next = "questions";
    else if (!get("firstName") || !get("lastName")) next = "name";
    else if (!/^\+?\d{8,15}$/.test(get("whatsapp").replace(/[\s.\-()]/g, ""))) next = "phone";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) next = "email";
    else if (!data.get("consent")) next = "consent";

    setError(next);
    // TODO(lp1-integration): send the lead once the pipeline is approved.
    // Intentionally a no-op for now — nothing leaves the browser.
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
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

      <Button type="submit" size="lg" className="w-full">
        {t("submit")}
      </Button>
      <p role="alert" className={cn("mt-2.5 min-h-[1em] text-sm text-red-700", !error && "sr-only")}>
        {error ? t(`errors.${error}`) : ""}
      </p>
      <p className="mt-2 text-center text-xs text-ink-soft">{t("reassure")}</p>
    </form>
  );
}
