"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import type { MediaAsset, MediaType } from "@/types/projects";
import { cn } from "@/lib/utils";

/**
 * Interactive viewer for a project's cover + gallery images. Unlike a fixed
 * aspect-ratio crop, the main viewer letterboxes each photo at its own
 * native proportions (`object-contain` inside a fixed-height stage) — a
 * portrait render and a landscape one both show in full, uncropped and
 * undistorted, rather than being force-fit into one ratio. Arrows and
 * thumbnails move between photos; this is a client component only because
 * that navigation needs state.
 */
export function ProjectGallery({
  images,
  alt,
  mediaTypeLabels,
}: {
  images: MediaAsset[];
  alt: string;
  mediaTypeLabels: Record<MediaType, string>;
}) {
  const t = useTranslations("projects.gallery");
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        <div className="absolute inset-0 flex items-center justify-center bg-forest">
          <span className="px-6 text-center font-heading text-xs tracking-[0.2em] text-gold-light/60 uppercase">
            {alt}
          </span>
        </div>
      </div>
    );
  }

  const active = images[activeIndex]!;
  const hasMultiple = images.length > 1;

  function goTo(index: number) {
    setActiveIndex(((index % images.length) + images.length) % images.length);
  }

  return (
    <div className="bg-forest">
      <div
        className="relative h-[320px] w-full sm:h-[440px] lg:h-[560px]"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") goTo(activeIndex - 1);
          if (e.key === "ArrowRight") goTo(activeIndex + 1);
        }}
      >
        {/*
          All images are mounted at once (stacked, toggled via opacity)
          rather than swapping `src` on a single <Image> — swapping caused
          a blank flash on every navigation while the new image re-fetched.
          Loading every photo up front trades a slightly heavier initial
          load for instant, flicker-free arrow/thumbnail navigation.
        */}
        {images.map((asset, i) => (
          <Image
            key={asset.url}
            src={asset.url}
            alt={alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              "object-contain transition-opacity duration-200",
              i === activeIndex ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          />
        ))}

        <span className="absolute top-4 left-4 rounded-full bg-forest/80 px-3 py-1 text-xs font-semibold text-cream backdrop-blur">
          {mediaTypeLabels[active.type]}
        </span>

        {hasMultiple ? (
          <>
            <button
              type="button"
              aria-label={t("previous")}
              onClick={() => goTo(activeIndex - 1)}
              className="absolute top-1/2 left-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-forest/70 text-cream backdrop-blur transition-colors hover:bg-forest/90 sm:left-5 sm:size-12"
            >
              <ChevronLeft className="size-5 sm:size-6" />
            </button>
            <button
              type="button"
              aria-label={t("next")}
              onClick={() => goTo(activeIndex + 1)}
              className="absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-forest/70 text-cream backdrop-blur transition-colors hover:bg-forest/90 sm:right-5 sm:size-12"
            >
              <ChevronRight className="size-5 sm:size-6" />
            </button>

            <span className="absolute right-4 bottom-4 rounded-full bg-forest/80 px-3 py-1 text-xs font-medium text-cream backdrop-blur">
              {activeIndex + 1} / {images.length}
            </span>
          </>
        ) : null}
      </div>

      {hasMultiple ? (
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-4 lg:px-10">
          {images.map((asset, i) => (
            <button
              key={asset.url}
              type="button"
              aria-label={t("viewPhoto", { number: i + 1 })}
              aria-current={i === activeIndex}
              onClick={() => goTo(i)}
              className={cn(
                "relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg ring-2 ring-offset-2 ring-offset-forest transition-colors sm:w-32",
                i === activeIndex ? "ring-gold" : "ring-transparent hover:ring-cream/30",
              )}
            >
              <Image src={asset.url} alt="" fill sizes="128px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
