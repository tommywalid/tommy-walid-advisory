import {
  LayoutDashboard,
  Building2,
  Landmark,
  Newspaper,
  MessageSquareQuote,
  Sparkles,
  Image as ImageIcon,
  Home,
  Settings,
} from "lucide-react";

/**
 * Dashboard sidebar navigation — structure and order only, mirrors the
 * pattern in src/config/navigation.ts for the public site. See
 * docs/design/dashboard-information-architecture.md.
 */
export const dashboardNav = [
  { key: "overview", label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { key: "projects", label: "Projects", href: "/dashboard/projects", icon: Building2 },
  { key: "developers", label: "Developers", href: "/dashboard/developers", icon: Landmark },
  { key: "articles", label: "Articles", href: "/dashboard/articles", icon: Newspaper },
  { key: "social", label: "Social", href: "/dashboard/social", icon: Sparkles },
  {
    key: "testimonials",
    label: "Testimonials",
    href: "/dashboard/testimonials",
    icon: MessageSquareQuote,
  },
  { key: "media", label: "Media", href: "/dashboard/media", icon: ImageIcon },
  { key: "homepage", label: "Homepage", href: "/dashboard/homepage", icon: Home },
  { key: "settings", label: "Settings", href: "/dashboard/settings", icon: Settings },
] as const;
