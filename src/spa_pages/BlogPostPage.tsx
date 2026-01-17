import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo";
import { posts } from "../data/posts";
import { links } from "../config/links";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="sb-section">
        <div className="container">
          <h1 style={{ fontWeight: 900 }}>Post not found</h1>
          <Link to="/blog">Back to Resources</Link>
        </div>
      </section>
    );
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.dateISO,
    author: { "@type": "Person", name: "Julian (Simple Biz Toolkit)" },
  };

  return (
    <>
      <Seo
        title={`${post.title} | Simple Biz Toolkit`}
        description={post.description}
        canonicalPath={`/blog/${post.slug}`}
        jsonLd={articleJsonLd}
      />

      <section className="sb-section">
        <div className="container" style={{ maxWidth: 860 }}>
          <Link to="/blog">← Back to Resources</Link>

          <h1 className="mt-3" style={{ fontWeight: 900 }}>
            {post.title}
          </h1>
          <div className="sb-muted">
            {post.category} · {post.readingMinutes} min read
          </div>

          <div className="sb-card p-3 mt-3">
            <img
              src="/images/placeholder-hero.png"
              alt=""
              className="img-fluid rounded-4"
            />
          </div>

          <article className="mt-4">
            {post.body.map((para, idx) => (
              <p key={idx} className="fs-5" style={{ color: "var(--sb-ink)" }}>
                {para}
              </p>
            ))}
          </article>

          {/* CTA box at end of post */}
          <div className="sb-card p-4 mt-4">
            <div style={{ fontWeight: 900 }}>Next step</div>
            <div className="sb-muted">
              Get your free guide, then shop securely on Etsy when you’re ready.
              :contentReference[oaicite:16]
            </div>

            <div className="d-flex gap-2 flex-wrap mt-3">
              <Link className="btn sb-btn-primary" to="/free">
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
