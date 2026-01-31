import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import { PostContent } from "@/components/blog/PostContent";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog-data";
import { ArticleContent, hasArticleContent } from "../articles";
import { site } from "@/config/site";
import "@/styles/articleStyle.css";
import "@/styles/prose.css";

type Props = {
  params: Promise<{ slug: string }>;
};

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const ogImage =
    post.ogImageUrl || post.coverImageUrl || "/images/hero-image-desk.webp";
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || "";

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${title} | Simple Biz Toolkit`,
      description,
      url: `/blog/${post.slug}`,
      images: [{ url: ogImage }],
      publishedTime: post.publishedAt || undefined,
      authors: post.authorName ? [post.authorName] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Simple Biz Toolkit`,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  // For legacy posts, check if we have the article content component
  if (post.isLegacy && !hasArticleContent(slug)) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt || post.seoDescription,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: post.coverImageUrl
      ? [`${site.url}${post.coverImageUrl}`]
      : undefined,
    author: post.authorName
      ? { "@type": "Person", name: post.authorName }
      : { "@type": "Person", name: "Julian (Simple Biz Toolkit)" },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/images/simple-biz-toolkit-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/blog/${post.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resources",
        item: `${site.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${site.url}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd json={articleJsonLd} />
      <JsonLd json={breadcrumbJsonLd} />

      <main className="article-page">
        {/* Breadcrumb Navigation */}
        <nav className="sb-breadcrumb" aria-label="Breadcrumb">
          <Link href="/blog" className="sb-breadcrumb-link">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="sb-breadcrumb-icon"
            >
              <path
                d="M10 3l-5 5 5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Resources
          </Link>
        </nav>

        {/* Article Header */}
        <header className="article-header">
          {post.tags.length > 0 && (
            <div className="article-badges">
              {post.tags.map((tag) => (
                <span key={tag} className="article-badge">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="article-title">{post.title}</h1>

          {post.excerpt && <p className="article-subtitle">{post.excerpt}</p>}

          <div className="article-meta">
            <time dateTime={post.publishedAt || undefined}>
              Published {post.publishedAt}
            </time>
            {post.readingMinutes && (
              <>
                <span> · </span>
                <span>{post.readingMinutes} min read</span>
              </>
            )}
          </div>
        </header>

        {/* Header Image */}
        {post.coverImageUrl && (
          <div className="article-header-image">
            <img src={post.coverImageUrl} alt={post.title} />
          </div>
        )}

        {/* Article Content */}
        <article>
          {post.isLegacy ? (
            // Legacy posts render via ArticleContent component
            <ArticleContent slug={slug} />
          ) : (
            // CMS posts render via PostContent component
            <PostContent content={post.content} variant={post.themeVariant} />
          )}
        </article>
      </main>
    </>
  );
}
