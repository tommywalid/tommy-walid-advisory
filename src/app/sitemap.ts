import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { company } from "@/config/company";
import { navigation } from "@/config/navigation";
import { getPublishedProjects } from "@/lib/projects";

const staticRoutes = ["", ...navigation.map((item) => item.href), "/privacy-policy"];
const projectRoutes = getPublishedProjects().map((p) => `/projects/${p.slug}`);
const routes = [...staticRoutes, ...projectRoutes];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${company.url}/${locale}${route}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${company.url}/${l}${route}`]),
        ),
      },
    })),
  );
}
