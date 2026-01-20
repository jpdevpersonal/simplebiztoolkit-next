import Link from "next/link";
import { links } from "@/config/links";
import "@/styles/articleStyle.css";

interface ArticleCTAProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  showEtsyLink?: boolean;
  showHomeLink?: boolean;
  disclosure?: string;
}

export function ArticleCTA({
  title = "Ready to get started?",
  description = "Get your free guide, then shop securely on Etsy when you're ready.",
  primaryLabel = "",
  primaryHref = "https://www.etsy.com/shop/simplebiztoolkit",
  showEtsyLink = false,
  showHomeLink = false,
  disclosure,
}: ArticleCTAProps) {
  return (
    <section className="article-cta">
      <h2>{title}</h2>
      <p className="article-cta-description">{description}</p>

      <div className="article-cta-buttons">
        {primaryLabel && primaryHref && (
          <Link
            href={primaryHref}
            className="article-cta-btn article-cta-btn-primary"
          >
            {primaryLabel}
          </Link>
        )}
        {showHomeLink && (
          <Link
            href="/products"
            className="article-cta-btn article-cta-btn-secondary"
          >
            See all products
          </Link>
        )}

        {showEtsyLink && (
          <a
            href={links.etsyShopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="article-cta-btn article-cta-btn-secondary"
          >
            Shop on Etsy
          </a>
        )}
      </div>

      {disclosure && <p className="article-cta-disclosure">{disclosure}</p>}
    </section>
  );
}
