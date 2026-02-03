import BookkeepingBasicsContent from "./bookkeeping-basics-without-an-accountant";
import EtsySellerFinancesContent from "./etsy-seller-finances-in-one-place";
import AdobeExpressEtsyContent from "./adobe-express-etsy";
import RentPaymentLedgerContent from "./rent-payment-ledger";

interface ArticleContentProps {
  slug: string;
}

export function ArticleContent({ slug }: ArticleContentProps) {
  switch (slug) {
    case "bookkeeping-basics-without-an-accountant":
      return <BookkeepingBasicsContent />;
    case "etsy-seller-finances-in-one-place":
      return <EtsySellerFinancesContent />;
    case "adobe-express-etsy":
      return <AdobeExpressEtsyContent />;
    case "rent-payment-ledger":
      return <RentPaymentLedgerContent />;
    default:
      return null;
  }
}

export function hasArticleContent(slug: string): boolean {
  return [
    "bookkeeping-basics-without-an-accountant",
    "etsy-seller-finances-in-one-place",
    "adobe-express-etsy",
    "rent-payment-ledger",
  ].includes(slug);
}
