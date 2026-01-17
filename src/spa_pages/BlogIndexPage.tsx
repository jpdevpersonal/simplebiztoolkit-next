import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { posts } from "../data/posts";

import "../styles/blog.css";

export default function BlogIndexPage() {
  return (
    <>
      <Seo
        title="Resources | Simple Biz Toolkit"
        description="Guides and tips for small business owners and Etsy sellers. Essential advice that links to tools you can use immediately."
        canonicalPath="/blog"
      />

      <section className="sb-section">
        <div className="container">
          <h1 style={{ fontWeight: 900 }}>Resources</h1>
          <p className="sb-muted">
            Helpful content attracts traffic, builds trust, and converts readers into buyers and subscribers. :contentReference[oaicite:15]
          </p>

          <div className="row g-3 mt-2">
            {posts.map((p) => (
              <div className="col-lg-6" key={p.slug}>
                <div className="sb-card p-3 h-100">
                  <div className="d-flex justify-content-between gap-2 flex-wrap">
                    <div className="sb-muted" style={{ fontSize: 13 }}>{p.category}</div>
                    <div className="sb-muted" style={{ fontSize: 13 }}>{p.readingMinutes} min read</div>
                  </div>

                  <div className="mt-1" style={{ fontWeight: 900, fontSize: 18 }}>{p.title}</div>
                  <div className="sb-muted mt-1">{p.description}</div>

                  <div className="mt-3">
                    <Link className="btn sb-btn-primary" to={`/blog/${p.slug}`}>Read article</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sb-card p-4 mt-4">
            <div style={{ fontWeight: 900 }}>Want free templates + new posts?</div>
            <div className="sb-muted">Use the free template page to join the list.</div>
            <Link className="btn sb-btn-primary mt-2" to="/free">Get the free template</Link>
          </div>
        </div>
      </section>
    </>
  );
}
