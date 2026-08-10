/**
 * Primary site navigation — structure and order only.
 * Labels are translated via the `nav` namespace in /messages, keyed by `key` below.
 */
export const navigation = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "process", href: "/investment-process" },
  { key: "blog", href: "/blog" },
  { key: "contact", href: "/contact" },
] as const;

export type NavKey = (typeof navigation)[number]["key"];
