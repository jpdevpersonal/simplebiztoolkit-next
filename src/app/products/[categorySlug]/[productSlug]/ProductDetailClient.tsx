"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types/product";
import "@/styles/products.css";

type Props = {
  product: Product;
};

export default function ProductDetailClient({ product }: Props) {
  const [showPreview, setShowPreview] = useState(false);

  // Compute medium (resized) image path
  const mediumSrc = (src: string) => {
    if (!src) return src;
    const idx = src.lastIndexOf("/");
    const filename = idx > -1 ? src.slice(idx + 1) : src;
    const dot = filename.lastIndexOf(".");
    const base = dot > -1 ? filename.slice(0, dot) : filename;
    const dir = idx > -1 ? src.slice(0, idx + 1) : "";
    return `${dir}${base}-md.webp`;
  };

  // Preload medium image
  const preloadImage = (src: string) => {
    if (!src || typeof window === "undefined") return;
    const md = mediumSrc(src);
    const imgMd = new window.Image();
    imgMd.onerror = () => {};
    imgMd.src = md;

    const img = new window.Image();
    img.src = src;
  };

  return (
    <>
      {/* Two Column Layout */}
      <div className="product-detail-layout">
        {/* Mobile-only title shown above the image on small screens */}
        <h1 className="product-detail-title product-detail-title--mobile">
          {product.title}
        </h1>

        {/* Left Column - Image */}
        <div className="product-detail-image-container">
          <div
            className="product-detail-image-wrapper"
            onMouseEnter={() =>
              preloadImage(product.image || "/images/placeholder-preview.png")
            }
          >
            <Image
              src={product.image || "/images/placeholder-preview.png"}
              alt={product.title}
              width={800}
              height={560}
              className="product-detail-image"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {/* Trust badge on image
            <div className="product-detail-badge">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Instant Download
            </div> */}
          </div>
        </div>

        {/* Right Column - Description */}
        <div className="product-detail-content">
          <div className="product-detail-header">
            <h1 className="product-detail-title">{product.title}</h1>

            {/* Price and Primary CTA Row (mobile optimized) */}
            <div className="product-detail-price-cta-row">
              <div className="product-detail-price-wrapper">
                <span className="product-detail-price">{product.price}</span>
              </div>
              <a
                href={product.etsyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn sb-btn-primary product-detail-cta-btn product-detail-cta-btn--primary"
              >
                <span>Get It Now</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 12L12 4M12 4H5M12 4v7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="product-detail-trust">
              <div className="product-detail-trust-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Secure checkout</span>
              </div>
              <div className="product-detail-trust-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Instant download</span>
              </div>
              <div className="product-detail-trust-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>Available 24/7</span>
              </div>
            </div>
          </div>

          <div className="product-detail-problem">
            <h2>What You'll Get</h2>
            <p>{product.description || product.problem}</p>
          </div>

          <div className="product-detail-features">
            <h2>What's Included</h2>
            <ul>
              {product.bullets.map((bullet, index) => (
                <li key={index}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feature-check-icon"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary CTA - Desktop only, less prominent */}
          <div className="product-detail-cta product-detail-cta--secondary">
            <a
              href={product.etsyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn sb-btn-primary product-detail-cta-btn"
            >
              <span>Get Instant Access</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 12L12 4M12 4H5M12 4v7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <p className="product-detail-cta-note">
              ✓ Secure payment via Etsy • Digital download available immediately
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="product-detail-sticky-cta">
        <div className="product-detail-sticky-cta-content">
          <div className="product-detail-sticky-price">
            <span className="product-detail-sticky-price-label">Price:</span>
            <span className="product-detail-sticky-price-value">
              {product.price}
            </span>
          </div>
          <a
            href={product.etsyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn sb-btn-primary product-detail-sticky-cta-btn"
          >
            Get It Now
          </a>
        </div>
      </div>

      {/* Image Preview Overlay */}
      {showPreview && (
        <div
          className="product-image-preview-overlay"
          onClick={() => {
            window.open(product.etsyUrl, "_blank", "noopener,noreferrer");
          }}
          style={{ cursor: "pointer" }}
        >
          <button
            className="product-image-preview-close"
            onClick={(e) => {
              e.stopPropagation();
              setShowPreview(false);
            }}
            aria-label="Close preview"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
