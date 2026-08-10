import type { AIAssistMeta, LocalizedText } from "@/types/shared";

/**
 * Social content snippets — drafting/generation only, not a posting or
 * scheduling system (that's Automations-sprint territory, see
 * docs/product/roadmap.md). A snippet is always generated *from* an
 * existing Project or Article, keeping social copy grounded in real,
 * already-reviewed content rather than invented independently.
 */
export type SocialPlatform = "instagram" | "linkedin" | "whatsapp-status" | "generic";
export type SocialSnippetStatus = "draft" | "approved";

export type SocialSnippet = {
  id: string;
  sourceType: "project" | "article";
  /** References Project.slug or Article.slug depending on sourceType. */
  sourceSlug: string;
  platform: SocialPlatform;
  content: LocalizedText;
  contentMeta?: AIAssistMeta;
  status: SocialSnippetStatus;
};
