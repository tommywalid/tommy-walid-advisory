import type { LocalizedText } from "@/types/shared";

/**
 * Shared Media Library entity — broader than Project's own MediaType
 * (photo/render/masterplan/aerial), since the library also holds developer
 * logos and, eventually, video. Honest type-labeling is required at upload
 * time (see docs/design/dashboard-information-architecture.md), same
 * principle already enforced for Project media.
 */
export type LibraryMediaType =
  | "photo"
  | "render"
  | "masterplan"
  | "aerial"
  | "logo"
  | "video"
  | "document";

export type MediaReference = {
  entity: "project" | "developer" | "article" | "testimonial";
  id: string;
};

export type MediaLibraryItem = {
  id: string;
  url: string;
  type: LibraryMediaType;
  caption?: LocalizedText;
  /** Populated by usage tracking, not set at upload — see Dashboard IA. */
  usedIn?: MediaReference[];
  uploadedAt: string;
};
