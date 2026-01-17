import type { Metadata } from "next";

import TestimonialGrid from "@/components/TestimonialGrid";
import { links } from "@/config/links";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Real customer feedback. Social proof builds trust and improves conversions.",
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: "Reviews | Simple Biz Toolkit",
    description:
      "Real customer feedback. Social proof builds trust and improves conversions.",
    url: "/testimonials",
  },
};

export default function TestimonialsPage() {
  return (
    <section className="sb-section">
      <div className="container">
        <h1 style={{ fontWeight: 900 }}>Reviews</h1>
        <p className="sb-muted">
          Social proof builds trust and helps visitors feel confident.
        </p>

        <TestimonialGrid />

        <div className="text-center mt-4">
          <a
            className="btn sb-btn-primary"
            href={links.etsyShopUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop on Etsy
          </a>
        </div>
      </div>
    </section>
  );
}
