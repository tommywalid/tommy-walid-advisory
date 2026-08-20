"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type Choice = { title: string; description: string };

/**
 * Four mutually-exclusive "which of these is you" choices. Selecting one is
 * purely a moment of self-recognition for the visitor — it doesn't change
 * the CTA below or send any data anywhere, so a plain toggle-button group
 * (aria-pressed, one active at a time) is enough: fully keyboard-operable
 * via a normal Tab order, no roving-tabindex radiogroup machinery needed
 * for what's ultimately a decorative, non-gating selection.
 */
export function ServicesCtaChoices({
  choices,
  groupLabel,
}: {
  choices: Choice[];
  groupLabel: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div role="group" aria-label={groupLabel} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {choices.map((choice, i) => {
        const isSelected = selected === i;
        return (
          <button
            key={choice.title}
            type="button"
            aria-pressed={isSelected}
            onClick={() => setSelected((current) => (current === i ? null : i))}
            className={cn(
              "relative flex flex-col gap-2 rounded-2xl border bg-white p-6 pr-11 text-left transition-colors duration-200",
              isSelected ? "border-gold bg-gold/[0.06]" : "border-beige-dark/70 hover:border-gold/40",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-6 right-6 size-2.5 shrink-0 rounded-full border transition-colors duration-200",
                isSelected ? "border-gold bg-gold" : "border-beige-dark bg-transparent",
              )}
            />
            <span className="font-heading text-lg text-forest">{choice.title}</span>
            <span className="text-sm leading-relaxed text-ink-soft">{choice.description}</span>
          </button>
        );
      })}
    </div>
  );
}
