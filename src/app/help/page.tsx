import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help",
  description:
    "How to find and download your purchases, plus common help topics.",
  alternates: { canonical: "/help" },
  openGraph: {
    title: "Help | Simple Biz Toolkit",
    description:
      "How to find and download your purchases, plus common help topics.",
    url: "/help",
  },
};

export default function HelpPage() {
  return (
    <section className="sb-section">
      <div className="container">
        <div className="products-header">
          <h1 style={{ fontWeight: 900 }}>Help</h1>
          <p className="sb-muted">
            Help for common questions about downloads and access.
          </p>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="row">
            <h2>Finding Your Digital Downloads</h2>
            <p>
              If you’re having trouble finding your digital downloads, try the
              steps below.
            </p>
            <p>
              If you purchased using your Etsy account, the downloads can be
              found by going into your account and selecting Purchases and
              Reviews. You should see your items there with a Download Files
              button to the right.
            </p>
            <p>
              Please check you are logging into the same Etsy account that you
              used to buy with.
            </p>
            <p>
              If you purchased as a guest, you'll find a link to download your
              files in the receipt email sent after your purchase. This may take
              a few minutes, and you may need to check all folders if using
              Gmail.
            </p>
            <p>
              Etsy does not currently support downloading from their mobile app.
              Please log in to the Etsy website to download.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
