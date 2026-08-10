/**
 * Shared across every content type in the future Dashboard (Projects,
 * Developers, Articles, Testimonials, Social) — see
 * docs/design/dashboard-information-architecture.md.
 */

/**
 * Narrative/copy fields that must read as one advisor's real voice in every
 * language. `ar` is optional and not yet rendered anywhere on the public
 * site (Arabic isn't a live locale in src/i18n/routing.ts yet), but the
 * Dashboard's editing UI already exposes an AR tab — content can be
 * drafted ahead of the public site supporting it, so this type doesn't
 * need to change (a breaking migration) when that day comes.
 */
export type LocalizedText = {
  fr: string;
  en: string;
  ar?: string;
};

/**
 * Attached to any field that can be AI-drafted (see the Dashboard's planned
 * "Generate with AI" affordance). Always defaults to false/undefined for
 * real, human-written content — AI drafts are never auto-published; a human
 * must review and explicitly approve before `published` can be set on the
 * owning entity. This mirrors the no-fabricated-content principle already
 * enforced across Projects.
 */
export type AIAssistMeta = {
  aiAssisted?: boolean;
  aiReviewedAt?: string;
};
