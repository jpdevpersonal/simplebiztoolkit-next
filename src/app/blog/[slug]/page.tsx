import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import { posts } from "@/data/posts";
import { ArticleContent, hasArticleContent } from "../articles";
import "@/styles/articleStyle.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} | Simple Biz Toolkit`,
      description: post.description,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  if (!hasArticleContent(slug)) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.dateISO,
    author: { "@type": "Person", name: "Julian (Simple Biz Toolkit)" },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://simplebiztoolkit.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <JsonLd json={articleJsonLd} />

      <main className="article-page">
        {/* Breadcrumb Navigation */}
        <nav className="article-breadcrumb">
          <Link href="/">Home</Link>
          <span className="separator"> / </span>
          <Link href="/blog">Resources</Link>
          <span className="separator"> / </span>
          {post.title.length > 40
            ? post.title.substring(0, 40) + "..."
            : post.title}
        </nav>

        {/* Article Header */}
        <header className="article-header">
          {post.badges && post.badges.length > 0 && (
            <div className="article-badges">
              {post.badges.map((badge) => (
                <span key={badge} className="article-badge">
                  {badge}
                </span>
              ))}
            </div>
          )}

          <h1 className="article-title">{post.title}</h1>

          {post.subtitle && <p className="article-subtitle">{post.subtitle}</p>}

          <div className="article-meta">
            <time dateTime={post.dateISO}>Published {post.dateISO}</time>
            <span> · </span>
            <span>{post.readingMinutes} min read</span>
          </div>
        </header>

        {/* Article Content */}
        <article>
          <ArticleContent slug={slug} />
        </article>
      </main>
    </>
  );
}
