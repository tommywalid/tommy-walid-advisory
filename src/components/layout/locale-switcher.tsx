"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const codeLabels: Record<string, string> = { fr: "FR", en: "EN", ar: "AR" };
const nameLabels: Record<string, string> = { fr: "Français", en: "English", ar: "العربية" };

/**
 * Compact dropdown — shows only the active locale's code + a chevron when
 * closed (no flags, no simultaneous FR/EN/AR list in the header itself).
 * Opening it reveals the three languages by name. Hand-rolled rather than
 * a Radix primitive: no dropdown-menu package is in this project yet, and
 * three plain, always-identical menu items don't need one.
 */
export function LocaleSwitcher({ dark = false }: { dark?: boolean }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Language switcher"
        className={cn(
          "flex items-center gap-1 text-sm font-medium transition-colors",
          dark ? "text-cream/70 hover:text-cream" : "text-ink-soft hover:text-forest",
        )}
      >
        {codeLabels[locale]}
        <ChevronDown className={cn("size-3.5 transition-transform", open ? "rotate-180" : undefined)} />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute end-0 top-full z-10 mt-2 min-w-32 overflow-hidden rounded-lg border border-beige-dark/70 bg-white py-1 shadow-lg"
        >
          {routing.locales.map((code) => (
            <button
              key={code}
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                router.replace(pathname, { locale: code });
              }}
              aria-current={locale === code ? "true" : undefined}
              className={cn(
                "block w-full px-4 py-2 text-start text-sm transition-colors",
                locale === code ? "font-semibold text-forest" : "text-ink-soft hover:bg-beige/60 hover:text-forest",
              )}
            >
              {nameLabels[code]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
