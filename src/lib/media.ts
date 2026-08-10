import { mediaLibrary } from "@/data/media";
import type { MediaLibraryItem, LibraryMediaType } from "@/types/media";

export function getAllMedia(): MediaLibraryItem[] {
  return mediaLibrary;
}

export function getMediaByType(type: LibraryMediaType): MediaLibraryItem[] {
  return mediaLibrary.filter((m) => m.type === type);
}

export function getOrphanedMedia(): MediaLibraryItem[] {
  return mediaLibrary.filter((m) => !m.usedIn || m.usedIn.length === 0);
}
