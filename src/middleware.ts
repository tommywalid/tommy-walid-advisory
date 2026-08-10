import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Excludes /dashboard: it's a separate, single-language segment outside
  // the [locale] tree (see src/app/dashboard/layout.tsx) and must not be
  // redirected to a locale-prefixed path.
  matcher: ["/((?!api|_next|_vercel|dashboard|.*\\..*).*)"],
};
