import { Star } from "lucide-react";

import { getAllTestimonials } from "@/lib/testimonials";
import { DashboardPageHeader } from "@/components/dashboard/page-header";
import { NewItemButton } from "@/components/dashboard/new-item-button";
import { DashboardEmptyState } from "@/components/dashboard/empty-state";

export default function DashboardTestimonialsPage() {
  const testimonials = getAllTestimonials();

  return (
    <>
      <DashboardPageHeader
        title="Testimonials"
        description="The public homepage currently shows labeled placeholder quotes from /messages. Adding real ones here will replace them in a later step."
        action={<NewItemButton label="New Testimonial" />}
      />

      {testimonials.length === 0 ? (
        <DashboardEmptyState
          title="No testimonials yet"
          body="Real client testimonials, once available, are managed here. The homepage placeholder copy stays clearly labeled as such until then."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-beige-dark/60 bg-white p-5"
            >
              <div>
                <p className="text-sm text-ink italic">“{testimonial.quote.en}”</p>
                <p className="mt-2 text-xs text-ink-soft">{testimonial.attribution.en}</p>
              </div>
              {testimonial.featured ? (
                <Star className="size-4 shrink-0 fill-gold text-gold" />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
