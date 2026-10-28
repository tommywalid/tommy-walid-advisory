import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Excludes /dashboard: it's a separate, single-language segment outside
  // the [locale] tree (see src/app/dashboard/layout.tsx) and must not be
  // redirected to a locale-prefixed path. /lp1 is excluded for the same
  // reason: it is a standalone landing page with its own root layout and
  // its own language segment (src/app/lp1/[lang]/layout.tsx).
  matcher: ["/((?!api|_next|_vercel|dashboard|lp1|.*\\..*).*)"],
};
