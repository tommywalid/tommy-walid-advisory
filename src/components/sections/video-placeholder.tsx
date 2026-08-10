import { Play } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

/**
 * Reserves the layout for a future personal introduction video (to be shot
 * in a later sprint — see conversation history / product roadmap) rather
 * than compensating for its absence with more text. Honest "coming soon"
 * treatment, not a fake embed.
 */
export function VideoPlaceholder({ label }: { label: string }) {
  return (
    <Reveal className="mx-auto max-w-3xl px-6 lg:px-10">
      <div className="relative flex aspect-video items-center justify-center rounded-2xl border border-dashed border-beige-dark bg-beige/30">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-forest text-gold-light">
            <Play className="ml-0.5 size-5" />
          </span>
          <p className="text-sm text-ink-soft">{label}</p>
        </div>
      </div>
    </Reveal>
  );
}
