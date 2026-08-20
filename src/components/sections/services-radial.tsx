"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  FileSignature,
  Handshake,
  KeyRound,
  Landmark,
  RefreshCw,
  Scale,
  Search,
  SlidersHorizontal,
  Sofa,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

/**
 * One radial node's content. Two mutually-exclusive content shapes cover
 * both call sites: `description` is a single paragraph (the /services
 * "full" 12-step diagram), `items` is a short bullet list (the homepage's
 * 4-category summary). `icon` is optional design-level metadata (not
 * translatable copy, so callers attach it in code, not in messages/*.json)
 * — when present it replaces the resting number with a glyph.
 */
export type ServicesRadialNode = {
  title: string;
  description?: string;
  items?: string[];
  icon?: ServicesRadialIconKey;
};

const ICONS = {
  target: Target,
  sliders: SlidersHorizontal,
  search: Search,
  handshake: Handshake,
  scale: Scale,
  landmark: Landmark,
  signature: FileSignature,
  payments: CreditCard,
  key: KeyRound,
  sofa: Sofa,
  trending: TrendingUp,
  refresh: RefreshCw,
} satisfies Record<string, LucideIcon>;

export type ServicesRadialIconKey = keyof typeof ICONS;

/**
 * Geometry: `nodes.length` nodes evenly spaced on a circle, starting at the
 * top, computed once from plain trigonometry — no layout library needed.
 * RADIUS_PERCENT is a single constant reused at every breakpoint and for
 * every node count; container size and bubble size scale together via
 * Tailwind responsive classes so the ratio between them (and therefore
 * collision/overflow safety) holds at every screen size and for both the
 * 4-node and 12-node callers — verified empirically, not just by the math.
 */
const RADIUS_PERCENT = 37;

/**
 * Rounded to 3 decimals: full float precision here caused a (harmless but
 * noisy) hydration mismatch — Node's SSR float-to-string output and the
 * browser's own SVG attribute normalization don't always agree on the
 * last couple of digits of a 15-decimal number. Well past visual precision
 * needs at any container size this diagram actually renders at.
 */
function nodePosition(index: number, total: number) {
  const angle = ((-90 + index * (360 / total)) * Math.PI) / 180;
  return {
    x: Math.round((50 + RADIUS_PERCENT * Math.cos(angle)) * 1000) / 1000,
    y: Math.round((50 + RADIUS_PERCENT * Math.sin(angle)) * 1000) / 1000,
  };
}

/**
 * Framer Motion's own `useReducedMotion()` reads `matchMedia` synchronously
 * during render (via a lazy-initialised module-level value), so on a real
 * visitor's machine with the OS preference on, the client's very first
 * render already disagrees with the server's (which has no `window` and
 * always assumes motion is fine). That mismatch lands on this component's
 * entrance-animation styles specifically, and — unlike text mismatches —
 * React does not patch mismatched *attributes* after hydration, so the
 * "hidden" (opacity: 0) inline style baked in by the server render is left
 * in place forever: the whole diagram silently disappears for exactly the
 * visitors this preference exists to help. Deferring the check to an effect
 * keeps the first client render identical to the server's (both start
 * `false`), then corrects itself a moment later — well before anyone has
 * scrolled this far down the page.
 */
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

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Created once at module scope — `motion.create` returns a new component
// type on every call, and recreating it on every render would remount the
// whole subtree (losing the entrance animation state) on every re-render.
const MotionLink = motion.create(Link);

/** Shared bubble content (icon/number, title, expanded detail) — a plain
 * function returning nodes rather than a nested component, so it doesn't
 * get remounted (and its CSS transitions reset) on every parent re-render.
 */
function renderBubbleInner(node: ServicesRadialNode, isActive: boolean, number: string, isLink: boolean): ReactNode {
  const Icon = node.icon ? ICONS[node.icon] : null;

  return (
    <>
      {Icon ? (
        <Icon
          aria-hidden="true"
          strokeWidth={1.75}
          className={cn("text-gold-text", isActive ? "size-5 sm:size-6" : "size-3.5 sm:size-4")}
        />
      ) : (
        <span
          className={cn(
            "font-heading text-gold-text",
            isActive ? "text-xs sm:text-sm" : "text-[7px] sm:text-[9px] lg:text-[10px]",
          )}
        >
          {number}
        </span>
      )}
      <span
        className={cn(
          "font-heading text-forest",
          isActive
            ? "mt-1 text-sm sm:text-base lg:text-lg"
            : "line-clamp-3 text-[7px] leading-[1.05] sm:text-[9px] lg:text-[10px]",
        )}
      >
        {node.title}
      </span>
      {isActive ? (
        <>
          {node.description ? (
            <span className="mt-2 text-xs leading-relaxed text-ink-soft sm:text-sm">{node.description}</span>
          ) : null}
          {node.items ? (
            <ul className="mt-2 flex w-full flex-col gap-1 text-left text-xs leading-relaxed text-ink-soft sm:text-sm">
              {node.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-[0.5em] size-1 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          {isLink ? <ArrowRight aria-hidden="true" className="mt-3 size-4 text-gold-text" /> : null}
        </>
      ) : null}
    </>
  );
}

const bubbleClassName = (isActive: boolean, isOtherActive: boolean) =>
  cn(
    "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center overflow-hidden border bg-white text-center transition-[width,height,padding,transform,box-shadow] ease-out",
    "focus-visible:z-30",
    isActive
      ? "z-20 w-[170px] scale-100 rounded-3xl border-gold/50 px-4 py-4 shadow-[0_8px_24px_rgba(20,38,29,0.14)] sm:w-[220px] sm:px-5 sm:py-5 lg:w-[260px]"
      : cn(
          "size-12 rounded-full border-beige-dark/60 px-1 py-0.5 sm:size-16 sm:px-1.5 sm:py-1 lg:size-20",
          isOtherActive ? "scale-90 opacity-70" : "scale-100 opacity-100",
        ),
  );

export function ServicesRadial({
  id,
  centerTitle,
  centerSubtitle,
  nodes,
  href,
}: {
  id?: string;
  centerTitle: string;
  centerSubtitle: string;
  nodes: ServicesRadialNode[];
  /** When set, every bubble becomes a link to this (locale-aware) path
   * instead of a pure information toggle — used by the homepage's
   * synthetic 4-category summary to lead into the full /services page. */
  href?: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const shouldReduceMotion = useIsReducedMotion();
  const isLink = Boolean(href);

  // Plain elements under reduced motion (everything visible immediately,
  // no entrance animation) — same pattern as Reveal/HeroMotion elsewhere.
  const Container = shouldReduceMotion ? "div" : motion.div;
  const Fade = shouldReduceMotion ? "div" : motion.div;
  const fadeProps = shouldReduceMotion ? {} : { variants: fadeVariants };

  return (
    <section id={id} className="scroll-mt-24 bg-beige/50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Container
          {...(shouldReduceMotion
            ? {}
            : {
                initial: "hidden",
                whileInView: "visible",
                viewport: { once: true, margin: "-80px" },
                variants: containerVariants,
              })}
          className="relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-[420px] lg:max-w-[600px]"
        >
          {/* Rays: thin lines from center to each node. Tapping/clicking empty space here closes the active bubble. */}
          <Fade {...fadeProps} className="absolute inset-0">
            <svg
              viewBox="0 0 100 100"
              className="size-full"
              aria-hidden="true"
              onClick={() => setActiveIndex(null)}
            >
              {nodes.map((node, i) => {
                const { x, y } = nodePosition(i, nodes.length);
                const isActive = activeIndex === i;
                const isDimmed = activeIndex !== null && !isActive;
                return (
                  <line
                    key={node.title}
                    x1={50}
                    y1={50}
                    x2={x}
                    y2={y}
                    stroke="var(--color-beige-dark)"
                    strokeWidth={isActive ? 0.5 : 0.35}
                    opacity={isDimmed ? 0.35 : 0.9}
                    style={{
                      transition: shouldReduceMotion ? "none" : "opacity 0.3s ease, stroke-width 0.3s ease",
                    }}
                  />
                );
              })}
            </svg>
          </Fade>

          {/* Center: Tommy Walid — the single point of contact every ray leads back to. */}
          <Fade
            {...fadeProps}
            className="pointer-events-none absolute top-1/2 left-1/2 z-10 flex size-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-forest text-center sm:size-28 lg:size-32"
          >
            <span className="font-heading text-xs text-cream sm:text-base lg:text-lg">{centerTitle}</span>
            <span className="mt-1 text-[8px] tracking-[0.1em] text-gold-light uppercase sm:text-[10px]">
              {centerSubtitle}
            </span>
          </Fade>

          {/* The nodes. Real <button>s or <Link>s: hoverable, focusable, tappable — one interaction model for mouse, keyboard and touch. */}
          {nodes.map((node, i) => {
            const { x, y } = nodePosition(i, nodes.length);
            const isActive = activeIndex === i;
            const isOtherActive = activeIndex !== null && !isActive;
            const number = String(i + 1).padStart(2, "0");
            const ariaLabel = isActive
              ? `${number} — ${node.title}. ${node.description ?? node.items?.join(", ") ?? ""}`
              : `${number} — ${node.title}`;
            const style = {
              left: `${x}%`,
              top: `${y}%`,
              transitionDuration: shouldReduceMotion ? "0.01s" : "0.35s",
            };
            const className = bubbleClassName(isActive, isOtherActive);
            const content = renderBubbleInner(node, isActive, number, isLink);

            // Touch: a single tap always toggles immediately — some mobile
            // browsers otherwise treat the first tap on an element with
            // hover handlers as a "focus" step and need a second tap to
            // click, which is ruled out for pure toggles. For link bubbles,
            // a first tap still only previews (never navigates on a single
            // tap); a *second* tap on the already-expanded bubble is left
            // alone so the browser's native tap-to-follow behaviour can
            // navigate, mirroring how a hover-styled link already behaves
            // on touch devices with no JS at all.
            const handleTouchEnd = (event: { preventDefault: () => void }) => {
              if (isLink && isActive) return;
              event.preventDefault();
              setActiveIndex((current) => (current === i ? null : i));
            };
            const handleMouseEnter = () => setActiveIndex(i);
            const handleMouseLeave = () => setActiveIndex((current) => (current === i ? null : current));
            const handleFocus = () => setActiveIndex(i);
            const handleBlur = () => setActiveIndex((current) => (current === i ? null : current));
            const handleClick = () => setActiveIndex((current) => (current === i ? null : i));

            if (isLink) {
              const BubbleLink = shouldReduceMotion ? Link : MotionLink;
              return (
                <BubbleLink
                  key={node.title}
                  {...fadeProps}
                  href={href!}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onClick={handleClick}
                  onTouchEnd={handleTouchEnd}
                  aria-expanded={isActive}
                  aria-label={ariaLabel}
                  style={style}
                  className={className}
                >
                  {content}
                </BubbleLink>
              );
            }

            const BubbleButton = shouldReduceMotion ? "button" : motion.button;
            return (
              <BubbleButton
                key={node.title}
                {...fadeProps}
                type="button"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onClick={handleClick}
                onTouchEnd={handleTouchEnd}
                aria-expanded={isActive}
                aria-label={ariaLabel}
                style={style}
                className={className}
              >
                {content}
              </BubbleButton>
            );
          })}
        </Container>
      </div>
    </section>
  );
}
