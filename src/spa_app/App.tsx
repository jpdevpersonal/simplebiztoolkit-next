import { useRoutes } from "react-router-dom";
import { routes } from "./routes";

import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import StickyMobileCta from "../components/StickyMobileCta";
import ScrollToTop from "../components/ScrollToTop";

// eslint-disable-next-line react-refresh/only-export-components
export const LINKS = {
  etsyShopUrl: "https://www.etsy.com/shop/simplebiztoolkit",
  // Replace with your actual lead magnet flow later (Mailchimp/MailerLite/etc.)
  freebiePage: "/free",
};

export default function App() {
  const element = useRoutes(routes);

  return (
    <>
      <ScrollToTop />
      <a className="sb-skip-link" href="#content">
        Skip to content
      </a>

      <SiteHeader />
      <main id="content">{element}</main>
      <SiteFooter />

      <StickyMobileCta />
    </>
  );
}
