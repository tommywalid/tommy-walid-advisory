import { Aperture } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Brand-native placeholder that reserves the exact frame a future photo or
 * video asset will occupy — same solid-forest treatment as the empty state
 * already used for project media (see `MediaCover`), so "media not yet
 * added" reads identically everywhere on the site. No stock imagery, no
 * generated faces, no copy — just the frame. Swap for a real
 * `next/image`/`<video>` in the same slot once the asset is commissioned.
 *
 * Aspect ratio and sizing are the caller's responsibility (pass an
 * `aspect-[…]` utility via `className`) since it differs per section.
 */
export function MediaPlaceholder({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl bg-forest",
        className,
      )}
    >
      <Aperture strokeWidth={1.25} className="size-10 text-gold-light/50 sm:size-12" />
    </div>
  );
}
