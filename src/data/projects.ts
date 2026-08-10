import type { Project } from "@/types/projects";

/**
 * Curated project listings (target: ~20–30 published at a time — see
 * docs/design/projects-information-architecture.md). This is a personal
 * recommendation list, not a market feed: every entry here should be one
 * Tommy has personally chosen to put in front of clients.
 *
 * Empty until real projects are supplied — no placeholder/demo entries.
 * A fabricated project (invented developer, price, photos, or "why I
 * recommend" note) would violate the no-fabricated-content principle this
 * project has followed throughout, and would be indistinguishable from a
 * real recommendation to a visitor. The empty state this produces on
 * /projects is intentional, designed UI (see ProjectGrid), not a bug.
 *
 * To add a project once real details, photography, and an advisory note
 * are available, push an entry matching the Project type in
 * src/types/projects.ts — set `published: true` when ready to go live,
 * `featured: true` to also surface it in the homepage teaser.
 */
export const projects: Project[] = [];
