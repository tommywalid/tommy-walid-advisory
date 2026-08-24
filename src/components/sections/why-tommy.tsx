import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { company } from "@/config/company";

export async function WhyTommy({ id }: { id?: string }) {
  const t = await getTranslations("home.whyTommy");
  const items = t.raw("items") as { question: string }[];

  return (
    <section id={id} className="bg-cream py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-16">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-forest lg:aspect-auto">
            <Image
              src="/images/why-tommy/portrait.jpg"
              alt={company.name}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="max-w-xl text-balance font-heading text-3xl text-forest sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-xl text-balance leading-relaxed text-ink-soft">
              {t("subtitle")}
            </p>

            <div className="mt-10 flex flex-col">
              {items.map((item, i) => (
                <div
                  key={item.question}
                  className="flex gap-6 border-t border-beige-dark py-6 first:border-t-0 first:pt-0 sm:gap-10"
                >
                  <span className="shrink-0 font-heading text-3xl text-beige-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-xl text-forest sm:text-2xl">
                    {item.question}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
