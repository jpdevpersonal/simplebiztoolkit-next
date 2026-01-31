import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { categories } from "@/data/products";
import { posts as legacyPosts } from "@/data/posts";
import { featuredProducts } from "@/data/featured";
import { getAllPostSlugs } from "@/lib/blog-data";

// Dynamic sitemap for SSR mode
export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now },
    { url: `${site.url}/products`, lastModified: now },
    { url: `${site.url}/blog`, lastModified: now },
    { url: `${site.url}/about`, lastModified: now },
    { url: `${site.url}/testimonials`, lastModified: now },
    { url: `${site.url}/faq`, lastModified: now },
    { url: `${site.url}/help`, lastModified: now },
    { url: `${site.url}/contact`, lastModified: now },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${site.url}/products/${c.slug}`,
    lastModified: now,
  }));

  // product detail routes: flatten all category items and use their productPageUrl
  const productRoutes: MetadataRoute.Sitemap = categories
    .flatMap((c) => c.items || [])
    .map((p) => ({
      url: `${site.url}${p.productPageUrl}`,
      lastModified: now,
    }));

  const featuredProductRoutes: MetadataRoute.Sitemap = featuredProducts.map(
    (p) => ({
      url: `${site.url}${p.productPageUrl}`,
      lastModified: now,
    }),
  );

  // Fetch blog posts from CMS API (with legacy fallback)
  const postSlugs = await getAllPostSlugs();

  // Map slugs to sitemap entries
  const blogRoutes: MetadataRoute.Sitemap = postSlugs.map((post) => {
    // If it's a CMS post with updatedAt, use that
    if (post.updatedAt) {
      return {
        url: `${site.url}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
      };
    }
    // Legacy post - find it in the legacy posts array
    const legacyPost = legacyPosts.find((p) => p.slug === post.slug);
    return {
      url: `${site.url}/blog/${post.slug}`,
      lastModified: legacyPost?.dateISO ? new Date(legacyPost.dateISO) : now,
    };
  });

  const allRoutes = [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...featuredProductRoutes,
    ...blogRoutes,
  ];

  const uniqueRoutes = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const route of allRoutes) {
    uniqueRoutes.set(route.url, route);
  }

  return Array.from(uniqueRoutes.values());
}
