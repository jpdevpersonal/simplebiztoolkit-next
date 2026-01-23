/// <reference types="@testing-library/jest-dom" />

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductGrid from "./ProductGrid";

// Mock CSS import
vi.mock("../styles/products.css", () => ({}));

const mockProducts = [
  {
    title: "Test Product 1",
    problem: "This is a test problem",
    bullets: ["Feature 1", "Feature 2", "Feature 3"],
    image: "/images/test-product-1.webp",
    etsyUrl: "https://etsy.com/listing/1",
    productPageUrl: "/products/test-category/test-product-1",
    price: "$10.00",
  },
  {
    title: "Test Product 2",
    problem: "Another test problem",
    bullets: ["Benefit 1", "Benefit 2"],
    image: "/images/test-product-2.webp",
    etsyUrl: "https://etsy.com/listing/2",
    productPageUrl: "/products/test-category/test-product-2",
    price: "$20.00",
  },
  {
    title: "Test Product 3",
    problem: "Third test problem",
    bullets: ["Point 1", "Point 2", "Point 3"],
    image: "/images/test-product-3.webp",
    etsyUrl: "https://etsy.com/listing/3",
    productPageUrl: "/products/test-category/test-product-3",
    price: "$15.00",
  },
];

describe("ProductGrid", () => {
  describe("Product Display", () => {
    it("should render all products", () => {
      render(<ProductGrid products={mockProducts} />);
    });

    it("should display product images", () => {
      render(<ProductGrid products={mockProducts} />);

      const images = screen.getAllByRole("img");

      // Should have 3 product images
      expect(images.length).toBe(3);
      expect(images[0]).toHaveAttribute("src", "/images/test-product-1.webp");
      expect(images[0]).toHaveAttribute("alt", "Test Product 1");
    });

    it("should display product problems", () => {
      render(<ProductGrid products={mockProducts} />);

      expect(screen.getByText("This is a test problem")).toBeInTheDocument();
      expect(screen.getByText("Another test problem")).toBeInTheDocument();
      expect(screen.getByText("Third test problem")).toBeInTheDocument();
    });

    it("should display product bullets", () => {
      render(<ProductGrid products={mockProducts} />);

      expect(screen.getByText("Feature 1")).toBeInTheDocument();
      expect(screen.getByText("Feature 2")).toBeInTheDocument();
      expect(screen.getByText("Benefit 1")).toBeInTheDocument();
    });

    it("should render Etsy links for all products", () => {
      render(<ProductGrid products={mockProducts} />);

      // The CTA "View on Etsy" anchors should link to Etsy
      const ctaAnchors = screen
        .getAllByText(/View on Etsy/i)
        .map((el) => el.closest("a"));
      expect(ctaAnchors.length).toBe(3);
      expect(ctaAnchors[0]).toHaveAttribute(
        "href",
        "https://etsy.com/listing/1",
      );
      expect(ctaAnchors[0]).toHaveAttribute("target", "_blank");
      expect(ctaAnchors[0]).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should render product page links for each product thumbnail", () => {
      render(<ProductGrid products={mockProducts} />);

      // Find anchors by role and match hrefs to productPageUrl
      const allLinks = screen.getAllByRole("link");
      const pageLinks = allLinks.filter((l) =>
        mockProducts.some((p) => l.getAttribute("href") === p.productPageUrl),
      );
      expect(pageLinks.length).toBe(3);
      expect(pageLinks[0]).toHaveAttribute(
        "href",
        "/products/test-category/test-product-1",
      );
    });

    it("should display 'View on Etsy' call-to-action text", () => {
      render(<ProductGrid products={mockProducts} />);

      // The CTA text should appear for each product
      const ctaTexts = screen.getAllByText(/View on Etsy/i);
      expect(ctaTexts.length).toBe(3);
    });
  });

  describe("Thumbnail behavior", () => {
    it("should not render a preview overlay when not implemented", () => {
      render(<ProductGrid products={mockProducts} />);
      const overlay = screen.queryByTestId("product-image-preview-overlay");
      expect(overlay).not.toBeInTheDocument();
    });

    it("should have clickable cursor styling on product thumbnails", () => {
      render(<ProductGrid products={mockProducts} />);

      const images = screen.getAllByRole("img");
      const firstImageContainer = images[0].closest(
        ".product-thumbnail-clickable",
      );

      expect(firstImageContainer).toHaveClass("product-thumbnail-clickable");
    });
  });

  describe("Responsive Behavior", () => {
    it("should render in a responsive grid", () => {
      const { container } = render(<ProductGrid products={mockProducts} />);

      const gridRow = container.querySelector(".row.g-3");
      expect(gridRow).toBeInTheDocument();

      const gridCols = container.querySelectorAll(".col-md-4");
      expect(gridCols.length).toBe(3);
    });
  });

  describe("Empty State", () => {
    it("should handle empty products array", () => {
      render(<ProductGrid products={[]} />);

      const images = screen.queryAllByRole("img");
      expect(images.length).toBe(0);
    });
  });
});
