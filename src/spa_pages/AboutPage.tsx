import Seo from "../components/Seo";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About | Simple Biz Toolkit"
        description="The story behind Simple Biz Toolkit and why these templates are built to be simple, Essential, and reusable."
        canonicalPath="/about"
      />

      <section className="sb-section">
        <div className="container">
          <div className="products-header">
            <h1 style={{ fontWeight: 900 }}>About</h1>
            <p className="sb-muted">
              Welcome to Simple Biz Toolkit: Your Source for Premium Printable
              Templates and Business Solutions.
            </p>
          </div>

          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="sb-card>">
              <p>
                At Simple Biz Toolkit, we specialize in crafting high-quality,
                printable forms and templates designed to streamline and
                simplify your business operations and simplify your personal
                life.
              </p>
              <section className="p-3 h-100">
                <h2>Why Choose Us?</h2>
                <ul>
                  <li>
                    <strong>Time-Saving Solutions:</strong> Our expertly
                    designed templates allow you to focus on what truly matters
                    – your business or personal projects.
                  </li>
                  <li>
                    <strong>Affordability:</strong> Get professional-grade
                    templates at a fraction of the cost of expensive pre-made
                    books or complex systems.
                  </li>
                  <li>
                    <strong>Original Designs:</strong> Every product in our
                    store is our original creation, ensuring you receive unique,
                    tailored solutions.
                  </li>
                  <li>
                    <strong>Versatility:</strong> From business invoices to
                    personal planners, we offer a wide range of templates to
                    suit your diverse needs.
                  </li>
                  <li>
                    <strong>Quality Assurance:</strong> We take immense pride in
                    delivering top-notch products that meet your expectations.
                  </li>
                </ul>
              </section>

              <section className="p-3 h-100">
                <h3>Our Commitment to You</h3>
                <p>
                  At Simple Biz Toolkit, we believe in giving our customers high
                  quality products and exceptional service. Your feedback is
                  invaluable to us.
                </p>
              </section>
              <section className="p-3 h-100">
                <h3>Ready to Simplify Your Life?</h3>
                <p>
                  Browse our store and discover how our templates can transform
                  your workflow and simplify your life. With every purchase,
                  you're not just buying a template – you're investing in
                  efficiency, simplicity and peace of mind.
                </p>

                <p>
                  If you have questions or need assistance, we're here to help.
                  Don't hesitate to message us on our etsy store.
                </p>
                <p>
                  <a
                    href="https://www.etsy.com/shop/simplebiztoolkit"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.etsy.com/shop/simplebiztoolkit
                  </a>
                </p>
                <p className="mb-0">
                  Julian
                  <br />
                  Founder
                </p>
              </section>
            </div>

            <div className="mt-4 d-flex gap-2 flex-wrap">
              <Link
                to="/products"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.rem",
                  padding: "0.5rem",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderRadius: "12px",
                  backgroundColor: "white",
                  color: "var(--sb-green)",
                  border: "2px solid var(--sb-green)",
                }}
              >
                Browse All Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
