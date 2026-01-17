import type { Metadata } from "next";

import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about downloads, printing, and using the templates.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | Simple Biz Toolkit",
    description:
      "Common questions about downloads, printing, and using the templates.",
    url: "/faq",
  },
};

export default function FaqPage() {
  return (
    <section className="sb-section">
      <div className="container">
        <div className="products-header">
          <h1 style={{ fontWeight: 900 }}>FAQ</h1>
          <p className="sb-muted">
            Answers to common questions about downloads, printing, and usage.
          </p>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FaqAccordion />
        </div>
      </div>
    </section>
  );
}
