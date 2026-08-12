import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 py-32 text-center">
      <span className="text-xs font-semibold tracking-[0.28em] text-gold-text uppercase">
        {t("kicker")}
      </span>
      <h1 className="font-heading text-3xl text-forest sm:text-4xl">
        {t("title")}
      </h1>
      <p className="text-ink-soft">{t("description")}</p>
      <Button asChild className="mt-2">
        <Link href="/">{t("cta")}</Link>
      </Button>
    </div>
  );
}
