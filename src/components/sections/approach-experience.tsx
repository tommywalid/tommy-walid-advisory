"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { ApproachVisual } from "@/components/sections/approach-visual";

type Principle = { title: string; description: string };

/**
 * Owns `activeIndex`, the single piece of state shared between the abstract
 * trajectory graphic (ApproachVisual) and the five principles below/beside
 * it — hovering, focusing or tapping a principle drives both. All five
 * principles' full text stays rendered and visible at all times (never
 * gated behind the hover/focus state), so the interaction is a visual
 * emphasis layer only, never the only way to reach the information.
 */
export function ApproachExperience({
  title,
  intro,
  principles,
}: {
  title: string;
  intro: string;
  principles: Principle[];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-16">
      {/* Desktop: vertical trajectory, left column, stretched to match the content column's height. */}
      <div className="relative hidden lg:block lg:aspect-auto">
        <ApproachVisual orientation="vertical" activeIndex={activeIndex} className="absolute inset-0" />
      </div>

      <div className="flex flex-col">
        <h1 className="max-w-xl text-balance font-heading text-3xl text-forest sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-xl text-balance leading-relaxed text-ink-soft">{intro}</p>

        {/* Mobile/tablet: horizontal trajectory, between the intro and the principles. */}
        <div className="relative mt-10 aspect-[18/11] w-full lg:hidden">
          <ApproachVisual orientation="horizontal" activeIndex={activeIndex} />
        </div>

        <div className="mt-10 flex flex-col lg:mt-12">
          {principles.map((principle, i) => {
            const active = activeIndex === i;
            const setActive = () => setActiveIndex(i);
            const clearIfActive = () => setActiveIndex((current) => (current === i ? null : current));

            return (
              <button
                key={principle.title}
                type="button"
                onMouseEnter={setActive}
                onMouseLeave={clearIfActive}
                onFocus={setActive}
                onBlur={clearIfActive}
                onClick={() => setActiveIndex((current) => (current === i ? null : i))}
                onTouchEnd={(event) => {
                  // Single tap always toggles immediately — no double-tap:
                  // same reasoning as services-radial.tsx's touch handling.
                  event.preventDefault();
                  setActiveIndex((current) => (current === i ? null : i));
                }}
                className={cn(
                  "border-t border-beige-dark py-6 text-left transition-opacity duration-300 first:border-t-0 first:pt-0",
                  activeIndex !== null && !active ? "opacity-70" : "opacity-100",
                )}
              >
                <h2
                  className={cn(
                    "font-heading text-xl transition-colors duration-300 sm:text-2xl",
                    active ? "text-gold-text" : "text-forest",
                  )}
                >
                  {principle.title}
                </h2>
                <p className="mt-3 max-w-md leading-relaxed text-ink-soft">{principle.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
