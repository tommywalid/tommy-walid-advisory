"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

import { company } from "@/config/company";
import { investmentGoals, budgetRanges } from "@/config/lead";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, Label } from "@/components/ui/input";

/**
 * Short qualification form (config/lead.ts caps it at 5 fields, by design —
 * the goal is to start a conversation, not collect every detail; the rest
 * is discussed live).
 *
 * Opens the visitor's email client with a pre-filled message. No backend/CRM
 * exists yet — this is an intentional interim step, to be replaced by a
 * WhatsApp deep-link (config.getWhatsAppLink) and/or Calendly handoff once
 * those are set up in config/company.ts.
 */
export function ContactForm({
  initialGoal = "",
  initialMessage = "",
}: {
  /** Already-resolved, current-locale label (matches the `<option>` values below). */
  initialGoal?: string;
  initialMessage?: string;
}) {
  const t = useTranslations("pages.contact");

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [goal, setGoal] = useState(initialGoal);
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState(initialMessage);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const bodyLines = [
      `${t("nameLabel")}: ${name}`,
      `${t("whatsappLabel")}: ${whatsapp}`,
      `${t("goalLabel")}: ${goal}`,
      `${t("budgetLabel")}: ${budget}`,
      message ? "" : null,
      message || null,
    ].filter((line) => line !== null);

    const mailto = `mailto:${company.email}?subject=${encodeURIComponent(
      `${t("formTitle")}: ${name || company.name}`,
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailto;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">{t("nameLabel")}</Label>
        <Input
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="whatsapp">{t("whatsappLabel")}</Label>
        <Input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          required
          placeholder="+971 5X XXX XXXX"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="goal">{t("goalLabel")}</Label>
        <Select
          id="goal"
          name="goal"
          required
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="" disabled>
            {t("goalPlaceholder")}
          </option>
          {investmentGoals.map((key) => (
            <option key={key} value={t(`goalLabels.${key}`)}>
              {t(`goalLabels.${key}`)}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="budget">{t("budgetLabel")}</Label>
        <Select
          id="budget"
          name="budget"
          required
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        >
          <option value="" disabled>
            {t("budgetPlaceholder")}
          </option>
          {budgetRanges.map(({ key }) => (
            <option key={key} value={t(`budgetLabels.${key}`)}>
              {t(`budgetLabels.${key}`)}
            </option>
          ))}
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">{t("messageLabel")}</Label>
        <Textarea
          id="message"
          name="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <Button type="submit" size="lg" className="mt-2">
        {t("submit")}
      </Button>
      <p className="text-xs text-ink-soft">{t("formNotice")}</p>
    </form>
  );
}
