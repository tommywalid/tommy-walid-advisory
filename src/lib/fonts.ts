import { Fraunces, Inter } from "next/font/google";

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
