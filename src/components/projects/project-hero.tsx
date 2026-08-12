import type { Project, MediaType } from "@/types/projects";
import { ProjectGallery } from "@/components/projects/project-gallery";

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
  const images = [cover, ...gallery].filter((asset) => asset.url);

  return (
    <ProjectGallery images={images} alt={project.name} mediaTypeLabels={mediaTypeLabels} />
  );
}
