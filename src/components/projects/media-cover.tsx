import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Renders a project's cover media, or a branded placeholder when none has
 * been added yet. next/image throws on an empty `src`, and several V1
 * catalog entries genuinely have no media yet (see
 * docs/product/v1-catalog-research-sources.md) — this is the honest "no
 * photo yet" state (brand-native, no stock imagery), not a broken image icon.
 * Currently used only by ProjectCard (16:9 grid thumbnail); `className` lets
 * that caller layer its own hover treatment without this component needing
 * to know about it.
 */
export function MediaCover({
  url,
  alt,
  priority,
  sizes,
  className,
}: {
  url: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
}) {
  if (!url) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-forest">
        <span className="px-6 text-center font-heading text-xs tracking-[0.2em] text-gold-light/60 uppercase">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={url}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  );
}
