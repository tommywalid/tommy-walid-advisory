import { Sparkles } from "lucide-react";

/**
 * Visible marker that a field/entity started as an AI draft — always
 * reviewable, never a substitute for human approval before publish. See
 * AIAssistMeta in src/types/shared.ts.
 */
export function AIBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-semibold text-gold uppercase">
      <Sparkles className="size-3" />
      AI draft
    </span>
  );
}
