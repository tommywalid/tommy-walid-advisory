import type { PropertyType } from "@/types/projects";

/** Fixed, closed taxonomy — see docs/design/projects-information-architecture.md. */
export const PROPERTY_TYPES: PropertyType[] = [
  "studio",
  "1-bed",
  "2-bed",
  "3-bed",
  "4-bed",
  "townhouse",
  "villa",
  "office",
  "retail",
];

/**
 * Seed suggestions only — Best For and Key Highlights are open tag systems.
 * Any string key is valid; these lists exist to (a) autocomplete in the
 * future CMS and (b) guarantee translated labels exist for the tags most
 * likely to be used from day one. A brand-new tag not listed here still
 * works — see getTagLabel()'s humanized fallback in src/lib/projects.ts.
 */
export const SUGGESTED_BEST_FOR_TAGS = [
  "first-investment",
  "capital-appreciation",
  "rental-income",
  "golden-visa",
  "family-living",
  "end-user",
];

export const SUGGESTED_HIGHLIGHT_TAGS = [
  "waterfront",
  "metro-access",
  "branded-residence",
  "beach-access",
  "golf-community",
  "smart-home",
  "fully-furnished",
];

/**
 * Best-effort mapping from a project's "Best For" tags to the closest lead
 * qualification goal (config/lead.ts investmentGoals) — used to pre-fill the
 * contact form when a visitor moves from a project into a conversation.
 * These are two deliberately separate taxonomies (see architecture doc);
 * this is the bridge between them, not a merge.
 */
export const BEST_FOR_TO_GOAL: Record<string, string> = {
  "rental-income": "rental",
  "golden-visa": "golden-visa",
  "family-living": "second-home",
  "end-user": "second-home",
  "capital-appreciation": "diversification",
  "first-investment": "other",
};

export function mapBestForToGoal(bestFor: string[]): string {
  for (const tag of bestFor) {
    const mapped = BEST_FOR_TO_GOAL[tag];
    if (mapped) return mapped;
  }
  return "other";
}
