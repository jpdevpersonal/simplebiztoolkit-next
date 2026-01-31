/**
 * Blog Data Service
 * Handles fetching posts from API with fallback to legacy posts.ts
 * This allows gradual migration from static content to CMS
 */

import { postsApi } from "@/lib/api-client";
import { posts as legacyPosts, BlogPost as LegacyBlogPost } from "@/data/posts";
import type { Post, PostListItem, TipTapDocument } from "@/types/api";

// Environment flag to control data source
const USE_CMS = process.env.NEXT_PUBLIC_USE_CMS === "true";

// ==============================================
// Types for unified interface
// ==============================================

export interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: TipTapDocument | null;
  status: "published" | "draft";
  publishedAt: string | null;
  coverImageUrl: string | null;
  category: string | null;
  readingMinutes: number | null;
  tags: string[];
  seoTitle: string | null;
  seoDescription: string | null;
  ogImageUrl: string | null;
  authorName: string | null;
  themeVariant: "default" | "marketing" | "minimal";
  // Legacy flag
  isLegacy: boolean;
}

// ==============================================
// Data Fetching Functions
// ==============================================

/**
 * Get all published posts for the blog index
 */
export async function getPublishedPosts(): Promise<BlogPostData[]> {
  if (USE_CMS) {
    const result = await postsApi.getPublished({ pageSize: 100 });
    if (result.success) {
      return result.data.items.map(transformApiPost);
    }
    console.warn("Failed to fetch from CMS, falling back to legacy posts");
  }

  // Fallback to legacy posts
  return legacyPosts.map(transformLegacyPost);
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(
  slug: string,
): Promise<BlogPostData | null> {
  if (USE_CMS) {
    const result = await postsApi.getBySlug(slug);
    if (result.success) {
      return transformApiPostFull(result.data);
    }
    // If CMS returns 404, try legacy
    if (!result.success && result.error.code === "HTTP_404") {
      console.log(`Post ${slug} not in CMS, checking legacy posts`);
    }
  }

  // Fallback to legacy posts
  const legacyPost = legacyPosts.find((p) => p.slug === slug);
  if (legacyPost) {
    return transformLegacyPost(legacyPost);
  }

  return null;
}

/**
 * Get all post slugs for static generation/sitemap
 */
export async function getAllPostSlugs(): Promise<
  { slug: string; updatedAt?: string }[]
> {
  const slugMap = new Map<string, { slug: string; updatedAt?: string }>();

  if (USE_CMS) {
    const result = await postsApi.getAllSlugs();
    if (result.success) {
      result.data.forEach((p) => {
        slugMap.set(p.slug, { slug: p.slug, updatedAt: p.updatedAt });
      });
    }
  }

  // Always include legacy post slugs (for backwards compatibility)
  legacyPosts.forEach((p) => {
    if (!slugMap.has(p.slug)) {
      slugMap.set(p.slug, { slug: p.slug });
    }
  });

  return Array.from(slugMap.values());
}

/**
 * Check if a post exists (for preview mode)
 */
export async function postExists(slug: string): Promise<boolean> {
  // Check CMS first
  if (USE_CMS) {
    const result = await postsApi.getBySlug(slug);
    if (result.success) return true;
  }

  // Check legacy posts
  return legacyPosts.some((p) => p.slug === slug);
}

// ==============================================
// Transform Functions
// ==============================================

function transformApiPost(post: PostListItem): BlogPostData {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: null, // Not included in list response
    status: post.status === "published" ? "published" : "draft",
    publishedAt: post.publishedAt,
    coverImageUrl: post.coverImageUrl,
    category: post.category,
    readingMinutes: post.readingMinutes,
    tags: post.tags.map((t) => t.name),
    seoTitle: null,
    seoDescription: null,
    ogImageUrl: null,
    authorName: null,
    themeVariant: "default",
    isLegacy: false,
  };
}

function transformApiPostFull(post: Post): BlogPostData {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    status: post.status === "published" ? "published" : "draft",
    publishedAt: post.publishedAt,
    coverImageUrl: post.coverImageUrl,
    category: post.category,
    readingMinutes: post.readingMinutes,
    tags: post.tags.map((t) => t.name),
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    ogImageUrl: post.ogImageUrl,
    authorName: post.authorName,
    themeVariant: post.themeVariant,
    isLegacy: false,
  };
}

function transformLegacyPost(post: LegacyBlogPost): BlogPostData {
  return {
    id: `legacy-${post.slug}`,
    slug: post.slug,
    title: post.title,
    excerpt: post.description,
    content: null, // Legacy posts use ArticleContent component
    status: "published",
    publishedAt: post.dateISO,
    coverImageUrl: post.featuredImage || null,
    category: post.category,
    readingMinutes: post.readingMinutes,
    tags: post.badges || [],
    seoTitle: post.title,
    seoDescription: post.description,
    ogImageUrl: post.featuredImage || null,
    authorName: null,
    themeVariant: "default",
    isLegacy: true,
  };
}
