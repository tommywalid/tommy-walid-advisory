import type { LocalizedText } from "@/types/shared";

/**
 * Testimonial entity. The public homepage currently shows three clearly
 * labeled placeholder quotes sourced from /messages (not this type) — this
 * is the future, Dashboard-managed replacement, scaffolded ahead of that
 * migration so the Dashboard's Testimonials section has a real shape to
 * manage. Switching the public Testimonials section to read from here is a
 * separate, later step (see docs/design/dashboard-information-architecture.md).
 */
export type Testimonial = {
  id: string;
  quote: LocalizedText;
  attribution: LocalizedText;
  /** Optional — references Project.slug */
  projectSlug?: string;
  featured: boolean;
  order: number;
};
