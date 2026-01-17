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
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const handleImageClick = (e: React.MouseEvent, image: string) => {
    e.preventDefault();
    e.stopPropagation();
    setHoveredImage(image);
  };

  return (
    <>
      <div className="row g-3 mt-2">
        {products.map((p) => (
          <div className="col-md-4" key={p.title}>
            <a
              href={p.etsyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="product-card-link"
            >
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
                    onClick={(e) => {
                      const src = p.image || "/images/placeholder-preview.png";
                      handleImageClick(e, src);
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
                      />
                    </picture>
                  </div>
                </div>
                <div className="product-card-content">
                  <h3 className="product-card-problem">{p.problem}</h3>
                  <ul className="product-card-bullets">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <span className="product-card-cta">
                    <span className="sb-btn-icon" style={{ fontSize: "0.9em" }}>
                      🛒
                    </span>
                    View on Etsy
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
            </a>
          </div>
        ))}
      </div>

      {/* Image Preview Overlay */}
      {hoveredImage && (
        <div
          className="product-image-preview-overlay"
          onClick={() => setHoveredImage(null)}
        >
          <div className="product-image-preview-content">
            <Image
              src={hoveredImage}
              alt="Product preview"
              width={1200}
              height={840}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
