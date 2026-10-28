import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import { company } from "@/config/company";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Lp1Form } from "../_components/lp1-form";
import { Lp1StickyCta } from "../_components/lp1-sticky-cta";
import { Lp1Consent } from "../_components/lp1-consent";

/**
 * LP1 — standalone landing page (/lp1/fr, /lp1/en, /lp1/ar).
 *
 * All copy comes from /messages under `lp1` (no text in this file); images
 * from /public/images/lp1/. Built only from the site's existing tokens and
 * UI primitives — no new global styles. Not connected to anything: the
 * form is display-only (see _components/lp1-form.tsx), no tracking.
 */
const FORM_ID = "form";

type Item = { title: string; body: string };
type Step = Item & { number: string };
type Qa = { question: string; answer: string };

const bold = (chunks: React.ReactNode) => <b className="font-semibold text-gold-light">{chunks}</b>;

export default async function Lp1Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  setRequestLocale(lang as AppLocale);
  const t = await getTranslations("lp1");

  const truthItems = t.raw("truth.items") as Item[];
  const steps = t.raw("process.steps") as Step[];
  const whyItems = t.raw("why.items") as Item[];
  const faqItems = t.raw("faq.items") as Qa[];
  const year = new Date().getFullYear();

  return (
    <>
      {/* Brand bar */}
      <div className="bg-forest">
        <div className="mx-auto flex max-w-6xl items-center gap-3 border-b border-gold/25 px-6 py-5 lg:px-10">
          <span className="grid size-[42px] place-items-center rounded-full border-[1.5px] border-gold font-heading text-lg font-bold tracking-wide text-gold">
            {t("brand.monogram")}
          </span>
          <span className="leading-tight">
            <strong className="block text-[15px] font-semibold tracking-wide text-cream">
              {t("brand.name")}
            </strong>
            <span className="text-xs text-cream/60">{t("brand.tagline")}</span>
          </span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden bg-forest">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 55% at 82% 8%, rgba(216,189,127,0.14), transparent 60%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-6 pt-14 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-10">
          <div>
            <span className="inline-flex rounded-full border border-gold/40 px-3 py-1.5 text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
              {t("hero.kicker")}
            </span>
            <h1 className="mt-6 text-balance font-heading text-4xl leading-[1.12] text-cream sm:text-5xl">
              {t.rich("hero.title", {
                em: (chunks) => <em className="text-gold not-italic">{chunks}</em>,
              })}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/85">{t("hero.lead")}</p>
            <ul className="mt-7 flex flex-col gap-3">
              {(["b1", "b2", "b3", "b4"] as const).map((key) => (
                <li key={key} className="relative ps-8 text-cream/90">
                  <span aria-hidden className="absolute start-0 top-1 size-[18px] rounded-full bg-gold" />
                  {t.rich(`hero.bullets.${key}`, {
                    strong: (chunks) => <strong className="font-semibold text-gold-light">{chunks}</strong>,
                  })}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-cream/60">
              {(["t1", "t2", "t3"] as const).map((key) => (
                <span key={key}>{t.rich(`hero.trust.${key}`, { b: bold })}</span>
              ))}
            </div>
            <div className="relative mt-8 aspect-[4/5] max-h-[520px] w-full overflow-hidden rounded-2xl border border-gold/25 sm:aspect-[16/10]">
              <Image
                src="/images/lp1/walid.jpg"
                alt={t("hero.photoAlt")}
                fill
                priority
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover object-[50%_22%]"
              />
            </div>
          </div>

          <div
            id={FORM_ID}
            className="scroll-mt-5 rounded-2xl border-t-4 border-gold bg-cream p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] sm:p-7"
          >
            <Lp1Form />
          </div>
        </div>
      </section>

      {/* Brochure vs reality */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="rounded-full border border-gold/40 px-3 py-1.5 text-xs font-semibold tracking-[0.2em] text-gold-text uppercase">
              {t("truth.kicker")}
            </span>
            <h2 className="max-w-3xl text-balance font-heading text-3xl text-forest sm:text-4xl">
              {t("truth.title")}
            </h2>
            <p className="max-w-2xl text-ink-soft">{t("truth.intro")}</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-2">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-beige-dark lg:aspect-auto lg:min-h-[440px]">
              <Image
                src="/images/lp1/analyse-investissement.jpg"
                alt={t("truth.imageAlt")}
                fill
                sizes="(min-width: 1024px) 540px, 100vw"
                className="object-cover object-[50%_70%]"
              />
              <figcaption className="absolute start-4 top-4">
                <span className="rounded-full border border-gold/30 bg-forest/85 px-3 py-1.5 text-xs tracking-[0.15em] text-gold-light uppercase">
                  {t("truth.caption")}
                </span>
              </figcaption>
            </figure>

            <div className="flex flex-col rounded-2xl border-t-4 border-gold bg-white p-7">
              <h3 className="font-heading text-2xl text-forest">{t("truth.listTitle")}</h3>
              <ul className="mt-5 mb-6 flex flex-col gap-4">
                {truthItems.map((item, i) => (
                  <li key={i} className="relative ps-9 text-sm leading-relaxed text-ink-soft">
                    <span aria-hidden className="absolute start-0 top-0.5 size-[22px] rounded-md bg-forest" />
                    <b className="block text-[15px] font-semibold text-forest">{item.title}</b>
                    {item.body}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-auto">
                <a href={`#${FORM_ID}`}>{t("truth.cta")}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-cream pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-heading text-3xl text-forest sm:text-4xl">{t("process.title")}</h2>
            <p className="max-w-2xl text-ink-soft">{t("process.intro")}</p>
          </div>
          <figure className="relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl border border-beige-dark sm:aspect-[21/8]">
            <Image
              src="/images/lp1/rendez-vous-conseil.jpg"
              alt={t("process.imageAlt")}
              fill
              sizes="(min-width: 1152px) 1056px, 100vw"
              className="object-cover object-[50%_42%]"
            />
          </figure>
          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="rounded-2xl border border-beige-dark/60 bg-white p-7">
                <div className="font-heading text-4xl leading-none text-gold">{step.number}</div>
                <h3 className="mt-3 font-heading text-xl text-forest">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Dubai */}
      <section className="bg-beige/50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-heading text-3xl text-forest sm:text-4xl">{t("why.title")}</h2>
            <p className="max-w-2xl text-ink-soft">{t("why.intro")}</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {whyItems.map((item, i) => (
              <div key={i} className="rounded-2xl border border-beige-dark/60 bg-white p-7">
                <h3 className="font-heading text-xl text-forest">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-[280px_1fr] md:gap-12 lg:px-10">
          <div className="relative aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-2xl border border-beige-dark">
            <Image
              src="/images/lp1/walid.jpg"
              alt={t("about.photoAlt")}
              fill
              sizes="280px"
              className="object-cover object-[50%_15%]"
            />
          </div>
          <div>
            <p className="text-sm tracking-[0.12em] text-gold-text uppercase">{t("about.role")}</p>
            <h2 className="mt-2 font-heading text-3xl text-forest sm:text-4xl">{t("about.name")}</h2>
            <p className="mt-4 leading-relaxed text-ink">{t("about.p1")}</p>
            <p className="mt-3 leading-relaxed text-ink">{t("about.p2")}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-beige/50 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 className="text-center font-heading text-3xl text-forest sm:text-4xl">{t("faq.title")}</h2>
          <Accordion
            type="single"
            collapsible
            className="mt-10 rounded-2xl border border-beige-dark/70 bg-white px-6"
          >
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-forest py-20 text-center sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <h2 className="font-heading text-3xl text-cream sm:text-4xl">{t("cta.title")}</h2>
          <p className="mt-4 text-cream/70">{t("cta.intro")}</p>
          <Button asChild variant="gold" size="lg" className="mt-8">
            <a href={`#${FORM_ID}`}>{t("cta.button")}</a>
          </Button>
        </div>
      </section>

      {/* Legal */}
      <footer className="border-t border-cream/10 bg-forest pt-8 pb-28 text-xs text-cream/55 lg:pb-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-1.5 px-6 lg:px-10">
          <p>{t.rich("legal.agency", { b: (chunks) => <b className="font-semibold text-cream/85">{chunks}</b> })}</p>
          <p>{t("legal.registration")}</p>
          <p>{t("legal.disclaimer")}</p>
          <p>
            {t.rich("legal.copyright", {
              year,
              link: (chunks) => (
                <a href={company.url} className="text-gold-light hover:text-cream">
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </footer>

      <Lp1StickyCta label={t("sticky.cta")} targetId={FORM_ID} />
      <Lp1Consent pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ""} />
    </>
  );
}
