import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types/testimonials";

export function getAllTestimonials(): Testimonial[] {
  return [...testimonials].sort((a, b) => a.order - b.order);
}

export function getFeaturedTestimonials(): Testimonial[] {
  return getAllTestimonials().filter((t) => t.featured);
}
