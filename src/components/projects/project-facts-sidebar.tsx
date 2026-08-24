import type { Developer, Project, PropertyType } from "@/types/projects";
import { Link } from "@/i18n/navigation";
import { formatStartingPriceOrPending, factOrPending, localizedText } from "@/lib/projects";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-end font-medium text-forest">{value}</dd>
    </div>
  );
}

/**
 * Sticky on desktop (reuses the pattern proven in the "Why Tommy" section),
 * stacks inline right after the hero on mobile. Facts are clear but
 * deliberately secondary to the advisory narrative above them on the page.
 */
export function ProjectFactsSidebar({
  project,
  developer,
  locale,
  propertyTypeDict,
  labels,
  ctaHref,
  ctaLabel,
}: {
  project: Project;
  developer: Developer | undefined;
  locale: string;
  propertyTypeDict: Record<PropertyType, string>;
  labels: {
    developer: string;
    location: string;
    propertyTypes: string;
    startingPrice: string;
    handover: string;
    paymentPlan: string;
  };
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="lg:sticky lg:top-28 lg:h-fit">
      <Card className="bg-white p-6">
        <dl className="flex flex-col gap-3.5 text-sm">
          <Fact label={labels.developer} value={developer?.name ?? "—"} />
          <Fact label={labels.location} value={project.location} />
          <Fact
            label={labels.propertyTypes}
            value={project.propertyTypes
              .map((type) => propertyTypeDict[type] ?? type)
              .join(", ")}
          />
          <Fact
            label={labels.startingPrice}
            value={formatStartingPriceOrPending(project.startingPrice, locale)}
          />
          <Fact label={labels.handover} value={factOrPending(project.handover)} />
        </dl>

        <Separator className="my-5" />

        <p className="text-sm leading-relaxed text-ink-soft">
          <span className="font-medium text-forest">{labels.paymentPlan}:</span>{" "}
          {localizedText(project.paymentPlan, locale)}
        </p>

        <Button asChild className="mt-6 w-full">
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
      </Card>
    </div>
  );
}
