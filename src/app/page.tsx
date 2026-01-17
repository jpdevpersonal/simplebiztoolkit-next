import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import JsonLd from "@/components/JsonLd";
import TrustBar from "@/components/TrustBar";
import EmailCaptureForm from "@/components/EmailCaptureForm";
import TestimonialGrid from "@/components/TestimonialGrid";
import ProductGrid from "@/components/ProductGrid";
import { featuredProducts } from "@/data/featured";
import { links } from "@/config/links";

export const metadata: Metadata = {
  title: "Essential Templates & Tools for Small Business Owners",
  description:
    "Trust-first templates and toolkits that save time and reduce admin. Get a free starter template, then shop securely on Etsy.",
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "Simple Biz Toolkit | Essential Templates & Tools for Small Business Owners",
    description:
      "Trust-first templates and toolkits that save time and reduce admin. Get a free starter template, then shop securely on Etsy.",
    url: "/",
  },
};

export default function HomePage() {
  const trust = [
    "4.8★ Etsy rating",
    "Etsy Star Seller!",
    "Secure checkout via Etsy",
    "Over 3500 sales",
  ];

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Simple Biz Toolkit",
    url: "https://simplebiztoolkit.com",
    sameAs: [links.etsyShopUrl],
  };

  return (
    <>
      <JsonLd json={orgJsonLd} />

      <section className="sb-hero">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <h1 className="sb-hero-title">
                Essential templates & tools for small business owners
              </h1>
              <div className="row">
                <p className="sb-muted fs-5">
                  Simple, ready-to-use downloads that reduce admin, keep you
                  organised, and don’t require tech skills.
                </p>
              </div>

              <div className="d-flex gap-2 flex-wrap mt-3">
                <Link href="/products" className="btn sb-btn-primary">
                  Browse All Products
                  <svg
                    className="sb-btn-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>

              <div className="mt-4">
                <TrustBar items={trust} />
              </div>

              <blockquote
                className="sb-card p-3 mt-4"
                style={{ borderLeft: "3px solid var(--sb-brand-blue)" }}
              >
                <p
                  className="mb-1"
                  style={{ fontWeight: 600, fontStyle: "italic" }}
                >
                  "Perfect, saved me a lot of time."
                </p>
                <cite
                  className="sb-muted"
                  style={{ fontSize: "0.8125rem", fontStyle: "normal" }}
                >
                  — Verified Etsy buyer
                </cite>
              </blockquote>
            </div>

            <div className="col-lg-6">
              <div className="hero-image-wrapper d-flex justify-content-center">
                <Image
                  src="/images/hero-image-desk.png"
                  alt="Tools for your small business"
                  className="img-fluid hero-image"
                  width={720}
                  height={480}
                  priority
                />
              </div>
            </div>
          </div>

          <div className="sb-section pt-5 pb-0">
            <h2
              className="text-center"
              style={{ fontWeight: 700, marginBottom: "0.5rem" }}
            >
              What the templates look like
            </h2>
            <p className="text-center sb-muted mb-4">
              Tap any image to zoom in, or click to view on Etsy
            </p>

            <ProductGrid products={featuredProducts} />
          </div>
        </div>
      </section>

      <section className="sb-section sb-section-alt">
        <div className="container">
          <div className="text-center mb-4">
            <h2 style={{ fontWeight: 700 }}>Designed to be simple</h2>
            <p className="sb-muted">
              Clear layouts, printable formats, and essential categories.
            </p>
          </div>

          <div className="row g-3">
            <div className="col-md-4 sb-animate-fade-in-delay-1">
              <div className="sb-value-card">
                <h3
                  style={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  Essential templates
                </h3>
                <p className="sb-muted mb-0" style={{ fontSize: "0.9375rem" }}>
                  Tracking, planning, and admin — without overcomplication.
                </p>
              </div>
            </div>
            <div className="col-md-4 sb-animate-fade-in-delay-2">
              <div className="sb-value-card">
                <h3
                  style={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  Simple systems
                </h3>
                <p className="sb-muted mb-0" style={{ fontSize: "0.9375rem" }}>
                  Repeatable formats that keep you consistent.
                </p>
              </div>
            </div>
            <div className="col-md-4 sb-animate-fade-in-delay-3">
              <div className="sb-value-card">
                <h3
                  style={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  Real-world use
                </h3>
                <p className="sb-muted mb-0" style={{ fontSize: "0.9375rem" }}>
                  Made for small business owners, solo operators, and online
                  sellers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sb-section">
        <div className="container">
          <div className="d-flex align-items-end justify-content-between flex-wrap gap-2 mb-3">
            <div>
              <h2 style={{ fontWeight: 700 }}>What customers say</h2>
              <p className="sb-muted mb-0">Real feedback from Etsy buyers.</p>
            </div>
            <Link className="btn sb-btn-ghost" href="/testimonials">
              Read more reviews
            </Link>
          </div>
          <TestimonialGrid />

          <div className="text-center mt-4">
            <a
              className="btn sb-btn-primary"
              href={links.etsyShopUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sb-btn-icon">🛒</span>
              Browse the full shop on Etsy
              <svg
                className="sb-btn-arrow"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 12L12 4M12 4H6M12 4v6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <section className="sb-section sb-section-alt">
        <div className="container">
          <div className="sb-lead-magnet-card sb-card p-4">
            <div className="row align-items-center g-4">
              <div className="col-lg-6">
                <h2 style={{ fontWeight: 700 }}>Get your free guide</h2>
                <p className="sb-muted mb-3">
                  Try before you buy — a practical template you can use today.
                </p>
                <ul
                  className="sb-muted mb-0"
                  style={{ paddingLeft: 0, listStyle: "none" }}
                >
                  <li style={{ marginBottom: "0.5rem" }}>
                    ✅ Instant download link via email
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    ✅ No spam — just helpful tips & new releases
                  </li>
                  <li>✅ Occasional subscriber-only discounts</li>
                </ul>
              </div>
              <div className="col-lg-6">
                <EmailCaptureForm source="home-lead-magnet" />
                <div className="sb-muted mt-2" style={{ fontSize: 13 }}>
                  By subscribing you agree to receive emails. Unsubscribe
                  anytime.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
