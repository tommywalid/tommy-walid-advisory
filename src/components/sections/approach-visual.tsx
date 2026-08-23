"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Abstract, architectural trajectory for "Mon approche": five points on a
 * single thread, each carrying a small abstract micro-diagram — never
 * literal real-estate iconography (no handshake/house/key), and never a
 * library icon. Two independent layouts share the same geometry logic:
 * "vertical" for the desktop left column, "horizontal" for the mobile/
 * tablet band above the principles list. Purely decorative and redundant
 * with the principle list's text, so the whole thing is `aria-hidden`.
 */

const COUNT = 5;
const AXIS_LENGTH = 360;
const AXIS_MARGIN = 40;
const CROSS_LENGTH = 220;
const LINE_POS = 20;
const SYMBOL_OFFSET = 90;
const POINT_REST_R = 3;
const POINT_ACTIVE_R = 4.5;

function axisPositions() {
  const step = (AXIS_LENGTH - AXIS_MARGIN * 2) / (COUNT - 1);
  return Array.from({ length: COUNT }, (_, i) => AXIS_MARGIN + step * i);
}

/**
 * Framer Motion's own `useReducedMotion()` reads `matchMedia` synchronously
 * during render, which disagrees with the server's render (no window) for a
 * real visitor with the OS preference on — the resulting hydration mismatch
 * leaves this component's entrance animation permanently stuck hidden.
 * Deferring the check to an effect keeps the first client render identical
 * to the server's, then corrects itself a moment later. Same pattern as
 * services-radial.tsx / why-dubai-choices.tsx.
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

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const pointsGroupVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.6, staggerChildren: 0.08 } },
};
const pointVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};
const symbolsGroupVariants: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 1.0, staggerChildren: 0.08 } },
};
const symbolVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Shared visual vocabulary across every micro-diagram: hollow circles for
// "not yet the point" and a filled circle for "the point" — a champagne/gold
// accent everywhere, thin strokes only, no fill, no shadow, no gradient.
const REST_STROKE = "var(--color-beige-dark)";
const ACTIVE_STROKE = "var(--color-gold)";
const REST_OPACITY = 0.45;
const ACTIVE_OPACITY = 1;
const STROKE_TRANSITION = "stroke 0.35s ease, opacity 0.35s ease, stroke-width 0.35s ease";
const GEOMETRY_TRANSITION = "cx 0.35s ease, cy 0.35s ease, r 0.35s ease, x1 0.35s ease, y1 0.35s ease, x2 0.35s ease, y2 0.35s ease";
const MOVE_TRANSITION = { transition: "transform 0.35s ease" };

function HollowDot({ cx, cy, active, reduce = false }: { cx: number; cy: number; active: boolean; reduce?: boolean }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={active ? 3.3 : 2.8}
      fill="none"
      stroke={active ? ACTIVE_STROKE : REST_STROKE}
      strokeWidth={0.6}
      opacity={active ? ACTIVE_OPACITY : REST_OPACITY}
      style={{ transition: reduce ? "none" : `${STROKE_TRANSITION}, ${GEOMETRY_TRANSITION}` }}
    />
  );
}

/**
 * Five deliberately abstract micro-diagrams — each one a small, self
 * -contained scene that illustrates its principle's mechanism (converge /
 * filter / compare / coordinate / progress), not a decoration. Drawn in a
 * local coordinate space centered on the node's own offset anchor, so they
 * never overlap the trajectory's point markers.
 */
function Symbol({ index, active, reduce }: { index: number; active: boolean; reduce: boolean }) {
  const stroke = active ? ACTIVE_STROKE : REST_STROKE;
  const opacity = active ? ACTIVE_OPACITY : REST_OPACITY;
  const lineStyle = { transition: reduce ? "none" : STROKE_TRANSITION };

  switch (index) {
    case 0: {
      // Écouter avant de conseiller — two distinct elements progressively converging on one point.
      const shift = active && !reduce ? 3 : 0;
      return (
        <g>
          <g style={{ transform: `translateX(${shift}px)`, ...(reduce ? {} : MOVE_TRANSITION) }}>
            <HollowDot cx={-38} cy={-16} active={active} reduce={reduce} />
            <path d="M -38,-13 Q -22,6 -8,3" fill="none" stroke={stroke} strokeWidth={0.55} strokeDasharray="1.4 1.8" strokeLinecap="round" opacity={opacity} style={lineStyle} />
            <line x1={-11} y1={-2} x2={-4} y2={3} stroke={stroke} strokeWidth={0.6} strokeLinecap="round" opacity={opacity} style={lineStyle} />
            <line x1={-11} y1={8} x2={-4} y2={3} stroke={stroke} strokeWidth={0.6} strokeLinecap="round" opacity={opacity} style={lineStyle} />
          </g>
          <g style={{ transform: `translateX(${-shift}px)`, ...(reduce ? {} : MOVE_TRANSITION) }}>
            <HollowDot cx={38} cy={-16} active={active} reduce={reduce} />
            <path d="M 38,-13 Q 22,6 8,3" fill="none" stroke={stroke} strokeWidth={0.55} strokeDasharray="1.4 1.8" strokeLinecap="round" opacity={opacity} style={lineStyle} />
            <line x1={11} y1={-2} x2={4} y2={3} stroke={stroke} strokeWidth={0.6} strokeLinecap="round" opacity={opacity} style={lineStyle} />
            <line x1={11} y1={8} x2={4} y2={3} stroke={stroke} strokeWidth={0.6} strokeLinecap="round" opacity={opacity} style={lineStyle} />
          </g>
        </g>
      );
    }
    case 1: {
      // Sélectionner avec discipline — several distinct possibilities converging to a reduced selection.
      const ys = [-27, -9, 9, 27];
      return (
        <g>
          {ys.map((y) => (
            <g key={y}>
              <HollowDot cx={-42} cy={y} active={active} reduce={reduce} />
              <line
                x1={-39}
                y1={y}
                x2={35}
                y2={0}
                stroke={stroke}
                strokeWidth={0.5}
                strokeDasharray="1.3 1.7"
                strokeLinecap="round"
                opacity={opacity}
                style={lineStyle}
              />
            </g>
          ))}
          <circle
            cx={40}
            cy={0}
            r={active ? 4 : 3}
            fill={stroke}
            opacity={opacity}
            style={{ transition: reduce ? "none" : `${STROKE_TRANSITION}, ${GEOMETRY_TRANSITION}` }}
          />
        </g>
      );
    }
    case 2: {
      // Des options comparées — two clearly comparable, parallel options.
      const dividerHalf = active && !reduce ? 26 : 20;
      return (
        <g>
          {[-14, 14].map((y) => (
            <g key={y}>
              <HollowDot cx={-42} cy={y} active={active} reduce={reduce} />
              <line x1={-39} y1={y} x2={-6} y2={y} stroke={stroke} strokeWidth={0.55} opacity={opacity} style={lineStyle} />
              <line x1={6} y1={y} x2={39} y2={y} stroke={stroke} strokeWidth={0.55} opacity={opacity} style={lineStyle} />
              <HollowDot cx={42} cy={y} active={active} reduce={reduce} />
            </g>
          ))}
          <line
            x1={0}
            y1={-dividerHalf}
            x2={0}
            y2={dividerHalf}
            stroke={stroke}
            strokeWidth={0.5}
            strokeDasharray="1.3 1.6"
            opacity={opacity}
            style={{ transition: reduce ? "none" : `${STROKE_TRANSITION}, ${GEOMETRY_TRANSITION}` }}
          />
        </g>
      );
    }
    case 3: {
      // Je coordonne les bonnes personnes — several peripheral elements converging on a central point.
      const corners: [number, number][] = [
        [-36, -20],
        [36, -20],
        [-36, 20],
        [36, 20],
      ];
      const pull = active && !reduce ? 0.14 : 0;
      return (
        <g>
          {corners.map(([cx, cy]) => (
            <g key={`${cx}-${cy}`} style={{ transform: `translate(${-cx * pull}px, ${-cy * pull}px)`, ...(reduce ? {} : MOVE_TRANSITION) }}>
              <HollowDot cx={cx} cy={cy} active={active} reduce={reduce} />
              <line
                x1={cx * 0.75}
                y1={cy * 0.75}
                x2={cx * 0.28}
                y2={cy * 0.28}
                stroke={stroke}
                strokeWidth={0.55}
                strokeDasharray="1.3 1.6"
                strokeLinecap="round"
                opacity={opacity}
                style={lineStyle}
              />
            </g>
          ))}
          <circle
            cx={0}
            cy={0}
            r={active ? 4.5 : 3.5}
            fill={stroke}
            opacity={opacity}
            style={{ transition: reduce ? "none" : `${STROKE_TRANSITION}, ${GEOMETRY_TRANSITION}` }}
          />
        </g>
      );
    }
    case 4: {
      // Une stratégie qui évolue avec vous — a trajectory progressing forward and slightly upward.
      const push = active && !reduce ? 4 : 0;
      return (
        <g>
          <HollowDot cx={-40} cy={20} active={active} reduce={reduce} />
          <path
            d="M -40,17 Q -16,10 -4,1"
            fill="none"
            stroke={stroke}
            strokeWidth={0.55}
            strokeDasharray="1.4 1.8"
            strokeLinecap="round"
            opacity={opacity}
            style={lineStyle}
          />
          <circle cx={-4} cy={1} r={1.4} fill={stroke} opacity={opacity} style={lineStyle} />
          <g style={{ transform: `translate(${push}px, ${-push}px)`, ...(reduce ? {} : MOVE_TRANSITION) }}>
            <path d="M -4,1 Q 12,-8 30,-19" fill="none" stroke={stroke} strokeWidth={0.55} strokeDasharray="1.4 1.8" strokeLinecap="round" opacity={opacity} style={lineStyle} />
            <line x1={24} y1={-15} x2={33} y2={-22} stroke={stroke} strokeWidth={0.65} strokeLinecap="round" opacity={opacity} style={lineStyle} />
            <line x1={33} y1={-22} x2={29} y2={-13} stroke={stroke} strokeWidth={0.65} strokeLinecap="round" opacity={opacity} style={lineStyle} />
            <line x1={33} y1={-22} x2={24} y2={-19} stroke={stroke} strokeWidth={0.65} strokeLinecap="round" opacity={opacity} style={lineStyle} />
          </g>
        </g>
      );
    }
    default:
      return null;
  }
}

export function ApproachVisual({
  activeIndex,
  orientation,
  className,
}: {
  activeIndex: number | null;
  orientation: "vertical" | "horizontal";
  className?: string;
}) {
  const shouldReduceMotion = useIsReducedMotion();
  const positions = axisPositions();

  const points =
    orientation === "vertical"
      ? positions.map((y) => ({ x: LINE_POS, y }))
      : positions.map((x) => ({ x, y: LINE_POS }));
  const symbolPoints = points.map((p) =>
    orientation === "vertical" ? { x: p.x + SYMBOL_OFFSET, y: p.y } : { x: p.x, y: p.y + SYMBOL_OFFSET },
  );
  const viewBox =
    orientation === "vertical"
      ? `0 0 ${CROSS_LENGTH} ${AXIS_LENGTH}`
      : `0 0 ${AXIS_LENGTH} ${CROSS_LENGTH}`;

  const Root = shouldReduceMotion ? "g" : motion.g;
  const Ln = shouldReduceMotion ? "line" : motion.line;
  const PtGroup = shouldReduceMotion ? "g" : motion.g;
  const Pt = shouldReduceMotion ? "circle" : motion.circle;
  const SymGroup = shouldReduceMotion ? "g" : motion.g;
  // Horizontal mounts/unmounts its one active diagram per tap, well after
  // the parent's whileInView has already resolved — a freshly-mounted
  // motion child in that situation doesn't reliably inherit "visible" from
  // context and can get stuck at its "hidden" (opacity: 0) state. Vertical
  // never has this problem (all five mount together, once, and animate in
  // with the rest of the entrance), so it keeps the animated version.
  const SymItem = shouldReduceMotion || orientation === "horizontal" ? "g" : motion.g;

  const rootMotionProps = shouldReduceMotion
    ? {}
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, margin: "-80px" } };

  return (
    <svg viewBox={viewBox} className={cn("size-full", className)} aria-hidden="true">
      <Root {...rootMotionProps}>
        {/* The thread: four segments so the portion adjacent to the hovered/focused point can brighten independently. */}
        {points.slice(0, -1).map((p, i) => {
          const next = points[i + 1]!;
          const segmentActive = activeIndex === i || activeIndex === i + 1;
          return (
            <Ln
              key={`segment-${i}`}
              x1={p.x}
              y1={p.y}
              x2={next.x}
              y2={next.y}
              stroke={segmentActive ? "var(--color-gold)" : "var(--color-beige-dark)"}
              strokeWidth={segmentActive ? 1 : 0.6}
              style={{ transition: shouldReduceMotion ? "none" : "stroke 0.35s ease, stroke-width 0.35s ease" }}
              {...(shouldReduceMotion ? {} : { variants: lineVariants })}
            />
          );
        })}

        <PtGroup {...(shouldReduceMotion ? {} : { variants: pointsGroupVariants })}>
          {points.map((p, i) => {
            const active = activeIndex === i;
            return (
              <Pt
                key={`point-${i}`}
                cx={p.x}
                cy={p.y}
                r={active ? POINT_ACTIVE_R : POINT_REST_R}
                fill={active ? "var(--color-gold)" : "var(--color-beige-dark)"}
                style={{ transition: shouldReduceMotion ? "none" : "r 0.35s ease, fill 0.35s ease" }}
                {...(shouldReduceMotion ? {} : { variants: pointVariants })}
              />
            );
          })}
        </PtGroup>

        <SymGroup {...(shouldReduceMotion ? {} : { variants: symbolsGroupVariants })}>
          {symbolPoints.map((p, i) => {
            // Horizontal (mobile/tablet) packs all 5 points along the same
            // axis the diagrams would sit on — five full diagrams side by
            // side there either overlap or shrink past legibility. Only the
            // active one's diagram is drawn (at full size); the rest stay
            // as plain points on the line, exactly as they do before any
            // principle is engaged. Vertical (desktop) has no such
            // constraint — each diagram sits in its own row and all five
            // stay visible.
            if (orientation === "horizontal" && activeIndex !== i) return null;
            const animated = !shouldReduceMotion && orientation !== "horizontal";
            return (
              <SymItem
                key={`symbol-${i}`}
                transform={`translate(${p.x}, ${p.y})`}
                {...(animated ? { variants: symbolVariants } : {})}
              >
                <Symbol index={i} active={activeIndex === i} reduce={shouldReduceMotion} />
              </SymItem>
            );
          })}
        </SymGroup>
      </Root>
    </svg>
  );
}
