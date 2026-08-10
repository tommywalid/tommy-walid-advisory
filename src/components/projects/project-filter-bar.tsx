"use client";

import { useSearchParams } from "next/navigation";

import { useRouter, usePathname } from "@/i18n/navigation";
import { PROPERTY_TYPES, SUGGESTED_BEST_FOR_TAGS } from "@/config/projects";
import { cn } from "@/lib/utils";
import { Select } from "@/components/ui/input";

/**
 * Best For is the primary control (guided, single-select chips) — Property
 * Type and Location are secondary, smaller refinements. Filter state lives
 * in the URL (not component state) so a filtered view is shareable and
 * survives a page reload — see docs/design/projects-information-architecture.md.
 */
export function ProjectFilterBar({
  bestForDict,
  propertyTypeDict,
  locations,
  allLabel,
  propertyTypeLabel,
  locationLabel,
  anyLabel,
}: {
  bestForDict: Record<string, string>;
  propertyTypeDict: Record<string, string>;
  locations: string[];
  allLabel: string;
  propertyTypeLabel: string;
  locationLabel: string;
  anyLabel: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeBestFor = searchParams.get("bestFor") ?? "";
  const activePropertyType = searchParams.get("propertyType") ?? "";
  const activeLocation = searchParams.get("location") ?? "";

  function goTo(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap justify-center gap-2">
        <Chip active={activeBestFor === ""} onClick={() => goTo("bestFor", "")}>
          {allLabel}
        </Chip>
        {SUGGESTED_BEST_FOR_TAGS.map((tag) => (
          <Chip
            key={tag}
            active={activeBestFor === tag}
            onClick={() => goTo("bestFor", tag)}
          >
            {bestForDict[tag] ?? tag}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Select
          value={activePropertyType}
          onChange={(e) => goTo("propertyType", e.target.value)}
          className="w-auto min-w-[10rem]"
        >
          <option value="">{`${propertyTypeLabel}: ${anyLabel}`}</option>
          {PROPERTY_TYPES.map((type) => (
            <option key={type} value={type}>
              {propertyTypeDict[type] ?? type}
            </option>
          ))}
        </Select>

        {locations.length > 0 ? (
          <Select
            value={activeLocation}
            onChange={(e) => goTo("location", e.target.value)}
            className="w-auto min-w-[10rem]"
          >
            <option value="">{`${locationLabel}: ${anyLabel}`}</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>
        ) : null}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-forest bg-forest text-cream"
          : "border-beige-dark bg-white text-ink-soft hover:border-gold",
      )}
    >
      {children}
    </button>
  );
}
