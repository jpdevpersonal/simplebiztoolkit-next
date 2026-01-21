"use client";

import { useState } from "react";
import Image from "next/image";
import "../styles/products.css";

type Product = {
  title: string;
  problem: string;
  bullets: string[];
  image: string;
  etsyUrl: string;
};

export default function ProductGrid({ products }: { products: Product[] }) {
  const [hoveredProduct, setHoveredProduct] = useState<{
    image: string;
    etsyUrl: string;
  } | null>(null);
  const [availableMedium, setAvailableMedium] = useState<
    Record<string, boolean>
  >({});

  const handleImageClick = (
    e: React.MouseEvent,
    image: string,
    etsyUrl: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setHoveredProduct({ image, etsyUrl });
  };

  // Compute medium (resized) image path next to the original.
  const mediumSrc = (src: string) => {
    if (!src) return src;
    const idx = src.lastIndexOf("/");
    const filename = idx > -1 ? src.slice(idx + 1) : src;
    const dot = filename.lastIndexOf(".");
    const base = dot > -1 ? filename.slice(0, dot) : filename;
    const dir = idx > -1 ? src.slice(0, idx + 1) : "";
    return `${dir}${base}-md.webp`;
  };

  // Start loading a medium image first (if present). If it loads, record
  // that the medium variant exists; also start loading the original as fallback.
  const preloadImage = (src: string) => {
    if (!src || typeof window === "undefined") return;
    const md = mediumSrc(src);
    const imgMd = new window.Image();
    imgMd.onload = () => setAvailableMedium((s) => ({ ...s, [src]: true }));
    imgMd.onerror = () => {
      /* medium not present; nothing to do */
    };
    imgMd.src = md;

    // also warm the original image
    const img = new window.Image();
    img.src = src;
  };

  return (
    <>
      <div className="row g-3 mt-2">
        {products.map((p) => (
          <div className="col-md-4" key={p.title}>
            <article className="template-thumbnail sb-card h-100 product-card">
              <div className="overflow-hidden" style={{ width: "100%" }}>
                <div
                  className="product-thumbnail-clickable"
                  style={{
                    aspectRatio: "10/7",
                    width: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={() =>
                    preloadImage(p.image || "/images/placeholder-preview.png")
                  }
                  onClick={(e) => {
                    const src = p.image || "/images/placeholder-preview.png";
                    const md = mediumSrc(src);
                    const finalSrc = availableMedium[src] ? md : src;
                    handleImageClick(e, finalSrc, p.etsyUrl);
                  }}
                >
                  <picture>
                    <Image
                      src={p.image || "/images/placeholder-preview.png"}
                      alt={p.title}
                      className="img-fluid ledger-thumb"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                    />
                  </picture>
                </div>
              </div>
              <div className="product-card-content">
                <h3 className="product-card-title">{p.title}</h3>
                <h3 className="product-card-problem">{p.problem}</h3>
                <ul className="product-card-bullets">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <span className="product-card-cta">
                  <span
                    className="sb-btn-icon"
                    style={{ fontSize: "0.9em", fontWeight: "bold" }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                      }}
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </span>
                  <a
                    href={p.etsyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-card-link"
                  >
                    View on Etsy{" "}
                  </a>
                  <svg
                    width="14"
                    height="14"
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
                </span>
              </div>
            </article>
          </div>
        ))}
      </div>

      {/* Image Preview Overlay */}
      {hoveredProduct && (
        <div
          className="product-image-preview-overlay"
          onClick={() => {
            window.open(
              hoveredProduct.etsyUrl,
              "_blank",
              "noopener,noreferrer",
            );
          }}
          style={{ cursor: "pointer" }}
        >
          <button
            className="product-image-preview-close"
            onClick={(e) => {
              e.stopPropagation();
              setHoveredProduct(null);
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="product-image-preview-content">
            <Image
              src={hoveredProduct.image}
              alt="Product preview"
              width={1000}
              height={700}
              sizes="100vw"
              loading="eager"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
