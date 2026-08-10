# Visual Experience Roadmap

> Status: Draft. Planning artifact only — no implementation yet. This is the basis for a future **Visual Experience Sprint**, once homepage content and structure are considered final. Nothing in this document has been built.

## Purpose

The current homepage deliberately uses no photography or stock imagery — every visual is typographic, CSS gradients, or hand-built SVG line art (see `docs/branding/color-palette.md`, `docs/branding/typography.md`). That was the right call while content and structure were still moving: it avoided fabricated/placeholder imagery and kept the site honest. This document maps where real visual investment should land once that's no longer true, section by section, without prescribing a redesign of layout or copy.

## Cross-cutting principles

- **Real photography is the single highest-leverage investment.** A genuine portrait of Tommy does more trust-building work than any generated or abstract visual — this project's entire throughline (see `docs/branding/brand-identity.md`) has been about replacing generic marketing with real substance. Prioritize commissioning real photography over any AI-generated alternative wherever a real asset is feasible.
- **AI illustration is fine for the decorative, wrong for the factual.** Appropriate: abstract textures, backgrounds, icon motifs. Inappropriate: anything that could be mistaken for a real client, a real property render, or a real credential — that would directly contradict the "no fabricated content" principle this project has followed throughout.
- **One flagship "wow" moment, not five.** A single well-executed 3D/WebGL element (recommended: Why Dubai) reads as premium. The same technique scattered across every section reads as showing off and costs performance everywhere.
- **Every animated element needs a static fallback.** `prefers-reduced-motion` should be respected throughout — this is a current gap worth fixing in the same sprint (see Accessibility note below), not just for new visuals.
- **Rough visual budget:** hero/LCP asset ≤150KB (AVIF/WebP), total added imagery per page ≤500KB, any Three.js/WebGL bundle dynamically imported and mounted only when its section scrolls into view.

## Section-by-section

### Hero
- **Visual:** A real environmental portrait of Tommy in Dubai (natural light, not a corporate headshot) — the single most important asset on the site, since it's the first thing every visitor sees. Alternative/interim: evolve the current flat SVG skyline into a subtle parallax piece.
- **Purpose:** Emotion + immediate credibility. First impression carries disproportionate weight.
- **Implementation:** `next/image` with `priority`, explicit dimensions, AVIF/WebP. If a motion layer is added (e.g. slow scale/parallax on scroll), keep it to GPU-cheap `transform`/`opacity` via Framer Motion — no video background.
- **Performance:** This asset directly impacts LCP. A photo must be optimized and prioritized; a video background is not recommended here regardless of how it's built.

### Why Tommy Walid (the four-pillar trust section)
- **Visual:** A personal photo of Tommy in the sticky left column. Secondary/optional: an animated signature (inline SVG, stroke-draw-in via Framer Motion's `pathLength`) near the section intro for a personal, documented-commitment feel.
- **Purpose:** Trust, humanization — this section's entire argument is "trust me," and a real photo substantiates that instantly.
- **Implementation:** Static `next/image`, below the fold (no `priority` needed). Signature: inline SVG, animated on scroll-into-view.
- **Performance:** Negligible — one small, lazy-loaded image; the SVG signature is effectively free.

### Investment Process
- **Visual:** A custom single-line icon per step (bespoke, gold/forest duotone) rather than generic Lucide icons — reinforces a bespoke, not templated, feel. Optional: a scroll-linked progress line that fills as the visitor scrolls through the five steps.
- **Purpose:** Explanation/clarity — helping visitors mentally map a process, not evoke emotion.
- **Implementation:** Static inline SVG icon set. Progress line via Framer Motion `useScroll`/`useTransform` (transform-only, cheap).
- **Performance:** Near-zero; all vector-based.

### Why Dubai
- **Visual:** The one recommended flagship moment — a minimal, abstract 3D wireframe skyline (extruded line geometry, slow rotation or mouse-parallax) rather than literal photography of recognizable landmarks (avoids the stock-photo cliché this project has consistently avoided). Conservative alternative: a layered parallax version of the existing flat SVG skyline, or a Lottie loop of skyline lights.
- **Purpose:** Storytelling + aspirational emotion — this section sells the place, so it can carry the most visual ambition on the page.
- **Implementation:** If 3D: `react-three-fiber`, dynamically imported (`next/dynamic`, `ssr:false`), mounted only on viewport entry via `IntersectionObserver`, capped frame rate, static-image fallback for `prefers-reduced-motion` and low-end devices. If the budget doesn't support that: the parallax-SVG route delivers most of the emotional effect for a fraction of the engineering cost — a reasonable default if Three.js isn't prioritized.
- **Performance:** Three.js is the heaviest single option in this roadmap (~150–600KB extra, GPU cost). Must be lazy-loaded and optional; everything else in this document is comparatively cheap.

### Services (the four-phase journey)
- **Visual:** A custom line-icon per phase (same icon system as Investment Process, for consistency), plus an optional animated dot that visibly travels along the existing connecting line as the visitor scrolls — makes the "journey" metaphor kinetic rather than just illustrated.
- **Purpose:** Explanation, reinforcing the journey narrative through motion rather than decoration.
- **Implementation:** Same `useScroll`-driven technique as Investment Process's progress line — worth building as one shared primitive rather than two separate implementations, to avoid duplicated logic.
- **Performance:** Negligible.

### Testimonials
- **Visual:** Real client photos, once real testimonials exist — and not before. This is the one section where any AI-generated or stock "person" would actively undermine trust rather than build it, directly contradicting the placeholder-labeling approach already in place.
- **Purpose:** Social proof — but only once genuine.
- **Implementation:** Standard `next/image` once real photos are available (with client consent). Until then: no new visual investment recommended here; the current honest "coming soon" treatment is correct as-is.
- **Performance:** N/A until real content exists.

### FAQ
- **Visual:** Deliberately minimal. This is a utility section — fast scanning matters more than visual richness. At most, a very subtle background texture to differentiate it from adjacent sections.
- **Purpose:** None beyond current; restraint is the right call here.
- **Implementation:** CSS-only if anything at all (gradient or subtle pattern, no imagery).
- **Performance:** Negligible regardless of choice.

### Contact CTA
- **Visual:** A subtle ambient animation behind the CTA — slow-moving gold glow/light, echoing the hero's radial gradients but with gentle motion — to create a moment of arrival before the ask, without distracting from a clean, low-friction click.
- **Purpose:** Calm, confidence-reinforcing invitation — consistent with the "confidence, not urgency" philosophy already established in `home.whyTommy`.
- **Implementation:** CSS keyframe animation (background-position or opacity pulse). No JS needed.
- **Performance:** Negligible, CSS-only.

## Accessibility note (adjacent, worth fixing in the same sprint)

Neither `Reveal` nor `HeroMotion` (the two motion primitives currently in use) check `prefers-reduced-motion`. Every recommendation above assumes that gets fixed at the same time new motion is added — retrofitting it once, in the shared primitives, rather than per-section. Tracked for `docs/design/accessibility.md`, currently empty.

## Explicitly out of scope for now

- Any change to current layout, copy, or structure — this document is visuals-only, additive to what exists.
- Any AI-generated "client" or "property" imagery — see cross-cutting principles above.
- Sitewide 3D/WebGL — reserved for one section (Why Dubai) at most.
