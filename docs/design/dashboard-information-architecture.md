# Dashboard — Information Architecture, Navigation & UX

> Status: Approved. Shell implemented (navigation, layout, list-view pages, Overview, Settings) — **CRUD/persistence and authentication are still not implemented**, by explicit instruction. This is the internal back-office for managing Projects, Developers, Articles, Testimonials, Media, Social content, and homepage featured content.

## Structural decisions

- **Separate from the public site.** Routes live outside the `[locale]` segment (`src/app/dashboard/...`), single-language UI (English), its own layout (sidebar + top bar) — not the public header/footer, no i18n routing overhead for a tool only Tommy uses. Renders its own `<html>`/`<body>`, same sibling-segment pattern as `[locale]/layout.tsx`; both share font loading via `src/lib/fonts.ts`.
- **Gated behind auth**, but auth itself is not designed or implemented here — it depends on the backend (Supabase Auth) existing first. Until then, `robots.ts` disallows `/dashboard` and the shell displays a persistent warning banner: do not deploy this route publicly without auth.
- **Bilingual editing pattern: FR | EN | AR language tabs**, not separate pages, switching all fields in a form at once. Arabic is included now even though the public site doesn't render it yet (`src/i18n/routing.ts` locales are still `fr`/`en`) — `LocalizedText` (`src/types/shared.ts`) already carries an optional `ar` field, so content can be drafted ahead of the public site supporting it, and adding Arabic later is not a breaking schema change.
- **Draft/Published is universal**, not specific to Projects — every content type gets the same `published` toggle plus a **publish-readiness checklist** (e.g. a project can't go live without a cover photo and an advisory note). Enforces the content-integrity guardrails from `docs/design/projects-information-architecture.md` at the point of entry. Implemented now: the Overview's "needs attention" list (`src/lib/dashboard.ts`) surfaces incomplete projects using this exact logic.
- **Built to scale**, not to fit today's near-empty dataset: list views are structured for search/filter/pagination even at zero items.
- **Designed for future AI features.** Generating articles, project descriptions, and social content from the Dashboard is a stated future capability — the architecture reserves room for it now:
  - `AIAssistMeta` (`src/types/shared.ts`) — `{ aiAssisted?, aiReviewedAt? }` — attachable to any AI-draftable field. `Project.whyIRecommendMeta` and `Article.bodyMeta` already carry it.
  - **AI drafts are never auto-published.** A human must review and explicitly approve — the same principle already enforced for `whyIRecommend` extends to every AI-assisted field, sitewide.
  - A dedicated **Social** section (`src/app/dashboard/social`) models AI-generated social copy as its own entity (`SocialSnippet`, `src/types/social.ts`) — always generated *from* an existing Project or Article (never invented independently), always a `draft` until approved. This is a **drafting surface, not a posting/scheduling system** — publishing integrations are separate, later (Automations-sprint) territory.
  - The site's existing real first-person copy (Why Tommy pillars, the About page's interview-derived content, Services commitment lines) remains the style/voice corpus any future generation should ground itself in.
  - A shared `AIBadge` component (`src/components/dashboard/ai-badge.tsx`) marks AI-assisted content consistently wherever it appears, rather than three different ad hoc treatments.

## Navigation (persistent left sidebar)

Overview · Projects · Developers · Articles · Social · Testimonials · Media · Homepage · Settings

Top bar: "View live site ↗" link, plus the no-auth warning banner (see above).

## Pages

### Overview (`/dashboard`)
Real, live counts (published/draft projects, articles, testimonials, media items, social drafts — computed by `src/lib/dashboard.ts`, never hardcoded). "Needs attention" list surfacing incomplete projects.

### Projects (`/dashboard/projects`)
List: name, developer, location, status badge, featured star. Edit form (not yet built — next progressive step) will mirror the public detail page's own section order: Basics → Property Details → Positioning (tag inputs, open/freeform per the approved Projects architecture) → Advisory Note (FR/EN/AR tabs, AI-draft placement reserved) → Media → Visibility.

### Developers (`/dashboard/developers`)
List: name, "used by N projects." Edit form (not yet built): name, logo, Why I Trust Them (FR/EN/AR). Delete should be blocked/warned if a developer is still referenced by a project.

### Articles (`/dashboard/articles`)
For the future Market Insights sprint. List: title, category, status, AI-draft indicator. Editor technology (rich text vs. MDX) remains an open decision.

### Social (`/dashboard/social`)
AI-generated social copy, drafted from an existing Project or Article. Drafting only — no platform posting/scheduling designed or implied.

### Testimonials (`/dashboard/testimonials`)
List: quote excerpt, attribution, featured. The public homepage's current placeholder quotes live in `/messages`, not this data model — migrating the public Testimonials section to read from here is a separate, later step, noted in `src/types/testimonials.ts`.

### Media (`/dashboard/media`)
A shared library, not per-entity uploads. Type and caption (FR/EN/AR) required at upload time — honest labeling enforced at the point of entry, matching the principle already established for Project media. Usage tracking (`MediaLibraryItem.usedIn`) and orphaned-asset detection are modeled in the type even before upload exists.

### Homepage (`/dashboard/homepage`)
A curation screen, distinct from editing entities directly: currently featured projects and testimonials, read live from the same data the public homepage reads — not a duplicate content source.

### Settings (`/dashboard/settings`) — approved
Displays the real values from `src/config/company.ts` (phone, WhatsApp, Calendly, address, socials, currency, timezone). Read-only for now — there's nowhere to persist a change until the backend exists — but the goal is removing the code-deploy dependency for updating these facts.

## Explicitly deferred / out of scope

- Authentication implementation.
- Actual CRUD/persistence (per instruction).
- Individual entity create/edit forms (the shell, navigation, and list views are built; forms are the next progressive step).
- Articles editor technology choice.
- Real AI generation logic (the architecture reserves the room; nothing calls a model yet).
- Multi-user / role-based permissions — single-user assumption for now.
