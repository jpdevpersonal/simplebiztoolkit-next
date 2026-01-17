import type { Metadata } from "next";
import Image from "next/image";

import EmailCaptureForm from "@/components/EmailCaptureForm";
import { links } from "@/config/links";

export const metadata: Metadata = {
  title: "Free Template",
  description:
    "Get your free guide delivered by email. Try the format and quality before you buy on Etsy.",
  alternates: { canonical: "/free" },
  openGraph: {
    title: "Free Template | Simple Biz Toolkit",
    description:
      "Get your free guide delivered by email. Try the format and quality before you buy on Etsy.",
    url: "/free",
  },
};

export default function FreebiePage() {
  return (
    <section className="sb-section">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <h1 style={{ fontWeight: 900 }}>Free starter template</h1>
            <p className="sb-muted fs-5">
              An essential download you can use today.
            </p>

            <div className="sb-card p-3">
              <div style={{ fontWeight: 900, marginBottom: "0.5rem" }}>
                What you'll get
              </div>
              <ul
                className="sb-muted mb-0"
                style={{ paddingLeft: 0, listStyle: "none" }}
              >
                <li style={{ marginBottom: "0.35rem" }}>
                  ✅ Printable layout (PDF)
                </li>
                <li style={{ marginBottom: "0.35rem" }}>
                  ✅ Simple instructions
                </li>
                <li>✅ A "next steps" link to the full Etsy shop</li>
              </ul>
            </div>

            <div className="mt-3 sb-muted" style={{ fontSize: 13 }}>
              Note: the email delivery is placeholder until you connect
              Mailchimp/MailerLite.
            </div>
          </div>

          <div className="col-lg-6">
            <div className="sb-lead-magnet-card sb-card p-4">
              <h2 style={{ fontWeight: 900 }} className="h4">
                Send it to my inbox
              </h2>
              <p className="sb-muted mb-3">
                Enter your email to receive the download link.
              </p>
              <EmailCaptureForm source="freebie-page" />

              <div className="mt-3 d-flex gap-2 flex-wrap">
                <a
                  className="btn sb-btn-primary"
                  href={links.etsyShopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sb-btn-icon">🛒</span>
                  Shop on Etsy
                  <svg
                    className="sb-btn-arrow"
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 12L12 4M12 4H6M12 4v6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a className="btn sb-btn-ghost" href="/products">
                  Browse categories
                </a>
              </div>
            </div>

            <div className="sb-card p-3 mt-3">
              <Image
                src="/images/placeholder-preview.png"
                className="img-fluid rounded-4"
                alt="Freebie preview placeholder"
                width={1200}
                height={800}
                sizes="(max-width: 992px) 100vw, 520px"
              />
              <div className="sb-muted mt-2" style={{ fontSize: 13 }}>
                Replace with a screenshot of the free template.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
