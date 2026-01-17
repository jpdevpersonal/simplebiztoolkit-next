import Seo from "../components/Seo";
import FaqAccordion from "../components/FaqAccordion";

export default function FaqPage() {
  return (
    <>
      <Seo
        title="FAQ | Simple Biz Toolkit"
        description="Common questions about downloads, printing, and using the templates."
        canonicalPath="/faq"
      />

      <section className="sb-section">
        <div className="container">
          <div className="products-header">
            <h1 style={{ fontWeight: 900 }}>FAQ</h1>
            <p className="sb-muted">
              FAQs reduce hesitation and can rank for "People also ask" queries.
              :contentReference[oaicite:18]
            </p>
          </div>

          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <FaqAccordion />
          </div>
        </div>
      </section>
    </>
  );
}
