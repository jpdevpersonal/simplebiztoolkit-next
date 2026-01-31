/**
 * Migration Script: Convert Legacy Posts to CMS Format
 *
 * This script converts the existing hardcoded posts in src/data/posts.ts
 * and the React component articles in src/app/blog/articles/ to the CMS
 * TipTap JSON format.
 *
 * Usage:
 *   npx tsx scripts/migrate-posts.ts
 *   npx tsx scripts/migrate-posts.ts --dry-run
 *   npx tsx scripts/migrate-posts.ts --output ./migrated-posts.json
 *
 * Output:
 *   Generates a JSON file with posts ready to be imported via the API.
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// ==============================================
// Types
// ==============================================

interface LegacyPost {
  slug: string;
  title: string;
  description: string;
  dateISO: string;
  featuredImage: string;
}

interface TipTapDocument {
  type: "doc";
  content: TipTapNode[];
}

interface TipTapNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
  marks?: { type: string; attrs?: Record<string, unknown> }[];
  text?: string;
}

interface MigratedPost {
  title: string;
  slug: string;
  excerpt: string;
  content: TipTapDocument;
  coverImageUrl: string;
  status: "draft" | "published";
  publishedAt: string | null;
  seoTitle: string;
  seoDescription: string;
  tagIds: string[];
  legacySlug: string; // For reference
}

// ==============================================
// Post Data
// ==============================================

// Legacy posts from posts.ts (copy the structure here for standalone script)
const legacyPosts: LegacyPost[] = [
  {
    slug: "adobe-express-etsy",
    title: "How to Customize Your Etsy Purchases Using Adobe Express",
    description:
      "Learn to customize your Etsy digital downloads with Adobe Express for free. Step-by-step guide to editing receipts, invoices, and planners.",
    dateISO: "2024-12-15",
    featuredImage: "/images/articles/adobe-express-etsy.jpg",
  },
  {
    slug: "bookkeeping-basics-without-an-accountant",
    title: "Bookkeeping Basics Without an Accountant",
    description:
      "No accountant? No problem. Learn simple bookkeeping practices that keep your finances organized without professional help.",
    dateISO: "2024-11-01",
    featuredImage: "/images/articles/bookkeeping-basics.jpg",
  },
  {
    slug: "etsy-seller-finances-in-one-place",
    title: "Keeping All Your Etsy Seller Finances in One Place",
    description:
      "Stop juggling multiple spreadsheets. Learn how to centralize your Etsy business finances for clearer insights and easier tax prep.",
    dateISO: "2024-10-15",
    featuredImage: "/images/articles/etsy-finances.jpg",
  },
];

// ==============================================
// Content Converters
// ==============================================

/**
 * Create a simple paragraph node
 */
function paragraph(text: string): TipTapNode {
  return {
    type: "paragraph",
    content: [{ type: "text", text }],
  };
}

/**
 * Create a heading node
 */
function heading(level: number, text: string): TipTapNode {
  return {
    type: "heading",
    attrs: { level },
    content: [{ type: "text", text }],
  };
}

/**
 * Create a bullet list
 */
function bulletList(items: string[]): TipTapNode {
  return {
    type: "bulletList",
    content: items.map((item) => ({
      type: "listItem",
      content: [paragraph(item)],
    })),
  };
}

/**
 * Create a callout block
 */
function callout(
  variant: "info" | "warning" | "success" | "error",
  text: string,
): TipTapNode {
  return {
    type: "callout",
    attrs: { variant },
    content: [paragraph(text)],
  };
}

/**
 * Create content with links - returns a paragraph with inline links
 */
function paragraphWithLink(
  before: string,
  linkText: string,
  href: string,
  after: string = "",
): TipTapNode {
  const content: TipTapNode[] = [];

  if (before) {
    content.push({ type: "text", text: before });
  }

  content.push({
    type: "text",
    text: linkText,
    marks: [{ type: "link", attrs: { href } }],
  });

  if (after) {
    content.push({ type: "text", text: after });
  }

  return {
    type: "paragraph",
    content,
  };
}

// ==============================================
// Article Content Definitions
// ==============================================

const articleContent: Record<string, TipTapDocument> = {
  "adobe-express-etsy": {
    type: "doc",
    content: [
      paragraph(
        "So you've just purchased a beautiful digital template from Etsy—a receipt book, planner, or invoice template—but now you need to customize it with your business name, logo, and details. The great news? You don't need expensive software to do it.",
      ),

      paragraph(
        "Adobe Express (formerly Adobe Spark) offers a free, browser-based design tool that makes customizing PDFs and templates surprisingly simple. This guide walks you through the entire process.",
      ),

      heading(2, "What You'll Need"),
      bulletList([
        "Your purchased Etsy digital download (usually a PDF or image file)",
        "A free Adobe Express account",
        "Your business logo and details (optional but recommended)",
        "About 15-20 minutes",
      ]),

      heading(2, "Step 1: Download Your Etsy Purchase"),
      paragraph(
        "After completing your Etsy purchase, navigate to your Purchases and Reviews section. Download all the files—many sellers include multiple file formats (PDF, PNG, JPEG) to give you flexibility.",
      ),

      callout(
        "info",
        "Pro tip: Save your files in a dedicated folder on your computer so you can easily find them later.",
      ),

      heading(2, "Step 2: Create Your Free Adobe Express Account"),
      paragraphWithLink(
        "Visit ",
        "Adobe Express",
        "https://express.adobe.com",
        " and sign up for a free account. You can use your Google, Facebook, or email to register. The free tier includes everything you need for basic customization.",
      ),

      heading(2, "Step 3: Import Your Template"),
      paragraph(
        'Once logged in, click "Create new" and select the appropriate size for your document. For letter-size templates (most common for receipts and invoices), choose 8.5 x 11 inches.',
      ),

      paragraph(
        'Upload your Etsy template by clicking "Upload" and selecting your file. If it\'s a PDF, Adobe Express will convert it to an editable format.',
      ),

      heading(2, "Step 4: Customize Your Template"),
      paragraph(
        "Now comes the fun part! Here's what you can typically customize:",
      ),
      bulletList([
        "Business name and contact information",
        "Logo placement and sizing",
        "Colors to match your brand",
        "Fonts (if the template allows)",
        "Pre-filled information like your address or tax ID",
      ]),

      heading(2, "Step 5: Export and Use"),
      paragraph(
        'When you\'re satisfied with your customizations, click "Download" and choose your preferred format:',
      ),
      bulletList([
        "PDF: Best for printing or emailing to customers",
        "PNG: Good for digital use with transparent backgrounds",
        "JPEG: Smaller file size, good for web use",
      ]),

      heading(2, "Tips for Best Results"),
      bulletList([
        "Keep your original downloaded file as a backup",
        "Create multiple versions if you need different layouts",
        "Test print one copy before printing in bulk",
        "Save your Adobe Express project so you can make future edits",
      ]),

      callout(
        "success",
        "That's it! You've successfully customized your Etsy purchase using a free tool. No expensive software required.",
      ),

      heading(2, "Need Templates to Customize?"),
      paragraphWithLink(
        "Check out our collection of ",
        "business templates on Etsy",
        "https://www.etsy.com/shop/simplebiztoolkit",
        "—all designed to be easily customizable with tools like Adobe Express.",
      ),
    ],
  },

  "bookkeeping-basics-without-an-accountant": {
    type: "doc",
    content: [
      paragraph(
        "Running a small business doesn't mean you need to hire an accountant right away. With some basic knowledge and the right tools, you can handle your own bookkeeping effectively.",
      ),

      heading(2, "Why DIY Bookkeeping Makes Sense"),
      paragraph(
        "For many small businesses—especially side hustles and early-stage ventures—hiring an accountant isn't financially practical. The good news is that basic bookkeeping is learnable, and staying organized yourself has benefits:",
      ),
      bulletList([
        "You understand your finances better",
        "You catch issues early",
        "You're prepared when you do hire help",
        "You save money in the early stages",
      ]),

      heading(2, "The Core Bookkeeping Tasks"),
      heading(3, "1. Track Every Transaction"),
      paragraph(
        "Record every dollar that comes in and goes out. This includes:",
      ),
      bulletList([
        "Sales and income",
        "Business expenses",
        "Transfers between accounts",
        "Payments to yourself",
      ]),

      heading(3, "2. Keep Receipts Organized"),
      paragraph(
        "The IRS requires documentation for business expenses. Create a simple system:",
      ),
      bulletList([
        "Take photos of physical receipts immediately",
        "Create folders by month or category",
        "Use apps like Expensify or simply a dedicated email folder",
        "Match receipts to transactions weekly",
      ]),

      heading(3, "3. Separate Business and Personal"),
      paragraph(
        "This is crucial. Open a dedicated business bank account and credit card. It makes tracking easier and provides liability protection.",
      ),

      callout(
        "warning",
        "Mixing personal and business finances is one of the most common bookkeeping mistakes. Avoid it from day one.",
      ),

      heading(3, "4. Reconcile Monthly"),
      paragraph(
        "Compare your records to your bank statements every month. This catches errors and ensures nothing slipped through the cracks.",
      ),

      heading(2, "Simple Tools That Work"),
      paragraph("You don't need expensive software. Start with:"),
      bulletList([
        "A spreadsheet (Excel or Google Sheets)",
        "A basic ledger book or printable template",
        "A dedicated folder system for receipts",
        "Your bank's transaction export feature",
      ]),

      heading(2, "When to Get Help"),
      paragraph("Consider hiring a professional when:"),
      bulletList([
        "Your revenue exceeds $50,000/year",
        "You have employees",
        "You're dealing with complex tax situations",
        "Bookkeeping takes more than 2-3 hours weekly",
        "You're making financial decisions that need expert input",
      ]),

      callout(
        "info",
        "Even if you hire help later, the habits you build now will make working with an accountant much more efficient.",
      ),

      heading(2, "Get Started Today"),
      paragraph(
        "The best time to start organizing your finances is now. Pick one task from this guide and do it today. Small, consistent efforts add up to excellent financial habits.",
      ),
    ],
  },

  "etsy-seller-finances-in-one-place": {
    type: "doc",
    content: [
      paragraph(
        "If you're an Etsy seller, you know the financial complexity: Etsy fees, payment processing fees, shipping costs, supply expenses, and income from multiple sources. Keeping track of it all can feel overwhelming.",
      ),

      paragraph(
        "The solution? Centralization. Having one place where all your financial information lives makes everything easier—from daily operations to tax time.",
      ),

      heading(2, "The Problem with Scattered Finances"),
      paragraph("Many Etsy sellers fall into these traps:"),
      bulletList([
        "Multiple spreadsheets that don't talk to each other",
        "Receipts scattered across email, photos, and drawers",
        "Etsy statements that don't match bank deposits",
        "No clear picture of actual profit",
        "Tax time panic",
      ]),

      heading(2, "Creating Your Financial Hub"),
      heading(3, "Step 1: Choose Your Primary Tool"),
      paragraph("Pick ONE place for your financial records. Options include:"),
      bulletList([
        "A well-organized spreadsheet",
        "Simple accounting software (Wave, QuickBooks Self-Employed)",
        "A dedicated business ledger",
      ]),

      callout(
        "info",
        "The best tool is the one you'll actually use consistently. Fancy software you ignore is worse than a simple spreadsheet you update weekly.",
      ),

      heading(3, "Step 2: Set Up Your Categories"),
      paragraph("Create categories that match your Etsy business:"),
      bulletList([
        "Income: Etsy sales, direct sales, other platforms",
        "Fees: Etsy listing fees, transaction fees, payment processing",
        "Supplies: Materials, packaging, labels",
        "Shipping: Postage, packaging materials",
        "Marketing: Ads, promoted listings",
        "Tools: Software, equipment",
      ]),

      heading(3, "Step 3: Establish a Routine"),
      paragraph(
        "Consistency beats intensity. A quick 15-minute weekly routine works better than marathon monthly sessions:",
      ),
      bulletList([
        "Download Etsy payment reports",
        "Match deposits to sales",
        "Log expenses",
        "File/organize receipts",
        "Note any questions or anomalies",
      ]),

      heading(2, "Understanding Etsy's Fee Structure"),
      paragraph("Etsy takes several cuts from each sale:"),
      bulletList([
        "Listing fee: $0.20 per item",
        "Transaction fee: 6.5% of sale price (including shipping)",
        "Payment processing: 3% + $0.25 per transaction",
        "Offsite ads fee: 12-15% (if applicable)",
      ]),

      callout(
        "warning",
        "The fees add up! On a $20 sale with $5 shipping, you might pay $2.50+ in fees. Always factor this into your pricing.",
      ),

      heading(2, "Reconciling Etsy with Your Bank"),
      paragraph(
        "Etsy deposits don't match individual sales. Here's how to reconcile:",
      ),
      bulletList([
        "Download your Etsy payment account CSV",
        "Match deposit dates to your bank statement",
        "The deposit = sales - fees for that period",
        "Record the gross sales AND fees separately for accurate profit tracking",
      ]),

      heading(2, "Tax Time Preparation"),
      paragraph("Good centralized records make taxes simple:"),
      bulletList([
        "Total income is clearly documented",
        "Deductible expenses are categorized",
        "Receipts are organized and accessible",
        "Etsy provides 1099-K for verification",
      ]),

      heading(2, "Start Today"),
      paragraph(
        "Don't wait for the perfect system. Start with these three actions:",
      ),
      bulletList([
        "Download your last month's Etsy payment report",
        "Create a simple spreadsheet with income and expense columns",
        "Commit to 15 minutes weekly for updates",
      ]),

      paragraph(
        "A centralized, simple system you maintain consistently will always beat a complex system you ignore.",
      ),
    ],
  },
};

// ==============================================
// Migration Function
// ==============================================

function migratePost(post: LegacyPost): MigratedPost {
  const content = articleContent[post.slug];

  if (!content) {
    // If no content mapping exists, create a placeholder
    console.warn(
      `No content mapping for slug: ${post.slug}. Creating placeholder.`,
    );
    return {
      title: post.title,
      slug: post.slug,
      excerpt: post.description,
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: post.description }],
          },
          {
            type: "callout",
            attrs: { variant: "warning" },
            content: [
              {
                type: "paragraph",
                content: [
                  {
                    type: "text",
                    text: "This content needs to be migrated manually.",
                  },
                ],
              },
            ],
          },
        ],
      },
      coverImageUrl: post.featuredImage,
      status: "draft",
      publishedAt: null,
      seoTitle: post.title,
      seoDescription: post.description,
      tagIds: [],
      legacySlug: post.slug,
    };
  }

  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.description,
    content,
    coverImageUrl: post.featuredImage,
    status: "published",
    publishedAt: new Date(post.dateISO).toISOString(),
    seoTitle: post.title,
    seoDescription: post.description,
    tagIds: [], // Tags would need to be created first, then IDs added
    legacySlug: post.slug,
  };
}

// ==============================================
// CLI
// ==============================================

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const outputIndex = args.indexOf("--output");
  const outputPath =
    outputIndex !== -1
      ? args[outputIndex + 1]
      : join(projectRoot, "migrated-posts.json");

  console.log("🚀 Starting post migration...\n");

  const migratedPosts: MigratedPost[] = [];

  for (const post of legacyPosts) {
    console.log(`📝 Migrating: ${post.title}`);
    const migrated = migratePost(post);
    migratedPosts.push(migrated);
    console.log(`   ✓ Status: ${migrated.status}`);
    console.log(`   ✓ Content nodes: ${migrated.content.content.length}`);
  }

  console.log(`\n📊 Migration complete!`);
  console.log(`   Total posts: ${migratedPosts.length}`);
  console.log(
    `   Published: ${migratedPosts.filter((p) => p.status === "published").length}`,
  );
  console.log(
    `   Draft: ${migratedPosts.filter((p) => p.status === "draft").length}`,
  );

  if (dryRun) {
    console.log(`\n🔍 Dry run - no files written.`);
    console.log(`\nSample output:`);
    console.log(JSON.stringify(migratedPosts[0], null, 2));
  } else {
    writeFileSync(outputPath, JSON.stringify(migratedPosts, null, 2), "utf-8");
    console.log(`\n💾 Output written to: ${outputPath}`);
    console.log(`\nNext steps:`);
    console.log(`1. Review the generated JSON file`);
    console.log(`2. Create tags in the CMS if needed`);
    console.log(`3. Import posts via the API or admin UI`);
  }
}

main();
