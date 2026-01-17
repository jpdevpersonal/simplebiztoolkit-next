import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

/**
 * Mock all external dependencies
 * This isolates the HomePage component for unit testing
 */

// Mock react-router-dom Link component
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Link: ({
      to,
      children,
      className,
    }: {
      to: string;
      children: React.ReactNode;
      className?: string;
    }) => (
      <a href={to} className={className}>
        {children}
      </a>
    ),
  };
});

// Mock all child components to test HomePage in isolation
vi.mock("../../components/Seo", () => ({
  default: ({
    title,
    description,
    canonicalPath,
    jsonLd,
  }: {
    title: string;
    description: string;
    canonicalPath: string;
    jsonLd: Record<string, unknown>;
  }) => (
    <div
      data-testid="seo-component"
      data-title={title}
      data-description={description}
      data-canonical={canonicalPath}
      data-jsonld={JSON.stringify(jsonLd)}
    />
  ),
}));

vi.mock("../../components/TrustBar", () => ({
  default: ({ items }: { items: string[] }) => (
    <div data-testid="trust-bar">
      {items?.map((item: string, i: number) => (
        <span key={i} data-testid={`trust-item-${i}`}>
          {item}
        </span>
      ))}
    </div>
  ),
}));

vi.mock("../../components/EmailCaptureForm", () => ({
  default: ({ source }: { source: string }) => (
    <div data-testid="email-capture-form" data-source={source}>
      Email Capture Form
    </div>
  ),
}));

vi.mock("../../components/TestimonialGrid", () => ({
  default: () => <div data-testid="testimonial-grid">Testimonial Grid</div>,
}));

vi.mock("../../components/ProductGrid", () => ({
  default: ({ products }: { products: unknown[] }) => (
    <div data-testid="product-grid" data-product-count={products?.length || 0}>
      Product Grid - {products?.length} products
    </div>
  ),
}));

// Mock the featured products data
vi.mock("../../data/featured", () => ({
  featuredProducts: [
    {
      title: "Featured Product 1",
      price: "$10",
      etsyUrl: "https://etsy.com/1",
    },
    {
      title: "Featured Product 2",
      price: "$20",
      etsyUrl: "https://etsy.com/2",
    },
    {
      title: "Featured Product 3",
      price: "$30",
      etsyUrl: "https://etsy.com/3",
    },
  ],
}));

// Mock shared links config
vi.mock("../../config/links", () => ({
  links: {
    etsyShopUrl: "https://www.etsy.com/shop/simplebiztoolkit",
    freebiePath: "/free",
  },
}));

// Mock CSS import to avoid issues during testing
vi.mock("../../styles/home.css", () => ({}));

/**
 * Helper function to render HomePage with necessary providers
 */
const renderHomePage = () => {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
};

describe("HomePage", () => {
  beforeEach(() => {
    // Clear all mocks before each test to ensure test isolation
    vi.clearAllMocks();
  });

  describe("SEO and Metadata", () => {
    it("should render SEO component with correct metadata", () => {
      renderHomePage();

      const seoComponent = screen.getByTestId("seo-component");

      // Verify the SEO component is rendered
      expect(seoComponent).toBeInTheDocument();

      // Check title includes key branding and value proposition
      expect(seoComponent.getAttribute("data-title")).toContain(
        "Simple Biz Toolkit",
      );
      expect(seoComponent.getAttribute("data-title")).toContain("Templates");

      // Check description mentions key benefits
      expect(seoComponent.getAttribute("data-description")).toContain("time");
      expect(seoComponent.getAttribute("data-description")).toContain("Etsy");

      // Verify canonical path is set to homepage
      expect(seoComponent.getAttribute("data-canonical")).toBe("/");
    });

    it("should include organization structured data for SEO", () => {
      renderHomePage();

      const seoComponent = screen.getByTestId("seo-component");
      const jsonLd = JSON.parse(
        seoComponent.getAttribute("data-jsonld") || "{}",
      );

      // Verify JSON-LD schema for organization
      expect(jsonLd["@type"]).toBe("Organization");
      expect(jsonLd.name).toBe("Simple Biz Toolkit");
      expect(jsonLd.url).toBe("https://simplebiztoolkit.com");
      expect(jsonLd.sameAs).toContain(
        "https://www.etsy.com/shop/simplebiztoolkit",
      );
    });
  });

  describe("Hero Section", () => {
    it("should render the main heading with value proposition", () => {
      renderHomePage();

      // Check for the main heading that communicates the value proposition
      const heading = screen.getByRole("heading", {
        name: /Essential templates & tools for small business owners/i,
        level: 1,
      });

      expect(heading).toBeInTheDocument();
    });

    it("should display the supporting description text", () => {
      renderHomePage();

      // Verify key messaging about simplicity and usability
      expect(
        screen.getByText(/Simple, ready-to-use downloads/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/reduce admin/i)).toBeInTheDocument();
    });

    it("should render primary CTA button linking to Etsy shop", () => {
      renderHomePage();

      // Find all "Shop on Etsy" buttons - there are multiple on the page
      const etsyButtons = screen.getAllByRole("link", {
        name: /Shop on Etsy/i,
      });

      // Verify at least one exists with correct attributes
      expect(etsyButtons.length).toBeGreaterThan(0);
      expect(etsyButtons[0]).toHaveAttribute(
        "href",
        "https://www.etsy.com/shop/simplebiztoolkit",
      );
      expect(etsyButtons[0]).toHaveAttribute("target", "_blank");
      expect(etsyButtons[0]).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should render secondary CTA linking to products page", () => {
      renderHomePage();

      // Find the "Browse All Products" link
      const browseLink = screen.getByRole("link", {
        name: /Browse All Products/i,
      });

      // Verify it links to the products page
      expect(browseLink).toBeInTheDocument();
      expect(browseLink).toHaveAttribute("href", "/products");
    });

    it("should display trust indicators in the TrustBar", () => {
      renderHomePage();

      const trustBar = screen.getByTestId("trust-bar");

      // Verify TrustBar is rendered
      expect(trustBar).toBeInTheDocument();

      // Check for specific trust elements
      expect(screen.getByText(/4.8★ Etsy rating/i)).toBeInTheDocument();
      expect(screen.getByText(/Etsy Star Seller/i)).toBeInTheDocument();
      expect(screen.getByText(/Secure checkout via Etsy/i)).toBeInTheDocument();
      expect(screen.getByText(/Over 3500 sales/i)).toBeInTheDocument();
    });

    it("should render hero image with proper alt text", () => {
      renderHomePage();

      const heroImage = screen.getByAltText(/Tools for you small business/i);

      // Verify image exists and has correct source
      expect(heroImage).toBeInTheDocument();
      expect(heroImage).toHaveAttribute("src", "/images/hero-image-desk.png");
    });
  });

  describe("Featured Products Section", () => {
    it("should display product preview section heading", () => {
      renderHomePage();

      // Check for the section heading
      const heading = screen.getByRole("heading", {
        name: /What the templates look like/i,
      });

      expect(heading).toBeInTheDocument();
    });

    it("should render ProductGrid with featured products", () => {
      renderHomePage();

      const productGrid = screen.getByTestId("product-grid");

      // Verify ProductGrid is rendered
      expect(productGrid).toBeInTheDocument();

      // Should display 3 featured products
      expect(productGrid.getAttribute("data-product-count")).toBe("3");
    });

    it("should explain the product preview purpose", () => {
      renderHomePage();

      // Verify messaging that clarifies preview vs full details
      expect(screen.getByText(/click to view on Etsy/i)).toBeInTheDocument();
    });
  });

  describe("Value Propositions Section", () => {
    it("should render value props section heading", () => {
      renderHomePage();

      const heading = screen.getByRole("heading", {
        name: /Designed to be simple/i,
      });

      expect(heading).toBeInTheDocument();
    });

    it("should display all three value proposition cards", () => {
      renderHomePage();

      // Check for the three main value props (using exact match to avoid h1 collision)
      expect(screen.getByText("Essential templates")).toBeInTheDocument();
      expect(screen.getByText("Simple systems")).toBeInTheDocument();
      expect(screen.getByText("Real-world use")).toBeInTheDocument();
    });

    it("should include descriptive text for each value prop", () => {
      renderHomePage();

      // Verify supporting descriptions
      expect(
        screen.getByText(/Tracking, planning, and admin/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/Repeatable formats/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Made for small business owners/i),
      ).toBeInTheDocument();
    });
  });

  describe("Testimonials Section", () => {
    it("should render testimonials section heading", () => {
      renderHomePage();

      const heading = screen.getByRole("heading", {
        name: /What customers say/i,
      });

      expect(heading).toBeInTheDocument();
    });

    it("should display TestimonialGrid component", () => {
      renderHomePage();

      const testimonialGrid = screen.getByTestId("testimonial-grid");

      // Verify TestimonialGrid is rendered
      expect(testimonialGrid).toBeInTheDocument();
    });

    it("should include link to view more testimonials", () => {
      renderHomePage();

      const moreReviewsLink = screen.getByRole("link", {
        name: /Read more reviews/i,
      });

      // Verify link to testimonials page
      expect(moreReviewsLink).toBeInTheDocument();
      expect(moreReviewsLink).toHaveAttribute("href", "/testimonials");
    });

    it("should include CTA to shop on Etsy in testimonials section", () => {
      renderHomePage();

      // Find the "Browse the full shop on Etsy" link
      const etsyLink = screen.getByRole("link", {
        name: /Browse the full shop on Etsy/i,
      });

      // Verify the CTA exists with correct link
      expect(etsyLink).toBeInTheDocument();
      expect(etsyLink).toHaveAttribute(
        "href",
        "https://www.etsy.com/shop/simplebiztoolkit",
      );
    });
  });

  describe("Lead Magnet Section", () => {
    it("should render lead magnet section heading", () => {
      renderHomePage();

      const heading = screen.getByRole("heading", {
        name: /Get your free guide/i,
      });

      expect(heading).toBeInTheDocument();
    });

    it("should display lead magnet value proposition", () => {
      renderHomePage();

      // Check for key messaging
      expect(screen.getByText(/Try before you buy/i)).toBeInTheDocument();
    });

    it("should list lead magnet benefits", () => {
      renderHomePage();

      // Verify benefit list items
      expect(screen.getByText(/Instant download link/i)).toBeInTheDocument();
      expect(screen.getByText(/No spam/i)).toBeInTheDocument();
      expect(
        screen.getByText(/subscriber-only discounts/i),
      ).toBeInTheDocument();
    });

    it("should render EmailCaptureForm with correct source tracking", () => {
      renderHomePage();

      const emailForm = screen.getByTestId("email-capture-form");

      // Verify form is rendered with proper source attribution
      expect(emailForm).toBeInTheDocument();
      expect(emailForm.getAttribute("data-source")).toBe("home-lead-magnet");
    });

    it("should display privacy and unsubscribe disclaimer", () => {
      renderHomePage();

      // Check for GDPR-compliant messaging
      expect(
        screen.getByText(/By subscribing you agree to receive emails/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/Unsubscribe anytime/i)).toBeInTheDocument();
    });
  });

  describe("Content Structure", () => {
    it("should have proper section hierarchy", () => {
      renderHomePage();

      // Verify proper use of semantic HTML sections
      const sections = document.querySelectorAll("section");

      // Should have multiple sections (hero, value props, testimonials, lead magnet)
      expect(sections.length).toBeGreaterThanOrEqual(4);
    });

    it("should render all major sections in correct order", () => {
      renderHomePage();

      const allHeadings = screen.getAllByRole("heading");
      const headingTexts = allHeadings.map((h) => h.textContent);

      // Verify key sections appear in logical order
      const heroIndex = headingTexts.findIndex((text) =>
        text?.includes("Essential templates"),
      );
      const valuePropsIndex = headingTexts.findIndex((text) =>
        text?.includes("Designed to be simple"),
      );
      const testimonialsIndex = headingTexts.findIndex((text) =>
        text?.includes("What customers say"),
      );
      const leadMagnetIndex = headingTexts.findIndex((text) =>
        text?.includes("Get your free guide"),
      );

      // Verify order makes sense
      expect(heroIndex).toBeLessThan(valuePropsIndex);
      expect(valuePropsIndex).toBeLessThan(testimonialsIndex);
      expect(testimonialsIndex).toBeLessThan(leadMagnetIndex);
    });
  });

  describe("Links and Navigation", () => {
    it("should have all external links with proper security attributes", () => {
      renderHomePage();

      // Get all external Etsy links
      const externalLinks = screen.getAllByRole("link", { name: /Etsy/i });

      // Verify each external link has proper attributes
      externalLinks.forEach((link) => {
        if (link.getAttribute("href")?.startsWith("http")) {
          expect(link).toHaveAttribute("target", "_blank");
          expect(link).toHaveAttribute("rel", "noopener noreferrer");
        }
      });
    });

    it("should have internal navigation links without external attributes", () => {
      renderHomePage();

      const productsLink = screen.getByRole("link", {
        name: /Browse All Products/i,
      });
      const testimonialsLink = screen.getByRole("link", {
        name: /Read more reviews/i,
      });

      // Internal links should not open in new tab
      expect(productsLink).not.toHaveAttribute("target", "_blank");
      expect(testimonialsLink).not.toHaveAttribute("target", "_blank");
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      renderHomePage();

      // Should have exactly one h1 (main page title)
      const h1Elements = screen.getAllByRole("heading", { level: 1 });
      expect(h1Elements).toHaveLength(1);

      // Should have multiple h2s for sections
      const h2Elements = screen.getAllByRole("heading", { level: 2 });
      expect(h2Elements.length).toBeGreaterThan(0);
    });

    it("should have descriptive alt text for images", () => {
      renderHomePage();

      const heroImage = screen.getByAltText(/Tools for you small business/i);

      // Alt text should be descriptive, not empty
      expect(heroImage.getAttribute("alt")).toBeTruthy();
      expect(heroImage.getAttribute("alt")?.length).toBeGreaterThan(5);
    });
  });

  describe("Data Integration", () => {
    it("should correctly display featured products", () => {
      renderHomePage();

      const productGrid = screen.getByTestId("product-grid");

      // Should show 3 featured products from the featured.ts data file
      expect(productGrid).toBeInTheDocument();
      expect(productGrid.getAttribute("data-product-count")).toBe("3");
    });
  });
});
