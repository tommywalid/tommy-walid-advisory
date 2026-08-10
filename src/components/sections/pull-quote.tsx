import { Quote } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

export function PullQuote({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <div className="border-b border-beige-dark/60 bg-forest">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-10">
        <Reveal className="flex flex-col items-center gap-6">
          <Quote className="size-7 text-gold" />
          <p className="text-balance font-heading text-2xl leading-snug text-cream sm:text-3xl">
            “{quote}”
          </p>
          <span className="text-xs font-semibold tracking-[0.2em] text-gold-light uppercase">
            {attribution}
          </span>
        </Reveal>
      </div>
    </div>
  );
}
