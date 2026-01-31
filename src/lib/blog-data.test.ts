/**
 * Tests for blog-data module
 * Tests data fetching, slug generation, and legacy fallback
 */

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock the API client
vi.mock("@/lib/api-client", () => ({
  postsApi: {
    getPublished: vi.fn(),
    getBySlug: vi.fn(),
    getAllSlugs: vi.fn(),
  },
}));

// Mock legacy posts
vi.mock("@/data/posts", () => ({
  posts: [
    {
      slug: "legacy-post-1",
      title: "Legacy Post One",
      description: "Description of legacy post",
      dateISO: "2024-01-15",
      featuredImage: "/images/legacy.jpg",
    },
    {
      slug: "legacy-post-2",
      title: "Legacy Post Two",
      description: "Another legacy post",
      dateISO: "2024-01-10",
      featuredImage: "/images/legacy2.jpg",
    },
  ],
}));

describe("blog-data", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.clearAllMocks();
  });

  describe("getPublishedPosts", () => {
    it("returns legacy posts when CMS is disabled", async () => {
      process.env.NEXT_PUBLIC_USE_CMS = "false";

      // Re-import to pick up new env
      const { getPublishedPosts } = await import("@/lib/blog-data");
      const posts = await getPublishedPosts();

      expect(posts).toHaveLength(2);
      expect(posts[0].slug).toBe("legacy-post-1");
      expect(posts[0].isLegacy).toBe(true);
    });

    it("returns CMS posts when CMS is enabled", async () => {
      process.env.NEXT_PUBLIC_USE_CMS = "true";

      const { postsApi } = await import("@/lib/api-client");
      vi.mocked(postsApi.getPublished).mockResolvedValueOnce({
        success: true,
        data: {
          items: [
            {
              id: "1",
              title: "CMS Post",
              slug: "cms-post",
              excerpt: "CMS excerpt",
              coverImageUrl: "/images/cms.jpg",
              publishedAt: "2024-02-01T00:00:00Z",
              author: { id: "a1", name: "Author" },
              tags: [],
            },
          ],
          page: 1,
          pageSize: 20,
          totalCount: 1,
          totalPages: 1,
        },
      });

      const { getPublishedPosts } = await import("@/lib/blog-data");
      const posts = await getPublishedPosts();

      expect(posts).toHaveLength(1);
      expect(posts[0].slug).toBe("cms-post");
      expect(posts[0].isLegacy).toBe(false);
    });

    it("falls back to legacy posts when CMS API fails", async () => {
      process.env.NEXT_PUBLIC_USE_CMS = "true";

      const { postsApi } = await import("@/lib/api-client");
      vi.mocked(postsApi.getPublished).mockResolvedValueOnce({
        success: false,
        error: { code: "NETWORK_ERROR", message: "Connection failed" },
      });

      const { getPublishedPosts } = await import("@/lib/blog-data");
      const posts = await getPublishedPosts();

      // Should fall back to legacy posts
      expect(posts).toHaveLength(2);
      expect(posts[0].isLegacy).toBe(true);
    });
  });

  describe("getPostBySlug", () => {
    it("returns legacy post when slug matches legacy data", async () => {
      process.env.NEXT_PUBLIC_USE_CMS = "false";

      const { getPostBySlug } = await import("@/lib/blog-data");
      const post = await getPostBySlug("legacy-post-1");

      expect(post).not.toBeNull();
      expect(post?.slug).toBe("legacy-post-1");
      expect(post?.isLegacy).toBe(true);
    });

    it("returns null for unknown slug", async () => {
      process.env.NEXT_PUBLIC_USE_CMS = "false";

      const { getPostBySlug } = await import("@/lib/blog-data");
      const post = await getPostBySlug("nonexistent-slug");

      expect(post).toBeNull();
    });

    it("returns CMS post when available", async () => {
      process.env.NEXT_PUBLIC_USE_CMS = "true";

      const { postsApi } = await import("@/lib/api-client");
      vi.mocked(postsApi.getBySlug).mockResolvedValueOnce({
        success: true,
        data: {
          id: "1",
          title: "CMS Post",
          slug: "cms-post",
          excerpt: "CMS excerpt",
          content: { type: "doc", content: [] },
          coverImageUrl: "/images/cms.jpg",
          status: "published",
          publishedAt: "2024-02-01T00:00:00Z",
          createdAt: "2024-01-15T00:00:00Z",
          updatedAt: "2024-02-01T00:00:00Z",
          author: { id: "a1", name: "Author", email: "a@test.com" },
          tags: [],
        },
      });

      const { getPostBySlug } = await import("@/lib/blog-data");
      const post = await getPostBySlug("cms-post");

      expect(post).not.toBeNull();
      expect(post?.isLegacy).toBe(false);
    });

    it("tries legacy fallback when CMS post not found", async () => {
      process.env.NEXT_PUBLIC_USE_CMS = "true";

      const { postsApi } = await import("@/lib/api-client");
      vi.mocked(postsApi.getBySlug).mockResolvedValueOnce({
        success: false,
        error: { code: "HTTP_404", message: "Not found" },
      });

      const { getPostBySlug } = await import("@/lib/blog-data");
      const post = await getPostBySlug("legacy-post-1");

      expect(post).not.toBeNull();
      expect(post?.slug).toBe("legacy-post-1");
      expect(post?.isLegacy).toBe(true);
    });
  });

  describe("getAllPostSlugs", () => {
    it("returns legacy slugs when CMS is disabled", async () => {
      process.env.NEXT_PUBLIC_USE_CMS = "false";

      const { getAllPostSlugs } = await import("@/lib/blog-data");
      const slugs = await getAllPostSlugs();

      expect(slugs).toHaveLength(2);
      expect(slugs.map((s) => s.slug)).toContain("legacy-post-1");
      expect(slugs.map((s) => s.slug)).toContain("legacy-post-2");
    });

    it("returns CMS slugs when CMS is enabled", async () => {
      process.env.NEXT_PUBLIC_USE_CMS = "true";

      const { postsApi } = await import("@/lib/api-client");
      vi.mocked(postsApi.getAllSlugs).mockResolvedValueOnce({
        success: true,
        data: [
          { slug: "cms-post-1", updatedAt: "2024-02-01T00:00:00Z" },
          { slug: "cms-post-2", updatedAt: "2024-01-20T00:00:00Z" },
        ],
      });

      const { getAllPostSlugs } = await import("@/lib/blog-data");
      const slugs = await getAllPostSlugs();

      expect(slugs.map((s) => s.slug)).toContain("cms-post-1");
      expect(slugs.map((s) => s.slug)).toContain("cms-post-2");
    });

    it("falls back to legacy slugs on API failure", async () => {
      process.env.NEXT_PUBLIC_USE_CMS = "true";

      const { postsApi } = await import("@/lib/api-client");
      vi.mocked(postsApi.getAllSlugs).mockResolvedValueOnce({
        success: false,
        error: { code: "NETWORK_ERROR", message: "Failed" },
      });

      const { getAllPostSlugs } = await import("@/lib/blog-data");
      const slugs = await getAllPostSlugs();

      expect(slugs).toHaveLength(2);
      expect(slugs.map((s) => s.slug)).toContain("legacy-post-1");
    });
  });
});

describe("slug generation utilities", () => {
  it("generates valid slugs from titles", () => {
    const generateSlug = (title: string): string => {
      return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    };

    expect(generateSlug("Hello World")).toBe("hello-world");
    expect(generateSlug("My First Blog Post!")).toBe("my-first-blog-post");
    expect(generateSlug("  Spaces  Around  ")).toBe("spaces-around");
    expect(generateSlug("Special @#$% Characters")).toBe("special-characters");
    expect(generateSlug("Multiple---Dashes")).toBe("multiple-dashes");
    expect(generateSlug("Numbers 123 Are OK")).toBe("numbers-123-are-ok");
  });

  it("handles edge cases", () => {
    const generateSlug = (title: string): string => {
      return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    };

    expect(generateSlug("")).toBe("");
    expect(generateSlug("---")).toBe("");
    expect(generateSlug("@#$%")).toBe("");
    expect(generateSlug("A")).toBe("a");
  });
});
