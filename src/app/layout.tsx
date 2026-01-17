import type { Metadata } from "next";
import { site } from "@/config/site";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/theme.css";
import "@/index.css";
import "@/styles/home.css";
import "@/styles/products.css";
import "@/styles/blog.css";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import StickyMobileCta from "@/components/StickyMobileCta";
import JsonLd from "@/components/JsonLd";
import BootstrapClient from "./BootstrapClient";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Essential Templates & Tools for Small Business Owners`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    locale: site.locale,
    title: `${site.name} | Essential Templates & Tools for Small Business Owners`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Essential Templates & Tools for Small Business Owners`,
    description: site.description,
  },
  icons: {
    icon: [
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/images/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };

  return (
    <html lang="en">
      <body>
        <BootstrapClient />

        <JsonLd json={websiteJsonLd} />

        <a className="sb-skip-link" href="#content">
          Skip to content
        </a>

        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
        <StickyMobileCta />
      </body>
    </html>
  );
}
