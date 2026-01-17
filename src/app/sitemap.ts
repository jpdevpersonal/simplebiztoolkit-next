import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { categories } from "@/data/products";
import { posts } from "@/data/posts";

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

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: p.dateISO,
  }));

  return [...staticRoutes, ...categoryRoutes, ...blogRoutes];
}
