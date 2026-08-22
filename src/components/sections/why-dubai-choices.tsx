"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Percent,
  Landmark,
  TrendingUp,
  Users,
  Globe2,
  Building2,
  Wallet,
  ShieldCheck,
  Sparkles,
  Plane,
  Heart,
  Award,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Item = { title: string; description: string };

const investorIcons = [Percent, Landmark, TrendingUp, Users, Globe2, Building2, Wallet];
const expatIcons = [ShieldCheck, Sparkles, Building2, Plane, Percent, Heart, Award];

function Capsule({ item, Icon }: { item: Item; Icon: LucideIcon }) {
  return (
    <div className="flex gap-5 rounded-2xl border border-cream/10 bg-cream/[0.04] p-7">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-light">
        <Icon className="size-5" />
      </span>
      <div>
        <h4 className="font-heading text-lg text-cream">{item.title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-cream/70">{item.description}</p>
      </div>
    </div>
  );
}

// Same SSR-safe pattern as services-radial.tsx: framer-motion's own
// useReducedMotion() reads matchMedia synchronously during render, which
// disagrees with the server's render (no window) for a real visitor with
// the OS preference on — the resulting hydration mismatch leaves this
// section's entrance animation permanently stuck hidden. Deferring the
// check to an effect keeps the first client render identical to the
// server's, then corrects itself a moment later.
function useIsReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);
  return reduced;
}

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

/**
 * Two mutually-exclusive situations ("investment" / "relocation"), exactly
 * one expanded at a time — a single tap/click switches directly to the
 * other one's content, never a toggle-off-then-on. Mouse, keyboard (plain
 * focusable buttons, Tab + Enter/Space) and touch share the same onClick
 * handler, so there's no separate touch path to get out of sync and no
 * double-tap ever required.
 */
export function WhyDubaiChoices({
  investorLabel,
  investorItems,
  expatLabel,
  expatItems,
}: {
  investorLabel: string;
  investorItems: Item[];
  expatLabel: string;
  expatItems: Item[];
}) {
  const [active, setActive] = useState<0 | 1>(0);
  const shouldReduceMotion = useIsReducedMotion();

  const groups: { label: string; items: Item[]; icons: LucideIcon[] }[] = [
    { label: investorLabel, items: investorItems, icons: investorIcons },
    { label: expatLabel, items: expatItems, icons: expatIcons },
  ];
  const activeGroup = groups[active]!;

  return (
    <div className="mt-12">
      <div
        role="group"
        aria-label={investorLabel + " / " + expatLabel}
        className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-10"
      >
        {groups.map((group, i) => (
          <button
            key={group.label}
            type="button"
            aria-expanded={active === i}
            onClick={() => setActive(i as 0 | 1)}
            className={cn(
              "border-b-2 pb-2 text-center font-heading text-2xl transition-colors sm:text-3xl",
              active === i ? "border-gold text-cream" : "border-transparent text-cream/40 hover:text-cream/70",
            )}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {shouldReduceMotion ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {activeGroup.items.map((item, i) => (
              <Capsule key={item.title} item={item} Icon={activeGroup.icons[i % activeGroup.icons.length]!} />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={panelVariants}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {activeGroup.items.map((item, i) => (
                <Capsule key={item.title} item={item} Icon={activeGroup.icons[i % activeGroup.icons.length]!} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
