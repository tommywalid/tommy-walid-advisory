import { Star } from "lucide-react";

import { getFeaturedProjects } from "@/lib/projects";
import { getFeaturedTestimonials } from "@/lib/testimonials";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";
import { Card } from "@/components/ui/card";

export default function DashboardHomepagePage() {
  const featuredProjects = getFeaturedProjects(10);
  const featuredTestimonials = getFeaturedTestimonials();

  return (
    <>
      <DashboardPageHeader
        title="Homepage"
        description="What's currently curated for the public homepage, a control panel, not a duplicate of the Projects/Testimonials editors."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="bg-white">
          <h2 className="font-heading text-lg text-forest">Featured Projects</h2>
          <p className="mt-1 text-xs text-ink-soft">
            Shown in the homepage &quot;Selected Projects&quot; teaser.
          </p>
          <div className="mt-4">
            {featuredProjects.length === 0 ? (
              <DashboardEmptyState
                title="Nothing featured"
                body="Mark a project as featured from its edit screen once available. The homepage section stays hidden entirely until then, by design."
              />
            ) : (
              <ul className="flex flex-col gap-2">
                {featuredProjects.map((project) => (
                  <li
                    key={project.slug}
                    className="flex items-center gap-2 rounded-lg border border-beige-dark/50 px-3 py-2 text-sm text-forest"
                  >
                    <Star className="size-3.5 fill-gold text-gold" />
                    {project.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>

        <Card className="bg-white">
          <h2 className="font-heading text-lg text-forest">Featured Testimonials</h2>
          <p className="mt-1 text-xs text-ink-soft">
            Shown in the homepage Testimonials section.
          </p>
          <div className="mt-4">
            {featuredTestimonials.length === 0 ? (
              <DashboardEmptyState
                title="Nothing featured"
                body="The public site shows clearly labeled placeholder quotes until real testimonials are added and featured here."
              />
            ) : (
              <ul className="flex flex-col gap-2">
                {featuredTestimonials.map((testimonial) => (
                  <li
                    key={testimonial.id}
                    className="rounded-lg border border-beige-dark/50 px-3 py-2 text-sm text-ink"
                  >
                    “{testimonial.quote.en}”
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}
