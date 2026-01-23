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
  // const [availableMedium, setAvailableMedium] = useState<
  //   Record<string, boolean>
  // >({});

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
    // imgMd.onload = () => setAvailableMedium((s) => ({ ...s, [src]: true }));
    imgMd.onerror = () => {};
    imgMd.src = md;

    const img = new window.Image();
    img.src = src;
  };

  // const handleImageClick = () => {
  //   const src = product.image || "/images/placeholder-preview.png";
  //   preloadImage(src);
  //   setShowPreview(true);
  // };

  // const getPreviewImage = () => {
  //   const src = product.image || "/images/placeholder-preview.png";
  //   const md = mediumSrc(src);
  //   return availableMedium[src] ? md : src;
  // };

  return (
    <>
      {/* Two Column Layout */}
      <div className="product-detail-layout">
        {/* Left Column - Image */}
        <div className="product-detail-image-container">
          <div
            className="product-detail-image-wrapper"
            // onClick={handleImageClick}
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
          </div>
        </div>

        {/* Right Column - Description */}
        <div className="product-detail-content">
          <h1 className="product-detail-title">{product.title}</h1>

          <p className="product-detail-price">{product.price}</p>

          <div className="product-detail-problem">
            <h2>Description</h2>
            <p>{product.description || product.problem}</p>
          </div>

          <div className="product-detail-features">
            <h2>Key Features</h2>
            <ul>
              {product.bullets.map((bullet, index) => (
                <li key={index}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
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

          {/* CTA Button */}
          <div className="product-detail-cta">
            <a
              href={product.etsyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn sb-btn-primary product-detail-cta-btn"
            >
              Buy on Etsy
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
              Secure checkout on Etsy with confidence
            </p>
          </div>
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
          {/* <div className="product-image-preview-content">
            <Image
              src={getPreviewImage()}
              alt="Product preview"
              width={1000}
              height={700}
              sizes="100vw"
              loading="eager"
              style={{ width: "100%", height: "auto" }}
            />
          </div> */}
        </div>
      )}
    </>
  );
}
