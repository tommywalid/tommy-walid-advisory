# Technology Stack

## Frontend

- **Framework:** Next.js 15 (App Router), TypeScript, React 19.
- **Styling:** Tailwind CSS v4 (CSS-first configuration via `@theme` in `src/app/globals.css` — no `tailwind.config.js`).
- **Component primitives:** shadcn/ui conventions (`class-variance-authority`, `@radix-ui/react-*`, a local `cn()` helper), hand-built against the brand's own design tokens rather than shadcn's generic theme, since the site does not need a user-toggleable dark mode.
- **Internationalization:** `next-intl`, French (default) and English, always-prefixed routes (`/fr/...`, `/en/...`). Arabic is anticipated (see `docs/design/multilingual-rtl-design.md`) but not yet implemented.
- **Animation:** Framer Motion — scroll-triggered reveals (`components/motion/reveal.tsx`) and a staggered hero entrance (`components/motion/hero-motion.tsx`).
- **Icons:** Lucide (`lucide-react`). Note: Lucide no longer ships trademarked brand/social icons (e.g. LinkedIn, Instagram); the footer uses text links for those instead.
- **Fonts:** `Fraunces` (headings, serif) and `Inter` (body), loaded via `next/font/google`.

## Backend

None yet. No API routes, server actions, or CMS integration exist. The contact page's form submits via a `mailto:` link (client-side only) rather than a backend endpoint — this is an intentional interim solution, to be replaced once a backend/CRM is scoped.

## Database

None yet. No persistence layer has been introduced.

## Infrastructure & Hosting

- **Target host:** Vercel (the app uses `next/og` for a generated favicon, `next/font` self-hosting, and the standard `app/sitemap.ts` / `app/robots.ts` conventions — all Vercel-optimized out of the box).
- **Package manager:** npm.

## Third-Party Services

None integrated yet (no analytics, CRM, email provider, or CMS). To be decided and documented here as they are adopted.
