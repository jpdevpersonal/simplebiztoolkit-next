import { useParams, Link } from "react-router-dom";
import Seo from "../components/Seo";
import ProductGrid from "../components/ProductGrid";
import { categories } from "../data/products";
import { links } from "../config/links";
import "../styles/products.css";

export default function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const cat = categories.find((c) => c.slug === categorySlug);

  if (!cat) {
    return (
      <section className="sb-section">
        <div className="container">
          <h1 style={{ fontWeight: 900 }}>Category not found</h1>
        </div>
      </section>
    );
  }

  return (
    <>
      <Seo
        title={`${cat.name} | Simple Biz Toolkit`}
        description={`${cat.summary} Browse templates and then checkout securely on Etsy.`}
        canonicalPath={`/products/${cat.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${cat.name} | Simple Biz Toolkit`,
        }}
      />

      <section className="sb-section">
        <div className="container">
          <nav className="sb-breadcrumb" aria-label="Breadcrumb">
            <Link to="/products" className="sb-breadcrumb-link">
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
              Back to Categories
            </Link>
          </nav>

          <div className="row g-4 align-items-center">
            <div className="col-lg-7">
              <h1 style={{ fontWeight: 700 }}>{cat.name}</h1>
              <p className="sb-muted fs-5">{cat.summary}</p>

              <div
                className="sb-card p-3"
                style={{ borderLeft: "3px solid var(--sb-brand-blue)" }}
              >
                <h2
                  style={{
                    fontWeight: 600,
                    fontSize: "1rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  Why this helps
                </h2>
                <p className="sb-muted mb-0" style={{ fontSize: "0.9375rem" }}>
                  Browse the templates below, then complete your purchase
                  securely through Etsy.
                </p>
              </div>

              <div className="mt-3 d-flex gap-2 flex-wrap">
                <a
                  className="btn sb-btn-ghost"
                  href={links.etsyShopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit full Etsy shop
                </a>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="sb-card p-3">
                <img
                  src={cat.heroImage}
                  alt=""
                  className="img-fluid rounded-4"
                />
              </div>
            </div>
          </div>

          <div id="items" className="mt-4">
            <ProductGrid products={cat.items} />
          </div>
        </div>
      </section>
    </>
  );
}
