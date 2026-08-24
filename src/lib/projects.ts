import { developers } from "@/data/developers";
import { projects } from "@/data/projects";
import type { Developer, LocalizedText, Project } from "@/types/projects";

/**
 * Data access layer for Projects/Developers. Every consumer (homepage
 * teaser, /projects grid, related-projects, future search, future CMS,
 * future automations) goes through these functions rather than importing
 * the raw arrays directly — so swapping the source (e.g. to Supabase later)
 * is a change in this one file, not in every component that reads project
 * data. See docs/design/projects-information-architecture.md.
 */

/** Every project, published or draft — for the Dashboard, which needs to see both. */
export function getAllProjects(): Project[] {
  return projects;
}

/**
 * The public-facing view of the catalog. In local development (`next dev`,
 * NODE_ENV=development) this intentionally returns every project regardless
 * of `published` — Tommy's private review environment, never deployed
 * publicly — so the full site can be reviewed as content comes in without a
 * separate preview step. Production (`next build`/`next start`,
 * NODE_ENV=production) is unaffected: published-only, exactly as before.
 * `published` itself, and every other consumer of this function, are
 * unchanged — this is the one gate all of them already went through.
 */
export function getPublishedProjects(): Project[] {
  if (process.env.NODE_ENV !== "production") return projects;
  return projects.filter((p) => p.published);
}

export function getFeaturedProjects(limit = 3): Project[] {
  return getPublishedProjects()
    .filter((p) => p.featured)
    .slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getPublishedProjects().find((p) => p.slug === slug);
}

export function getProjectsByBestFor(tag: string): Project[] {
  return getPublishedProjects().filter((p) => p.bestFor.includes(tag));
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  return getPublishedProjects()
    .filter(
      (p) =>
        p.slug !== project.slug &&
        p.bestFor.some((tag) => project.bestFor.includes(tag)),
    )
    .slice(0, limit);
}

/** Distinct locations across published projects, for the secondary filter — derived, never hardcoded. */
export function getAllLocations(): string[] {
  return Array.from(new Set(getPublishedProjects().map((p) => p.location))).sort();
}

export function getDeveloper(developerId: string): Developer | undefined {
  return developers.find((d) => d.id === developerId);
}

/** "AED 1,450,000" / "AED 1 450 000" depending on locale — real figure, locale-aware formatting only. */
export function formatStartingPrice(
  price: Project["startingPrice"],
  locale: string,
): string {
  const formatted = new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-US").format(
    price.amount,
  );
  return `${price.currency} ${formatted}`;
}

/**
 * "AED 1,450,000" once verified, "—" while a price is still genuinely
 * pending (never "AED 0", which reads as a bug rather than "not yet
 * confirmed" — see the V1 catalog's pending-field convention).
 */
export function formatStartingPriceOrPending(
  price: Project["startingPrice"],
  locale: string,
): string {
  return price.amount > 0 ? formatStartingPrice(price, locale) : "—";
}

/** Any plain fact that may still be pending (handover, etc.) — "—" instead of a blank cell. */
export function factOrPending(value: string): string {
  return value.trim() || "—";
}

/**
 * Returns the requested locale's text, falling back to English then French
 * if the requested one is empty, then "—" if all are (e.g. content
 * researched English-only, or a field genuinely not yet written). Arabic
 * (`text.ar`) is optional per LocalizedText — most catalog entries don't
 * have it yet, so `ar` requests fall back to English exactly like a missing
 * `fr` field always has. Centralizes the fallback so no page ever shows a
 * blank paragraph where a note belongs.
 */
export function localizedText(text: LocalizedText, locale: string): string {
  const byLocale: Record<string, string | undefined> = { fr: text.fr, en: text.en, ar: text.ar };
  const primary = byLocale[locale] ?? text.en;
  return primary.trim() || text.en.trim() || text.fr.trim() || "—";
}

/** Same as localizedText, but "" (not "—") when all are empty — for callers that hide the block instead of showing a placeholder. */
export function localizedTextOrEmpty(text: LocalizedText, locale: string): string {
  const byLocale: Record<string, string | undefined> = { fr: text.fr, en: text.en, ar: text.ar };
  const primary = byLocale[locale] ?? text.en;
  return primary.trim() || text.en.trim() || text.fr.trim();
}

/** "metro-access" → "Metro Access" — fallback label for a tag with no translation entry yet. */
export function humanizeTagKey(key: string): string {
  return key
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Looks up a tag's translated label from a raw dictionary (t.raw(namespace)), falling back to a humanized key. */
export function getTagLabel(
  dictionary: Record<string, string>,
  key: string,
): string {
  return dictionary[key] ?? humanizeTagKey(key);
}
