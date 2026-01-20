export type BlogPost = {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  dateISO: string;
  category: "Bookkeeping" | "Productivity" | "Etsy Selling" | "Branding";
  readingMinutes: number;
  badges?: string[];
  featuredImage?: string; // Optional image for blog index page
  headerImage?: string; // Optional image for article page header
};

export const posts: BlogPost[] = [
  {
    slug: "bookkeeping-basics-without-an-accountant",
    title: "Bookkeeping basics (without hiring an accountant)",
    subtitle:
      "A simple workflow for tracking income and expenses — plus the easiest way to stay consistent.",
    description:
      "A simple workflow for tracking income and expenses — plus the easiest way to stay consistent.",
    dateISO: "2026-01-01",
    category: "Bookkeeping",
    readingMinutes: 6,
    badges: ["Bookkeeping", "Small Business"],
  },
  {
    slug: "etsy-seller-finances-in-one-place",
    title: "How to track Etsy shop finances in one place",
    subtitle:
      "A beginner-friendly way to track fees, sales, and expenses without spreadsheet pain.",
    description:
      "A beginner-friendly way to track fees, sales, and expenses without spreadsheet pain.",
    dateISO: "2026-01-02",
    category: "Etsy Selling",
    readingMinutes: 7,
    badges: ["Etsy", "Finance"],
  },
  {
    slug: "adobe-express-etsy",
    title:
      "How Adobe Express Helps Etsy Sellers Run a More Efficient, Professional Business",
    subtitle:
      'Running a successful Etsy shop means wearing a suspicious number of hats: creator, photographer, marketer, and designer. Adobe Express can help you do the "visuals" part faster — and make your shop look more consistent and trustworthy while you\'re at it.',
    description:
      "Practical ways Etsy sellers can use Adobe Express to polish product photos, build consistent branding, create social content faster, and produce marketing materials — without needing design expertise.",
    dateISO: "2026-01-20",
    category: "Branding",
    readingMinutes: 8,
    badges: ["Branding", "Product photos", "Social media", "Time-savers"],
  },
];
