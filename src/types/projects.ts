/**
 * Project/Developer entity shapes — see docs/design/projects-information-architecture.md.
 *
 * Shaped to be exactly what a future "Add Project" CMS/dashboard form would
 * collect, so building that UI later is a layer over this schema, not a
 * redesign of it. Local content today (src/data/*) matches this shape 1:1
 * so a future Supabase migration is a data-layer swap, not a UI change.
 *
 * Extended for the V1 editorial catalog research pass (see
 * docs/product/v1-editorial-catalog.md) — company/project facts researched
 * from official and reliable sources, cited in
 * docs/product/v1-catalog-research-sources.md. `fr` fields are
 * intentionally left empty pending translation — research was English-only.
 */

import type { AIAssistMeta, LocalizedText } from "@/types/shared";

export type { LocalizedText };

/** Fixed, closed taxonomy — standard real-estate unit types. */
export type PropertyType =
  | "studio"
  | "1-bed"
  | "2-bed"
  | "3-bed"
  | "4-bed"
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
  /** Direct URL to the official logo asset, where found. */
  logo?: string;
  /** First-person, concise — written once per developer, reused across all their projects. Empty until Tommy writes it. */
  whyITrustThem: LocalizedText;

  /** 2-3 sentence factual overview. */
  overview?: LocalizedText;
  /** Founding story and key milestones. */
  history?: LocalizedText;
  /** The developer's own stated mission/vision, where publicly available. */
  vision?: LocalizedText;
  founderOrCeo?: string;
  /** Left undefined where genuinely unverifiable/conflicting across sources — never guessed. */
  yearFounded?: number;
  headquarters?: string;
  /** Officially published figures only, each stating its own year — e.g. "AED 35.5B revenue (FY2024)". */
  keyFigures?: string[];
  /** Notable projects overall, not limited to this catalog. */
  signatureDevelopments?: string[];
  /** Each stating its year where known. */
  awards?: string[];
  /** Factual/analytical synthesis grounded in cited research — not personal opinion. */
  marketPositioning?: LocalizedText;
  /** Factual synthesis of differentiation — distinct from whyITrustThem, which is personal judgment. */
  whyStandsOut?: LocalizedText;
  officialWebsite?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type Project = {
  slug: string;
  name: string;
  /** References Developer.id */
  developerId: string;
  /** Editorial priority from the V1 catalog — Tommy's own categorization, not a public-facing label. */
  tier?: "A" | "B" | "C";
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

  /** 2-3 sentence factual overview. */
  overview?: LocalizedText;
  /** Officially listed amenities. */
  amenities?: string[];
  /** Verifiable nearby landmarks/points of interest. */
  nearbyLandmarks?: string[];
  /** The official developer project page — reference for verification, not a public media gallery. */
  officialSourceUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
};
