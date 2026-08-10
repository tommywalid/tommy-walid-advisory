# CLAUDE.md

Guidance for Claude Code (and any other AI agent) working in this repository.

## What This Project Is

A premium, multilingual (French/English/Arabic) real estate investment platform whose goal is to become **the reference advisor for international investors investing in Dubai**. This is a long-term product, not a quick build — every technical decision is made for years of maintainability, not for short-term speed.

**This is Tommy Walid's personal brand, not a company.** There is no firm name, no "team," no corporate entity presented to visitors — Tommy is the product. See "Personal Brand Voice" below; this governs all product, design, and copy decisions.

Product Owner: Tommy Walid. Claude acts as Lead Software Engineer, responsible for technical execution.

## Current Phase

**Phase 0 — Project Foundation.** The repository currently holds documentation architecture and engineering conventions only. There is no application code, framework, or database yet. Do not introduce Next.js, React, Tailwind, components, pages, a database, or any other application code until the Product Owner explicitly approves moving into the next phase.

## Governing Principles

- **Optimize for maintainability, not speed.** The project will evolve for years; every decision should hold up under that horizon.
- **Documentation before code.** Product, branding, design, technical, SEO, and development decisions are recorded in `/docs` before they are implemented.
- **Never invent content.** Documentation templates are created as empty structures (headings only) until the Product Owner or a dedicated work session fills them in with real decisions.
- **Never continue automatically.** Each phase of work ends with an explanation of what was done and why, then waits for explicit approval before proceeding to the next phase.

## Repository Structure

```
tommy-walid-advisory/
├── README.md              # Project overview and entry point
├── CLAUDE.md               # This file — guidance for AI agents
├── LICENSE                 # MIT
├── .gitignore
└── docs/                   # All project knowledge, organized by domain
    ├── README.md            # Documentation index
    ├── product/              # Vision, positioning, audience, business model, roadmap
    ├── branding/              # Identity, logo, color, typography, tone of voice
    ├── design/                # Design system, UX/UI, accessibility, multilingual/RTL
    ├── technical/              # Architecture, stack, data model, API, infra, security
    ├── seo/                    # SEO strategy, keyword research, international SEO
    └── development/            # Coding standards, Git workflow, setup, deployment
```

## Working Conventions

- **Docs are organized by domain**, not kept as a flat list — when adding a new document, place it in the domain folder it belongs to, and add an entry to `docs/README.md`.
- **One concern per document.** Keep documents focused; split rather than let a single file sprawl across unrelated topics.
- **Git workflow:** documented in `docs/development/git-workflow.md` once written; until then, keep commits small and scoped to a single logical change, and do not commit directly without the Product Owner's direction on branch strategy.
- **No fabricated specifics.** Do not invent tech stack choices, brand colors, personas, or figures anywhere in the repo — those are decided deliberately and recorded when actually decided.
- **Personal brand voice.** All customer-facing copy speaks in the first person — "I" / "me" / "my" — never "we" / "our" / a company name standing in for Tommy. The wordmark reads "Tommy Walid" alone, no company suffix. See `docs/branding/brand-identity.md`. The only acceptable "we"-style language is generic industry terminology (e.g. "investment advisory services" as a description of the type of work) — never implying an entity separate from Tommy himself.

## Multilingual & Regional Context

The platform targets international investors interested in Dubai real estate — not a French-speaking audience specifically. French, English and Arabic are all first-class languages (implemented: French default, English; Arabic planned), which implies (to be formalized in `docs/design/multilingual-rtl-design.md` and `docs/technical/internationalization.md`):

- No single language is privileged in positioning or copy — each locale should read as native, not translated-from-French.
- Right-to-left (RTL) layout considerations for Arabic.
- Dubai/UAE regional, legal, and currency context.

## Waiting for Approval

Work proceeds phase by phase. After completing a phase, summarize the decisions and their rationale, then stop and wait for the Product Owner's explicit validation before starting the next phase.
