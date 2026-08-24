"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { navigation } from "@/config/navigation";
import { company } from "@/config/company";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-beige-dark/70 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" aria-label={`${company.name}: ${t("home")}`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "border-b-2 pb-1 text-sm font-medium tracking-wide transition-colors",
                  active ? "border-gold text-forest" : "border-transparent text-ink-soft hover:text-forest",
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <LocaleSwitcher />
          <Button asChild size="sm">
            <a href={company.calendlyUrl} target="_blank" rel="noopener noreferrer">
              {t("bookCall")}
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LocaleSwitcher />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={t("openMenu")}
                className="rounded-full p-2 text-forest hover:bg-beige"
              >
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle>
                <Logo />
              </SheetTitle>
              <nav className="flex flex-col gap-1">
                {navigation.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <SheetClose asChild key={item.key}>
                      <Link
                        href={item.href}
                        className={cn(
                          "rounded-lg border-s-2 px-3 py-3 font-heading text-lg transition-colors",
                          active
                            ? "border-gold bg-beige/60 text-forest"
                            : "border-transparent text-forest hover:bg-beige",
                        )}
                      >
                        {t(item.key)}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
              <SheetClose asChild>
                <Button asChild className="mt-auto">
                  <a href={company.calendlyUrl} target="_blank" rel="noopener noreferrer">
                    {t("bookCall")}
                  </a>
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
