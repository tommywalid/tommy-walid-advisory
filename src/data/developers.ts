import type { Developer } from "@/types/projects";

/**
 * Developer entities — one entry per builder, reused across all their
 * projects (see docs/design/projects-information-architecture.md).
 *
 * Empty until real developer relationships are documented. Do not add a
 * placeholder/example entry here — an invented "why I trust them" note
 * would violate the no-fabricated-content principle this project follows
 * throughout. Add real entries only.
 *
 * To add one:
 * developers.push({
 *   id: "kebab-case-id",
 *   name: "Developer Name",
 *   logo: "/developers/slug.png", // optional
 *   whyITrustThem: { fr: "...", en: "..." },
 * });
 */
export const developers: Developer[] = [];
