import { ShieldAlert } from "lucide-react";

/**
 * No auth exists yet (see docs/design/dashboard-information-architecture.md
 * — deferred, depends on the backend). This banner is a deliberate,
 * visible reminder not to deploy /dashboard publicly before that's wired
 * up — not a substitute for actually gating it.
 */
export function Topbar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-beige-dark bg-white px-8">
      <div className="flex items-center gap-2 text-xs font-medium text-gold">
        <ShieldAlert className="size-3.5" />
        No authentication yet. Do not deploy this route publicly.
      </div>
    </header>
  );
}
