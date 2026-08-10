"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink } from "lucide-react";

import { dashboardNav } from "@/config/dashboard-nav";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col bg-forest text-cream">
      <div className="px-6 py-7">
        <span className="font-heading text-lg text-cream">Tommy Walid</span>
        <span className="mt-0.5 block text-[11px] font-semibold tracking-[0.24em] text-gold-light uppercase">
          Dashboard
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 px-3">
        {dashboardNav.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-cream/10 text-cream"
                  : "text-cream/60 hover:bg-cream/5 hover:text-cream",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-cream/10 px-6 py-5">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-cream/50 transition-colors hover:text-cream"
        >
          <ExternalLink className="size-3.5" />
          View live site
        </a>
      </div>
    </aside>
  );
}
