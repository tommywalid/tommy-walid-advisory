import type { Metadata } from "next";

import { fraunces, inter } from "@/lib/fonts";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import "../globals.css";

/**
 * A sibling top-level segment to [locale], not nested under it — the
 * internal Dashboard is single-language (English) and has no reason to
 * carry the public site's i18n routing overhead. This is why it renders
 * its own <html>/<body>, same pattern as [locale]/layout.tsx.
 */
export const metadata: Metadata = {
  title: "Dashboard | Tommy Walid",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full bg-[#F7F5F0] text-ink antialiased">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
