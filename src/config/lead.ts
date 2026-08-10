/**
 * Qualification form structure (see docs/product/roadmap.md — Qualification Funnel).
 * Kept intentionally short (max 5 fields) to optimize conversion — the goal
 * is to start a conversation, not collect every detail.
 *
 * Option labels are translated via `pages.contact.goalLabels` / `budgetLabels`
 * in /messages, keyed by the `key` values below — this file defines the
 * canonical list, order, and (for budget) the underlying numeric ranges.
 * Currency is read from config/company.ts (single source for "AED").
 */
export const MAX_LEAD_FORM_FIELDS = 5;

export const investmentGoals = [
  "rental",
  "second-home",
  "golden-visa",
  "diversification",
  "other",
] as const;
export type InvestmentGoal = (typeof investmentGoals)[number];

export const budgetRanges = [
  { key: "under-1m", min: 0, max: 1_000_000 },
  { key: "1m-2m", min: 1_000_000, max: 2_000_000 },
  { key: "2m-5m", min: 2_000_000, max: 5_000_000 },
  { key: "5m-plus", min: 5_000_000, max: null },
] as const;
export type BudgetRangeKey = (typeof budgetRanges)[number]["key"];
