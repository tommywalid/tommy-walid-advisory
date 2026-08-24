import { Fraunces, Inter, Noto_Kufi_Arabic, Noto_Sans_Arabic } from "next/font/google";

/**
 * Shared font loaders — both the public [locale] root layout and the
 * internal dashboard layout are separate top-level segments (siblings
 * under app/, each rendering its own <html>), so each needs its own font
 * instances. Defined once here rather than duplicated in both layouts.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  axes: ["opsz"],
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * Arabic-script counterparts to fraunces/inter — neither Latin font has
 * Arabic glyphs, so `ar` needs its own pair. Loaded under separate CSS
 * variables and swapped in only for `html[lang="ar"]` (see globals.css);
 * FR/EN keep --font-heading/--font-sans exactly as before, unaffected.
 */
export const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-heading-ar",
  display: "swap",
});

export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-sans-ar",
  display: "swap",
});
