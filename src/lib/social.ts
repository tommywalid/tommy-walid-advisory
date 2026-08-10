import { socialSnippets } from "@/data/social";
import type { SocialSnippet } from "@/types/social";

export function getAllSocialSnippets(): SocialSnippet[] {
  return socialSnippets;
}

export function getSocialSnippetsForSource(
  sourceType: SocialSnippet["sourceType"],
  sourceSlug: string,
): SocialSnippet[] {
  return socialSnippets.filter(
    (s) => s.sourceType === sourceType && s.sourceSlug === sourceSlug,
  );
}
