import type { AIAssistMeta, LocalizedText } from "@/types/shared";

/**
 * Article entity — for the future Market Insights/Journal sprint (see
 * docs/product/roadmap.md). Scaffolded now so the Dashboard's Articles
 * section has a real, typed shape to manage rather than a placeholder.
 * Editor technology (rich text vs. MDX) for `body` is still an open
 * decision — stored as plain text/markdown string for now.
 */
export type Article = {
  slug: string;
  title: LocalizedText;
  category: string;
  coverImage?: string;
  body: LocalizedText;
  bodyMeta?: AIAssistMeta;
  metaDescription: LocalizedText;
  publishedAt?: string;
  published: boolean;
};
