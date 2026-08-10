"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("notFound");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 py-32 text-center">
      <span className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">
        {t("kicker")}
      </span>
      <h1 className="font-heading text-3xl text-forest sm:text-4xl">
        {t("title")}
      </h1>
      <Button onClick={reset} className="mt-2">
        {t("cta")}
      </Button>
    </div>
  );
}
