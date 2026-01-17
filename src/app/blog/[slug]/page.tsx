import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import { posts } from "@/data/posts";
import { links } from "@/config/links";

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

      <section className="sb-section">
        <div className="container" style={{ maxWidth: 860 }}>
          <Link href="/blog">← Back to Resources</Link>

          <h1 className="mt-3" style={{ fontWeight: 900 }}>
            {post.title}
          </h1>
          <div className="sb-muted">
            {post.category} · {post.readingMinutes} min read
          </div>

          <div className="sb-card p-3 mt-3">
            <Image
              src="/images/placeholder-hero.png"
              alt=""
              className="img-fluid rounded-4"
              width={1200}
              height={675}
              sizes="(max-width: 900px) 100vw, 860px"
            />
          </div>

          <article className="mt-4">
            {post.body.map((para, idx) => (
              <p key={idx} className="fs-5" style={{ color: "var(--sb-ink)" }}>
                {para}
              </p>
            ))}
          </article>

          <div className="sb-card p-4 mt-4">
            <div style={{ fontWeight: 900 }}>Next step</div>
            <div className="sb-muted">
              Get your free guide, then shop securely on Etsy when you’re ready.
            </div>

            <div className="d-flex gap-2 flex-wrap mt-3">
              <Link className="btn sb-btn-primary" href="/free">
                Get free template
              </Link>
              <a
                className="btn sb-btn-ghost"
                href={links.etsyShopUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Shop on Etsy
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
