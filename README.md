# Tommy Walid

> Premium multilingual (FR/EN/AR) personal-brand website for a Dubai real estate investment advisor — built for international investors. This is Tommy Walid's personal brand, not a company: sitewide copy speaks in the first person ("I," "me," "my"), never "we"/"our"/a firm name.

## Project Status

**Phase 1 — Architecture & Homepage.** The Next.js application has been scaffolded and the premium homepage is built. Secondary pages (About, Services, Investment Process, Blog, Contact, Privacy Policy) exist as routed, on-brand architecture with placeholder content pending real copy. See [`docs/product/roadmap.md`](docs/product/roadmap.md) for the phased plan.

## About

This repository is the single source of truth for the product, brand, design, technical, SEO, and development decisions behind the platform. Every domain of the project is documented before it is built, so that the codebase that eventually lands here is the execution of a deliberate plan rather than a collection of ad hoc choices.

## Documentation

All project knowledge lives in [`/docs`](docs), organized by domain rather than kept as a flat pile of files:

| Domain | Contents |
|---|---|
| [`docs/product`](docs/product) | Vision, positioning, target audience, business model, roadmap |
| [`docs/branding`](docs/branding) | Identity, logo, color, typography, voice |
| [`docs/design`](docs/design) | Design system, UI/UX guidelines, accessibility, multilingual & RTL design |
| [`docs/technical`](docs/technical) | Architecture, tech stack, data model, API, infrastructure, security |
| [`docs/seo`](docs/seo) | SEO strategy, keyword research, international SEO, content strategy |
| [`docs/development`](docs/development) | Coding standards, Git workflow, environment setup, deployment |

Start at [`docs/README.md`](docs/README.md) for the full documentation index.

## Repository Structure

```
tommy-walid-advisory/
├── README.md
├── CLAUDE.md
├── LICENSE
├── .gitignore
├── docs/
│   ├── product/
│   ├── branding/
│   ├── design/
│   ├── technical/
│   ├── seo/
│   └── development/
├── messages/            # next-intl translations (fr, en)
├── public/
└── src/
    ├── app/[locale]/    # App Router pages (home, about, services, …)
    ├── components/       # ui/, layout/, sections/, motion/, brand/
    ├── config/
    ├── i18n/            # next-intl routing, navigation, request config
    └── lib/
```

## Tech Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui-style primitives · next-intl (FR/EN) · Framer Motion · Lucide Icons · deployed on Vercel. Documented in [`docs/technical/tech-stack.md`](docs/technical/tech-stack.md).

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000 (redirects to /fr)
npm run build    # production build
npm run lint
npm run typecheck
```

## Contributing

See [`docs/development/contribution-guide.md`](docs/development/contribution-guide.md) and [`docs/development/git-workflow.md`](docs/development/git-workflow.md).

## License

Distributed under the [MIT License](LICENSE).
