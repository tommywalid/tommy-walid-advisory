import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { company } from "@/config/company";
import { Link } from "@/i18n/navigation";

type Category = { title: string; items: string[] };

/**
 * Homepage-only summary of the services: Tommy's photo on the left, the
 * page title and 4 service categories on the right — each category links
 * to /services, where the full 12-step interactive diagram
 * (services-radial.tsx) lives untouched. Layout deliberately mirrors
 * WhyTommy's photo-left/numbered-list-right pattern (same grid ratio,
 * spacing, and typography) rather than introducing a new visual language.
 */
export async function ServicesSummary({ id }: { id?: string }) {
  const t = await getTranslations("home.servicesRadial");
  const categories = t.raw("categories") as Category[];

  return (
    <section id={id} className="scroll-mt-24 bg-beige/50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-16">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-forest lg:aspect-auto">
            <Image
              src="/images/services/tommy.jpg"
              alt={company.name}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              /* Source frame is square; on the wide desktop crop (image
                 stretched to the row's full height) a dead-center position
                 pins Tommy hard against the left edge with a lot of empty
                 ceiling above him. Shifting the anchor keeps him centered
                 and fully clear of the neighbouring figure at every
                 breakpoint — same photo, same aspect ratio, just a better
                 crop of it. */
              className="object-cover object-[42%_50%]"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-balance font-heading text-3xl text-forest sm:text-4xl">{t("title")}</h2>

            <div className="mt-8 flex flex-col">
              {categories.map((category, i) => (
                <Link
                  key={category.title}
                  href="/services"
                  className="group flex gap-6 border-t border-beige-dark py-6 first:border-t-0 first:pt-0 sm:gap-10"
                >
                  <span className="shrink-0 font-heading text-3xl text-beige-dark transition-colors group-hover:text-gold-text">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl text-forest transition-colors group-hover:text-gold-text sm:text-2xl">
                      {category.title}
                    </h3>
                    <ul className="mt-2 flex flex-col gap-1 text-sm leading-relaxed text-ink-soft">
                      {category.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
