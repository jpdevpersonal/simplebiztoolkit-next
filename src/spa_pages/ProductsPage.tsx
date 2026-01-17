import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { categories } from "../data/products";

import "../styles/products.css";

export default function ProductsPage() {
  return (
    <>
      <Seo
        title="Products | Simple Biz Toolkit"
        description="Browse categories like accounting ledgers, time sheets, and rent trackers. Each tool links to Etsy for secure checkout."
        canonicalPath="/products"
      />

      <section className="sb-section">
        <div className="container">
          <div className="products-header">
            <h1>Product Categories</h1>
            <p className="sb-muted">
              Browse our collection of simple, ready-to-use templates
            </p>
          </div>

          <div className="category-grid">
            {categories.map((c) => (
              <Link
                to={`/products/${c.slug}`}
                className="category-card-link"
                key={c.slug}
              >
                <article className="category-card">
                  <h2 className="category-card-title">{c.name}</h2>
                  <p className="category-card-summary">{c.summary}</p>
                  <span className="category-card-cta">
                    Browse templates
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 3l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
