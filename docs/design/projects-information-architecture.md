# Projects — Information Architecture & User Journey

> Status: Approved architecture, implementation starting. See `docs/product/roadmap.md` for sprint sequencing (Projects before Backend/Dashboard).

## Core reframe

A catalogue answers "what's available?" This experience must answer **"what fits you?"** This is explicitly **not** a property portal (not Bayut, not Property Finder) — it's a curated selection Tommy personally recommends, capped around 20–30 projects, communicating: *"I have already done the research. Here are the opportunities I believe deserve your attention."* Quality over quantity, always.

This is Tommy Walid's personal brand, not a company (see `docs/branding/brand-identity.md`) — every pattern here assumes first-person voice throughout, including inside advisory notes on individual projects.

## Advisor-not-portal principles

- **Curation over completeness.** A handful of explained opportunities beats a wall of listings.
- **Narrative before numbers.** Advisory notes lead every card and every detail page; the spec sheet supports, never leads.
- **No portal mechanics.** No wishlists/heart icons, no "compare" tool, no MLS-style data grid, no saved-search alerts, no unit-level availability or floor plans on-site.
- **No urgency mechanics.** No countdown timers, no "X units left."
- **Every dead end becomes a conversation, not a wall** — including empty states.
- **First person throughout.**
- **Every CTA seeks an opinion, not a download.** "Get my take," never "Request info" or "Download brochure."

## Two taxonomy decisions (settled)

1. **"Best For" (project-level, advisor judgment) is a separate taxonomy from "Investment Goal" (lead-qualification, visitor self-select in `config/lead.ts`)** — not unified. When a visitor moves from a project into the contact form, Best-For tags are best-effort mapped to the closest Investment Goal option to pre-fill the form (e.g. "Golden Visa" → `golden-visa`, "Rental Income" → `rental`).
2. **Property Types = fixed enum** (closed, standard real-estate taxonomy). **Best For and Key Highlights = open tag lists** — extensible without a code change, since the future CMS needs to let new tags be typed in freely.

## Data model

```
Developer {
  id: string
  name: string
  logo?: string
  whyITrustThem: string          // first-person, concise — written once per developer, reused
}                                  // across all their projects (avoids rewriting the same trust
                                   // note for every project from the same builder)

Project {
  slug: string
  name: string
  developerId: string             // → Developer
  location: string
  whyThisLocationMatters: string   // first-person, concise, per-project
  propertyTypes: PropertyType[]    // required, fixed enum, multi-select
  startingPrice: { amount: number, currency: "AED" }  // required, real figure
  paymentPlan: string              // required, short summary — never the full schedule
  handover: string                 // required, e.g. "Q4 2027" or "Ready"
  bestFor: string[]                // required, open tags, multi-select
  keyHighlights: string[]          // optional, open tags, multi-select
  whyIRecommend: string            // required, first-person narrative — human-edited always;
                                    // an AI-drafted starting point is a future CMS/Dashboard
                                    // capability (see below), not built in this sprint
  media: {
    cover: MediaAsset
    gallery: MediaAsset[]
  }
  featured: boolean                // shows in the homepage "Selected Projects" teaser
  published: boolean               // lets a project be staged before going live
}

MediaAsset = { url: string, type: "photo" | "render" | "masterplan" | "aerial", caption?: string }
PropertyType = "studio" | "1-bed" | "2-bed" | "3-bed" | "townhouse" | "villa" | "office" | "retail"
```

**Deliberately absent from the schema**, per the "do not display" list: unit-level availability, floor plans, brochure files, full payment schedules, inventory counts. Not hidden fields — fields that don't exist in this system, so there's no risk of ever surfacing them.

**Media honesty:** every gallery item carries a visible type label (Photo / Render / Masterplan / Aerial). Official developer renders are legitimate content; the only requirement is never presenting one as a photograph of a finished, specific unit.

**AI-assisted "Why I Recommend" drafting:** deferred to the future CMS/Dashboard sprint — there's no authoring UI yet to draft from. The site's existing first-person copy (Why Tommy pillars, About page quote, Services commitment lines) is the reference corpus that future tool should ground itself in. The field itself is always plain, human-edited text regardless.

## Page structure & user journey

**Entry points:** homepage "Selected Projects" teaser (`featured: true` projects), direct nav, or a shared/SEO link straight to a detail page.

### `/projects` — discovery
1. Short first-person framing line before any listing: *"I don't show everything on the market — only what I'd put in front of my own clients."*
2. **Best For** chips as the primary control (single-select, guided). Property Type and Location as smaller secondary refinements underneath.
3. Curated grid: photo, name, location, one-line pull from `whyIRecommend`, Best-For tags, "Starting from AED X," CTAs: **"Get my take"** (primary) / "See details" (secondary).
4. **Empty state, designed on purpose:** *"Nothing live in this category right now — this is exactly the kind of decision I help with directly."* → straight into the contact form.
5. Closing band: **"Not sure which fits? Ask me."**

### `/projects/[slug]` — detail
Order: **hero (typed media, honestly labeled) → compact facts strip (developer, location, property types, starting price, handover) → "Why I Recommend This Project" (centerpiece) → Best For / Key Highlights tags → "Why I Trust This Developer" + "Why This Location Matters" (paired, concise, supporting credibility) → payment plan one-liner → gated-content panel → primary CTA → related projects (same Best-For tag).**

Gated-content panel framing: *"Want my read on the numbers? I'll walk you through pricing, floor plans and availability when we talk."* CTA: **"Get my opinion."**

### Conversation, not checkout
Every path routes into the existing qualification form (`ContactForm`), pre-filled with project name + mapped goal. No parallel "book a viewing" flow — one relationship-first funnel, including its existing 24–48h personal-reply commitment.

## CTA language (applies sitewide within this section)

| Location | CTA |
|---|---|
| Project card | "Get my take" |
| Detail page primary | "Get my honest opinion on this one" |
| Gated-content panel | "Get my opinion" |
| Empty state | "Tell me what you're looking for" |
| Closing band | "Not sure which fits? Ask me." |

Every one asks for a read, not a download.

## Desktop & mobile layouts

- **Desktop `/projects`:** centered container (matches site width conventions); Best-For chips as a centered pill row (gold-filled active state, same language as the existing `Badge`); secondary filters smaller, inline, below; 3-column results grid.
- **Mobile `/projects`:** framing intro full-width; Best-For chips wrap (`flex-wrap`, same pattern as Services partner tags); secondary filters collapse into a filter drawer reusing the existing `Sheet` component (built for mobile nav); results stack to 1 column.
- **Desktop `/projects/[slug]`:** full-width photo hero; two-column body — main content + a **sticky sidebar** (facts + CTA card), reusing the sticky-column pattern proven in the "Why Tommy" section.
- **Mobile `/projects/[slug]`:** shorter hero aspect ratio; sidebar facts become an inline card right after the hero (sticky→stacked, same degradation as Why Tommy); consider a sticky bottom CTA bar on mobile — highest-intent page on the site.

## Reusable components

`ProjectCard` (grid, homepage teaser, related-projects — one component, three contexts), `ProjectFilterBar` (Best-For chips + secondary filters), `ProjectGrid` (layout + empty state, reusing `NoticePanel`'s pattern), `ProjectHero` (typed media hero), `ProjectFactsSidebar` (sticky facts + CTA), `AdvisorInsight` (shared by "Why I Recommend," "Why I Trust This Developer," and "Why This Location Matters" — one component, size variant differs), `TagList` (shared by Best For / Key Highlights / Property Types), `GatedContentPanel`.

## Future CMS/Dashboard note

Local content (one JSON file per project + one per developer) is shaped to be the exact input a future "Add Project" dashboard form collects — building the CMS later is a UI over this schema, not a redesign of it. Open-tag fields (Best For, Key Highlights) should be free-text-tag inputs in that future form, not a fixed checkbox list. The AI-draft-assist for "Why I Recommend" is a Dashboard-sprint feature, referencing the site's existing first-person copy as its style corpus.

## Content integrity guardrails

- No project goes live without real media and real, verifiable facts.
- No invented pricing figures — `startingPrice` must be real.
- No unit-level availability, floor plans, brochures, or full payment schedules anywhere on the public site.
- No artificial urgency mechanics of any kind.
- Every advisory note (`whyIRecommend`, `whyITrustThem`, `whyThisLocationMatters`) must be a real, personal judgment — never generated boilerplate presented as final without review.
