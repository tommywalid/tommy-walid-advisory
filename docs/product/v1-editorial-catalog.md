# V1 Editorial Catalog

> Status: Approved, locked. This is the exhaustive V1 launch catalog — 15 projects across 7 developers. **No project or developer should be added beyond this list unless Tommy explicitly decides to expand the catalog.** Reference dataset for the website, Dashboard, CMS, and future automations/AI workflows.
>
> Names and locations below are the **validated, official** versions confirmed during the research pass — see `v1-catalog-research-sources.md` for the corrections log against the original working list (e.g. "Enara Residence" → "Enre Residence", "The Meria Collection" → "The Meriva Collection", "Everly Palace" → "Everly Place", "Raw District 2 — Dubai South" → "Raw District II — Downtown Jebel Ali", "DAMAC Islands 2 — Dubai Islands" → "DAMAC Islands 2 — Dubailand"). This document is kept in sync with `src/data/projects.ts` / `src/data/developers.ts` — update both together.

## Tier A

**Emaar**
- Valia — Dubai Creek Harbour
- AEON — Dubai Creek Harbour
- Park Lane — Dubai Hills Estate

## Tier B

**DAMAC**
- Chelsea Residences — Dubai Maritime City
- DAMAC Islands 2 — Dubailand (townhouses & villas)

**Ellington**
- The Meriva Collection — Dubai Islands
- Everly Place — Mohammed Bin Rashid City

**Binghatti**
- Aquarise — Business Bay
- Wraith — Al Jaddaf

## Tier C

**Imtiaz**
- The Archive — Dubai Land Residence Complex (DLRC)
- Enre Residence — Dubai South
- Raw District II — Downtown Jebel Ali

**Object 1**
- ELAR1S Rise — Jumeirah Village Triangle (JVT)
- AUREL1A Residence — Dubai Sports City

**Samana**
- SAMANA South Haven — Dubai South

## Implementation status

All 15 projects and 7 developers exist in `src/data/projects.ts` / `src/data/developers.ts` with their real name, developer, location, and tier populated. Every entry is `published: false` — none are live on the public site.

**What's still needed per entry before publishing**, none of which can be invented (see `docs/design/projects-information-architecture.md` content integrity guardrails):
- Starting price (real figure)
- Payment plan (summary)
- Handover date/status
- "Why I Recommend This Project" (Tommy's note)
- "Why I Trust This Developer" (one per developer, reused across their projects)
- "Why This Location Matters"
- Real photography/renders/masterplan/aerial media
- Best For / Key Highlights tags

The Dashboard Overview's "needs attention" list (`src/lib/dashboard.ts`) surfaces incomplete projects using this exact criteria, so completing the catalog is trackable there as content comes in.

Tier A projects (Valia, AEON, Park Lane) are pre-marked `featured: true`, ready to appear in the homepage teaser the moment they're published — inert until then.
