import Seo from "../components/Seo";
import TestimonialGrid from "../components/TestimonialGrid";
import { links } from "../config/links";

export default function TestimonialsPage() {
  return (
    <>
      <Seo
        title="Reviews | Simple Biz Toolkit"
        description="Real customer feedback (placeholder). Social proof builds trust and improves conversions."
        canonicalPath="/testimonials"
      />

      <section className="sb-section">
        <div className="container">
          <h1 style={{ fontWeight: 900 }}>Reviews</h1>
          <p className="sb-muted">
            Put your best Etsy quotes here (real ones). Testimonials near CTAs
            increase conversions. :contentReference[oaicite:19]
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
    </>
  );
}
