/**
 * Tests for PostContent renderer
 * Ensures safe rendering of TipTap JSON content
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PostContent } from "./PostContent";
import type { TipTapDocument } from "@/types/api";

describe("PostContent", () => {
  describe("basic rendering", () => {
    it("renders paragraph content correctly", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Hello world" }],
          },
        ],
      };

      render(<PostContent content={doc} />);
      expect(screen.getByText("Hello world")).toBeInTheDocument();
    });

    it("renders headings with correct hierarchy", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Section Title" }],
          },
          {
            type: "heading",
            attrs: { level: 3 },
            content: [{ type: "text", text: "Subsection" }],
          },
        ],
      };

      render(<PostContent content={doc} />);

      const h2 = screen.getByRole("heading", { level: 2 });
      const h3 = screen.getByRole("heading", { level: 3 });

      expect(h2).toHaveTextContent("Section Title");
      expect(h3).toHaveTextContent("Subsection");
    });

    it("renders bullet lists correctly", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "bulletList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Item 1" }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Item 2" }],
                  },
                ],
              },
            ],
          },
        ],
      };

      render(<PostContent content={doc} />);
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });

    it("renders ordered lists correctly", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "orderedList",
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "First" }],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    content: [{ type: "text", text: "Second" }],
                  },
                ],
              },
            ],
          },
        ],
      };

      render(<PostContent content={doc} />);
      const list = document.querySelector("ol");
      expect(list).toBeInTheDocument();
    });

    it("renders blockquotes correctly", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "blockquote",
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "A wise quote" }],
              },
            ],
          },
        ],
      };

      render(<PostContent content={doc} />);
      expect(screen.getByText("A wise quote")).toBeInTheDocument();
      const blockquote = document.querySelector("blockquote");
      expect(blockquote).toBeInTheDocument();
    });

    it("renders code blocks correctly", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "codeBlock",
            attrs: { language: "javascript" },
            content: [{ type: "text", text: "const x = 1;" }],
          },
        ],
      };

      render(<PostContent content={doc} />);
      const code = document.querySelector("code");
      expect(code).toHaveTextContent("const x = 1;");
    });
  });

  describe("text marks", () => {
    it("renders bold text", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Bold text",
                marks: [{ type: "bold" }],
              },
            ],
          },
        ],
      };

      render(<PostContent content={doc} />);
      const strong = document.querySelector("strong");
      expect(strong).toHaveTextContent("Bold text");
    });

    it("renders italic text", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Italic text",
                marks: [{ type: "italic" }],
              },
            ],
          },
        ],
      };

      render(<PostContent content={doc} />);
      const em = document.querySelector("em");
      expect(em).toHaveTextContent("Italic text");
    });

    it("renders code inline", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "inline code",
                marks: [{ type: "code" }],
              },
            ],
          },
        ],
      };

      render(<PostContent content={doc} />);
      const code = document.querySelector("code");
      expect(code).toHaveTextContent("inline code");
    });
  });

  describe("callout blocks", () => {
    it("renders info callout", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "callout",
            attrs: { type: "info" },
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Information" }],
              },
            ],
          },
        ],
      };

      render(<PostContent content={doc} />);
      expect(screen.getByText("Information")).toBeInTheDocument();
      const callout = document.querySelector(".prose-callout-info");
      expect(callout).toBeInTheDocument();
    });

    it("renders warning callout", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "callout",
            attrs: { type: "warning" },
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "Warning message" }],
              },
            ],
          },
        ],
      };

      render(<PostContent content={doc} />);
      const callout = document.querySelector(".prose-callout-warning");
      expect(callout).toBeInTheDocument();
    });
  });

  describe("XSS protection", () => {
    it("ignores unknown node types", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            // @ts-expect-error - Testing unknown node type
            type: "script",
            content: [{ type: "text", text: "alert('xss')" }],
          },
          {
            type: "paragraph",
            content: [{ type: "text", text: "Safe content" }],
          },
        ],
      };

      render(<PostContent content={doc} />);
      expect(screen.getByText("Safe content")).toBeInTheDocument();
      expect(document.querySelector("script")).not.toBeInTheDocument();
    });

    it("validates image URLs (rejects javascript:)", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "image",
            attrs: {
              src: "javascript:alert('xss')",
              alt: "malicious",
            },
          },
        ],
      };

      render(<PostContent content={doc} />);
      const img = document.querySelector("img");
      // Image should not be rendered with javascript: URL
      expect(img).not.toBeInTheDocument();
    });

    it("validates image URLs (rejects data: unless whitelisted)", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "image",
            attrs: {
              src: "data:text/html,<script>alert('xss')</script>",
              alt: "malicious",
            },
          },
        ],
      };

      render(<PostContent content={doc} />);
      const img = document.querySelector("img");
      // Non-image data URLs should be rejected
      expect(img).not.toBeInTheDocument();
    });

    it("allows valid https image URLs", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "image",
            attrs: {
              src: "https://example.com/image.jpg",
              alt: "Valid image",
            },
          },
        ],
      };

      render(<PostContent content={doc} />);
      const img = document.querySelector("img");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
    });

    it("validates link URLs (rejects javascript:)", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Click me",
                marks: [
                  {
                    type: "link",
                    attrs: { href: "javascript:alert('xss')" },
                  },
                ],
              },
            ],
          },
        ],
      };

      render(<PostContent content={doc} />);
      // Text should render but link should not have href
      expect(screen.getByText("Click me")).toBeInTheDocument();
      const link = document.querySelector("a");
      // Link should either not exist or not have the dangerous href
      if (link) {
        expect(link.getAttribute("href")).not.toContain("javascript:");
      }
    });

    it("allows valid https links", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Click me",
                marks: [
                  {
                    type: "link",
                    attrs: { href: "https://example.com" },
                  },
                ],
              },
            ],
          },
        ],
      };

      render(<PostContent content={doc} />);
      const link = document.querySelector("a");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://example.com");
    });
  });

  describe("theme variants", () => {
    it("applies default variant class", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Content" }],
          },
        ],
      };

      const { container } = render(<PostContent content={doc} />);
      expect(container.querySelector(".prose")).toBeInTheDocument();
    });

    it("applies marketing variant class", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: "Content" }],
          },
        ],
      };

      const { container } = render(
        <PostContent content={doc} variant="marketing" />,
      );
      expect(
        container.querySelector(".prose-variant-marketing"),
      ).toBeInTheDocument();
    });
  });

  describe("empty content handling", () => {
    it("renders empty doc gracefully", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [],
      };

      const { container } = render(<PostContent content={doc} />);
      expect(container.querySelector(".prose")).toBeInTheDocument();
    });

    it("renders paragraph with no content gracefully", () => {
      const doc: TipTapDocument = {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [],
          },
        ],
      };

      const { container } = render(<PostContent content={doc} />);
      const p = container.querySelector("p");
      expect(p).toBeInTheDocument();
    });
  });
});
