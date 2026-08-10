/**
 * Project/Developer entity shapes — see docs/design/projects-information-architecture.md.
 *
 * Shaped to be exactly what a future "Add Project" CMS/dashboard form would
 * collect, so building that UI later is a layer over this schema, not a
 * redesign of it. Local content today (src/data/*) matches this shape 1:1
 * so a future Supabase migration is a data-layer swap, not a UI change.
 */

import type { AIAssistMeta, LocalizedText } from "@/types/shared";

export type { LocalizedText };

/** Fixed, closed taxonomy — standard real-estate unit types. */
export type PropertyType =
  | "studio"
  | "1-bed"
  | "2-bed"
  | "3-bed"
  | "townhouse"
  | "villa"
  | "office"
  | "retail";

export type MediaType = "photo" | "render" | "masterplan" | "aerial";

export type MediaAsset = {
  url: string;
  type: MediaType;
  caption?: LocalizedText;
};

export type Developer = {
  id: string;
  name: string;
  logo?: string;
  /** First-person, concise — written once per developer, reused across all their projects. */
  whyITrustThem: LocalizedText;
};

export type Project = {
  slug: string;
  name: string;
  /** References Developer.id */
  developerId: string;
  /** Proper noun (district/area) — same across locales, not localized. */
  location: string;
  whyThisLocationMatters: LocalizedText;
  propertyTypes: PropertyType[];
  startingPrice: { amount: number; currency: "AED" };
  /** Short summary only — never the full payment schedule. */
  paymentPlan: LocalizedText;
  /** e.g. "Q4 2027" or "Ready" */
  handover: string;
  /** Open tag list — any string key is valid, not constrained to the seed suggestions. */
  bestFor: string[];
  /** Open tag list, optional. */
  keyHighlights: string[];
  /** First-person narrative — always human-edited before publish. */
  whyIRecommend: LocalizedText;
  /** Tracks whether whyIRecommend started as an AI draft — see AIAssistMeta. */
  whyIRecommendMeta?: AIAssistMeta;
  media: {
    cover: MediaAsset;
    gallery: MediaAsset[];
  };
  /** Shows in the homepage "Selected Projects" teaser. */
  featured: boolean;
  /** Lets a project be staged before it's live. */
  published: boolean;
};
