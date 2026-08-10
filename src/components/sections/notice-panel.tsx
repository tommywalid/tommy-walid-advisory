import { Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";

export function NoticePanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10">
      <Reveal className="flex items-start gap-4 rounded-2xl border border-dashed border-beige-dark bg-beige/30 p-8">
        <Sparkles className="mt-1 size-5 shrink-0 text-gold" />
        <p className="text-balance leading-relaxed text-ink-soft">{children}</p>
      </Reveal>
    </div>
  );
}
