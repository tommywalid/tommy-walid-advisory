import Image from "next/image";

import type { Project, MediaType } from "@/types/projects";

/**
 * Media is honestly labeled (Photo / Developer Render / Masterplan / Aerial)
 * — official developer renders are legitimate content, the only requirement
 * is never presenting one as a photo of a finished, specific unit.
 */
export function ProjectHero({
  project,
  mediaTypeLabels,
}: {
  project: Project;
  mediaTypeLabels: Record<MediaType, string>;
}) {
  const { cover, gallery } = project.media;

  return (
    <div className="bg-forest">
      <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
        <Image
          src={cover.url}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <span className="absolute top-4 left-4 rounded-full bg-forest/80 px-3 py-1 text-xs font-semibold text-cream backdrop-blur">
          {mediaTypeLabels[cover.type]}
        </span>
      </div>

      {gallery.length > 0 ? (
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-4 lg:px-10">
          {gallery.map((asset, i) => (
            <div
              key={i}
              className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg sm:w-32"
            >
              <Image
                src={asset.url}
                alt=""
                fill
                sizes="128px"
                className="object-cover"
              />
              <span className="absolute right-1 bottom-1 rounded bg-forest/80 px-1.5 py-0.5 text-[10px] text-cream">
                {mediaTypeLabels[asset.type]}
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
