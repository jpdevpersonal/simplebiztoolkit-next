import Link from "next/link";
import { links } from "@/config/links";

export default function StickyMobileCta() {
  return (
    <div className="sb-sticky-cta">
      <div className="container d-flex gap-2">
        <a
          className="btn sb-btn-primary flex-fill"
          href={links.etsyShopUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sb-btn-icon">🛒</span>
          Shop on Etsy
        </a>
        <Link className="btn sb-btn-ghost" href={links.freebiePath}>
          Get your free guide
        </Link>
      </div>
    </div>
  );
}
