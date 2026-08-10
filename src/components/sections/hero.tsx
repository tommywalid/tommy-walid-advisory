import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { HeroMotion, HeroMotionItem } from "@/components/motion/hero-motion";

export async function Hero() {
  const t = await getTranslations("home.hero");

  return (
    <section className="relative overflow-hidden bg-forest">
      {/* Abstract geometric backdrop — no stock imagery, brand-native pattern only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.9]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 55% at 82% 8%, rgba(216,189,127,0.16), transparent 60%), radial-gradient(ellipse 45% 40% at 8% 95%, rgba(216,189,127,0.08), transparent 65%)",
        }}
      />
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[46%] opacity-[0.14] lg:block"
        viewBox="0 0 400 800"
        fill="none"
        preserveAspectRatio="xMaxYMid slice"
      >
        <g stroke="#D8BD7F" strokeWidth="1">
          <rect x="60" y="420" width="34" height="260" />
          <rect x="110" y="340" width="34" height="340" />
          <rect x="160" y="220" width="30" height="460" />
          <polygon points="205,680 220,60 235,680" />
          <rect x="260" y="380" width="34" height="300" />
          <rect x="312" y="300" width="30" height="380" />
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1="40" x2="380" y1={60 + i * 50} y2={60 + i * 50} strokeOpacity="0.25" />
          ))}
        </g>
      </svg>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 pt-28 pb-24 sm:pt-36 sm:pb-32 lg:px-10">
        <HeroMotion>
          <HeroMotionItem>
            <span className="inline-flex items-center rounded-full border border-gold/40 px-4 py-1.5 text-xs font-semibold tracking-[0.24em] text-gold-light uppercase">
              {t("kicker")}
            </span>
          </HeroMotionItem>

          <HeroMotionItem className="mt-7 max-w-3xl text-balance font-heading text-4xl leading-[1.08] text-cream sm:text-5xl lg:text-6xl">
            {t("title")}
          </HeroMotionItem>

          <HeroMotionItem className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-cream/75">
            {t("subtitle")}
          </HeroMotionItem>

          <HeroMotionItem className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild variant="gold" size="lg">
              <Link href="/contact">{t("ctaPrimary")}</Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <a href="#process">{t("ctaSecondary")}</a>
            </Button>
          </HeroMotionItem>
        </HeroMotion>
      </div>
    </section>
  );
}
