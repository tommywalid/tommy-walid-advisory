import { Reveal } from "@/components/motion/reveal";

export function PageHeader({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-beige-dark/60 bg-beige/40">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-28 lg:px-10">
        <Reveal className="flex flex-col items-center gap-5">
          <span className="text-xs font-semibold tracking-[0.28em] text-gold-text uppercase">
            {kicker}
          </span>
          <h1 className="text-balance font-heading text-4xl text-forest sm:text-5xl">
            {title}
          </h1>
          {intro ? (
            <p className="max-w-xl text-balance text-base leading-relaxed text-ink-soft">
              {intro}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
