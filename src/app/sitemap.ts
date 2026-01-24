import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { categories } from "@/data/products";
import { posts } from "@/data/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now },
    { url: `${site.url}/products`, lastModified: now },
    { url: `${site.url}/blog`, lastModified: now },
    { url: `${site.url}/free`, lastModified: now },
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

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: p.dateISO,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}
