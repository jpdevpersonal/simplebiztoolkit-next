export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  dateISO: string;
  category: "Bookkeeping" | "Productivity" | "Etsy Selling";
  readingMinutes: number;
  body: string[]; // paragraphs
};

export const posts: BlogPost[] = [
  {
    slug: "bookkeeping-basics-without-an-accountant",
    title: "Bookkeeping basics (without hiring an accountant)",
    description:
      "A simple workflow for tracking income and expenses — plus the easiest way to stay consistent.",
    dateISO: "2026-01-01",
    category: "Bookkeeping",
    readingMinutes: 6,
    body: [
      "Most small businesses don’t need complicated accounting software on day one. They need consistency.",
      "Start with a single habit: record income and expenses weekly. Keep categories simple and repeatable.",
      "If you want a ready-made structure, a printable accounting ledger gives you a frictionless routine — and that routine is the real win.",
      "Tip: set a recurring calendar reminder for a 15-minute weekly admin reset.",
    ],
  },
  {
    slug: "etsy-seller-finances-in-one-place",
    title: "How to track Etsy shop finances in one place",
    description:
      "A beginner-friendly way to track fees, sales, and expenses without spreadsheet pain.",
    dateISO: "2026-01-02",
    category: "Etsy Selling",
    readingMinutes: 7,
    body: [
      "Etsy fees and payouts can feel like a fog machine. The goal is to make your numbers boring.",
      "Track: gross sales, fees, shipping costs, materials, and profit. Weekly beats perfect.",
      "A simple ledger format keeps you out of analysis paralysis and gives you clean totals for tax time.",
    ],
  },
];
