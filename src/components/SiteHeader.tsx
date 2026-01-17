import Image from "next/image";
import Link from "next/link";
import { links } from "@/config/links";
import SiteNavigation from "./SiteNavigation";

export default function SiteHeader() {
  return (
    <header
      className="sticky-top sb-site-header"
      style={{
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--sb-border)",
      }}
    >
      <div className="container py-3 d-flex align-items-center justify-content-between gap-3 sb-site-header-inner">
        <Link
          href="/"
          className="d-flex align-items-center gap-2 text-decoration-none sb-site-header-brand"
        >
          <Image
            src="/images/simple-biz-toolkit-logo.png"
            alt="Simple Biz Toolkit"
            width={72}
            height={72}
            style={{ borderRadius: 10, border: "1px solid var(--sb-border)" }}
            priority
          />
          <div>
            <div className="sb-brand-title">Simple Biz Toolkit</div>
            <div className="sb-muted" style={{ fontSize: "0.75rem" }}>
              Templates & Tools for Small Business
            </div>
          </div>
        </Link>

        <SiteNavigation />

        <div className="d-flex align-items-center gap-2 sb-site-header-actions">
          <Link
            href={links.freebiePath}
            className="btn sb-btn-ghost d-none d-sm-inline-flex"
          >
            Get your free guide
          </Link>

          <a
            className="btn sb-btn-primary d-none d-md-inline-flex"
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
        </div>
      </div>
    </header>
  );
}
