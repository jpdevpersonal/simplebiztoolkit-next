// productCategories.ts
import type { ProductCategory } from "../types/product";

export const categories: ProductCategory[] = [
  {
    slug: "guides",
    name: "Guides",
    summary: "Short, practical guides to help you work faster and smarter.",
    heroImage: "",
    items: [
      {
        title:
          "AI for Small Business Owners Guide – Save Time & Grow Smarter with AI Tools (PDF)",
        problem:
          "You want to use AI but don’t know where to start (or what actually helps).",
        bullets: [
          "Plain-English walkthrough",
          "Practical examples",
          "Instant download PDF",
        ],
        image: "/images/products/guides/ai-for-small-business.webp",
        etsyUrl:
          "https://www.etsy.com/listing/4361641425/ai-for-small-business-owners-guide-save",
        price: "$3.36",
      },
    ],
  },

  {
    slug: "accounting-ledger",
    name: "Accounting Ledger",
    summary:
      "Simple printable ledgers for bookkeeping, income/expense tracking, and balances.",
    heroImage: "",
    items: [
      {
        title:
          "Printable Accounting Ledger General Ledger Sheet, Money Tracker and Expense Tracker",
        problem:
          "You need a clean way to track income/expenses without a complicated system.",
        bullets: ["General ledger layout", "Print anytime", "A4 + US Letter"],
        image:
          "/images/products/accounting-ledger/accounting-ledger-stat-balance-month-al02.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1194290286/printable-accounting-ledger-general",
        price: "$1.93",
      },
      {
        title:
          "Accounting Ledger Sheet (Fillable + Printable) – Business Account Ledger (PDF)",
        problem:
          "You want a reusable ledger you can type into (not handwrite).",
        bullets: [
          "Fillable PDF",
          "Printable",
          "Ideal for small business bookkeeping",
        ],
        image:
          "/images/products/accounting-ledger/fillable-account-ledger-with-check-box.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1366816474/accounting-ledger-sheet-fillable-and",
        price: "$3.83",
      },
      // {
      //   title:
      //     "Accounting Ledger (Fillable + Printable) – Accounts Template (Instant Download)",
      //   problem: "You want a straightforward ledger that’s quick to complete.",
      //   bullets: ["Fillable PDF", "Simple layout", "Instant download"],
      //   image: "",
      //   etsyUrl:
      //     "https://www.etsy.com/listing/1683213810/accounting-ledger-fillable-and-printable",
      //   price: "$3.38",
      // },
      {
        title:
          "Accounting Ledger (Fillable + Printable) – Alternating Rows Version",
        problem: "You want a ledger that’s easier to read line-by-line.",
        bullets: ["Alternating row styling", "Fillable PDF", "Printable"],
        image:
          "/images/products/accounting-ledger/fillable-accounting-ledger-alternating.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1683205210/accounting-ledger-fillable-and-printable",
        price: "$3.83",
      },
      {
        title:
          "Accounting Ledger Template – Yearly Accounts + General Ledger Sheet (Columnar Paper)",
        problem: "You need a ledger that works across any financial period.",
        bullets: ["Yearly-style structure", "Column layout", "A4 + US Letter"],
        image:
          "/images/products/accounting-ledger/accounting-ledger-al-year-02.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1366270922/accounting-ledger-template-yearly",
        price: "$1.97",
      },
      // {
      //   title:
      //     "Accounting Ledger and General Ledger Sheet – Income/Expense + Money Tracker (A5/Half Letter)",
      //   problem: "You want a compact ledger for binders/notebooks.",
      //   bullets: [
      //     "Smaller paper sizes",
      //     "Income/expense friendly",
      //     "Clean columns",
      //   ],
      //   image: "",
      //   etsyUrl:
      //     "https://www.etsy.com/listing/1592780981/accounting-ledger-and-general-ledger",
      //   price: "$1.82",
      // },
      {
        title:
          "Accounting Ledger – General Ledger Sheets (6 Colors, Wide Margins)",
        problem: "You want color options and binder-friendly margins.",
        bullets: ["6 color set", "Wide margins", "Printable columnar paper"],
        image:
          "/images/products/accounting-ledger/accounting-ledger-six-colour-bundle.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1263178836/accounting-ledger-general-ledger-sheets",
        price: "$2.82",
      },
      {
        title:
          "Accounting Ledger and Money Tracker – Auto Calculating Balance (Fillable PDF)",
        problem:
          "You want your balance calculated automatically (less manual math).",
        bullets: [
          "Auto-calculating balance",
          "Fillable + printable",
          "Bookkeeping friendly",
        ],
        image:
          "/images/products/accounting-ledger/fillable-accounting-ledger-yearly.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1384315830/accounting-ledger-and-money-tracker",
        price: "$3.83",
      },
      {
        title:
          "Printable Accounting Ledger Money Tracker and General Ledger Sheets (Accounts Receivable)",
        problem: "You need a ledger that supports receivables-style tracking.",
        bullets: [
          "Accounts receivable friendly",
          "Printable",
          "Simple bookkeeping layout",
        ],
        image:
          "/images/products/accounting-ledger/accounting-ledger-start-balance-month-v2.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1417451512/printable-accounting-ledger-money",
        price: "$1.97",
      },
      // {
      //   title: "Printable Accounting General Ledger Sheet – Monthly Format",
      //   problem: "You want a monthly ledger that’s easy to file and review.",
      //   bullets: ["Monthly format", "Printable", "A4 + US Letter"],
      //   image: "",
      //   etsyUrl:
      //     "https://www.etsy.com/listing/1222780541/printable-accounting-general-ledger",
      //   price: "$1.97",
      // },
      // {
      //   title:
      //     "Yearly Accounting Ledger – Printable Ledger Sheet (A4 + US Letter)",
      //   problem: "You want one sheet that summarizes a full year cleanly.",
      //   bullets: [
      //     "Yearly layout",
      //     "Standard + wide margin versions",
      //     "Printable PDF",
      //   ],
      //   image: "",
      //   etsyUrl:
      //     "https://www.etsy.com/listing/1170038582/yearly-accounting-ledger-printable",
      //   price: "$1.93",
      // },
      // {
      //   title:
      //     "Printable Accounting Ledger Sheets + Money Tracker – Yearly Format (Violet)",
      //   problem: "You want a yearly ledger in a specific color theme.",
      //   bullets: ["Yearly format", "Violet theme", "Printable PDF"],
      //   image: "",
      //   etsyUrl:
      //     "https://www.etsy.com/listing/1202491640/printable-accounting-ledger-sheets-and",
      //   price: "$1.97",
      // },
      // {
      //   title:
      //     "Printable Accounting Ledger Sheets – Money Tracker + General Ledger (Six Colors)",
      //   problem:
      //     "You want multiple color options for different accounts/projects.",
      //   bullets: [
      //     "Six colors",
      //     "Printable set",
      //     "Great for organizing multiple ledgers",
      //   ],
      //   image: "",
      //   etsyUrl:
      //     "https://www.etsy.com/listing/1177112696/printable-accounting-ledger-sheets-money",
      //   price: "$3.20",
      // },
    ],
  },

  {
    slug: "payment-tracker",
    name: "Payment Tracker",
    summary: "Track what’s due, what’s paid, and what’s outstanding — cleanly.",
    heroImage: "",
    items: [
      {
        title:
          "Payment Tracker – Simple Printable Fee Payment Tracker and Client Payment Log",
        problem:
          "You’re losing track of who paid, who hasn’t, and what’s outstanding.",
        bullets: ["Track due vs paid", "Client history", "Printable PDF"],
        image: "/images/products/payment-tracker/payment-tracker-pay-02.webp",
        etsyUrl:
          "https://www.etsy.com/listing/4328745492/payment-tracker-simple-printable-fee",
        price: "$2.04",
      },
      {
        title:
          "Payment Tracker and Client Payment History Log – Simple Fee Tracker",
        problem: "You need a lightweight way to track ongoing client payments.",
        bullets: [
          "Client payment history",
          "Outstanding amounts",
          "Printable + easy",
        ],
        image:
          "/images/products/payment-tracker/payment-tracker-a4-pay-01.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1302357238/payment-tracker-and-client-payment",
        price: "$2.04",
      },
      {
        title:
          "Payment Tracker – Client Payment History and Fee Payment Tracker (A4 + US Letter)",
        problem: "You need a clear fee tracker you can file per client.",
        bullets: ["Client-based tracking", "A4 + US Letter", "Printable PDF"],
        image:
          "/images/products/payment-tracker/payment-ledger-a4-monthly.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1294509158/payment-tracker-client-payment-history",
        price: "$1.97",
      },
    ],
  },
  {
    slug: "rent-payment-ledger",
    name: "Rent Payment Ledger",
    summary:
      "Simple rent payment logs for landlords — printable and fillable options.",
    heroImage: "",
    items: [
      {
        title:
          "Rent Payment Ledger – Tenant Payment Log (Fillable + Printable) (PDF)",
        problem:
          "You need a reliable record of rent payments and missed payments.",
        bullets: ["Fillable PDF", "Tenant payment history", "Instant download"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1312388593/rent-payment-ledger-tenant-payment-log",
        price: "$3.90",
      },
      {
        title:
          "Rent Payment Ledger – Printable Rent Payment Tracker / Rental Payment Log",
        problem:
          "You want a printable rent log that’s easy to maintain monthly.",
        bullets: [
          "Printable PDF",
          "Landlord-friendly layout",
          "Quick to update",
        ],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1273225049/rent-payment-ledger-printable-rent",
        price: "$2.18",
      },
      {
        title:
          "Printable Rent Payment Tracker – Landlord Ledger / Rental Payment History Log",
        problem:
          "You want a simple rent history sheet you can file by property/tenant.",
        bullets: [
          "Printable tracker",
          "Rental payment history",
          "Instant download",
        ],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1415207427/printable-rent-payment-tracker-landlord",
        price: "$2.18",
      },
    ],
  },

  {
    slug: "time-sheet",
    name: "Time Sheet",
    summary:
      "Time sheets and time trackers for staff, freelancers, and contractors.",
    heroImage: "",
    items: [
      {
        title:
          "Printable Employee Time Sheet Template – Hours Worked Log + Weekly Time Tracker",
        problem:
          "You need a simple way to record hours without messy spreadsheets.",
        bullets: [
          "Printable time sheet",
          "Weekly tracking",
          "Small business ready",
        ],
        image:
          "/images/products/employee-timesheet/employee-weekly-timesheet-a4-1.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1359275270/printable-employee-time-sheet-template",
        price: "$2.00",
      },
      {
        title:
          "Printable Employee Time Sheet Template – Hours Worked + Weekly Tracker (Digital Download)",
        problem:
          "You want a version of a classic weekly time sheet layout that records break time.",
        bullets: ["Printable", "Weekly structure", "Quick to fill in"],
        image:
          "/images/products/employee-timesheet/employee-weekly-timesheet-a4-3.webp",
        etsyUrl:
          "https://www.etsy.com/listing/4436102417/printable-employee-time-sheet-template",
        price: "$2.00",
      },
      {
        title:
          "Weekly Employee Time Sheet – Editable Excel Spreadsheet (Printable)",
        problem: "You want to edit totals quickly and keep digital copies.",
        bullets: ["Editable Excel", "Printable", "Great for payroll prep"],
        image: "/images/products/employee-timesheet/timesheet-excel.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1765516952/weekly-employee-time-sheet-time-tracker",
        price: "$2.11",
      },
      {
        title:
          "Printable Employee Time Sheet – Weekly Work Tracker / Contractor Time Sheet",
        problem:
          "You need a simple weekly tracker for contractors or short-term staff.",
        bullets: ["Weekly tracker", "Printable PDF", "Contractor-friendly"],
        image:
          "/images/products/employee-timesheet/weekly-employee-timeshet-6-colours.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1514062037/printable-employee-time-sheet-weekly",
        price: "$2.53",
      },
      {
        title:
          "Printable Freelancer Time Tracker – Work Time Sheet / Daily Hours Tracker",
        problem: "You need to track billable hours without overthinking it.",
        bullets: ["Daily hours tracking", "Freelancer-friendly", "Printable"],
        image:
          "/images/products/employee-timesheet/employee-timesheet-a4-2.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1388832247/printable-freelancer-time-tracker-work",
        price: "$2.00",
      },
    ],
  },

  {
    slug: "attendance-record",
    name: "Attendance Record",
    summary:
      "Attendance sheets for schools, clubs, events, and staff sign-offs.",
    heroImage: "",
    items: [
      {
        title:
          "School Attendance Record Sheet – Class Attendance Register (Monthly) (A4 Landscape)",
        problem: "You need a clear monthly register that’s easy to review.",
        bullets: ["Monthly register", "A4 landscape", "Printable"],
        image:
          "/images/products/attendance/school-attendance-register-school-att-01.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1670351760/school-attendance-record-sheet-class",
        price: "$2.04",
      },
      {
        title:
          "Attendance Sheet – Printable Attendance Tracker (School/Employees/Students)",
        problem:
          "You need a general-purpose attendance log that works anywhere.",
        bullets: ["Simple grid format", "Printable", "Multi-use"],
        image:
          "/images/products/attendance/attendance-record-person-att-person-01.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1252218381/attendance-sheet-printable-attendance",
        price: "$2.04",
      },
      {
        title:
          "Attendance Tracker – Printable Attendance Sheet for Conference and Events)",
        problem: "You want an attendance log for events and sessions.",
        bullets: ["Event-friendly", "Printable", "Easy check-off"],
        image:
          "/images/products/attendance/attendance-register-club-attend-club-event.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1201911266/attendance-tracker-printable-attendance",
        price: "$2.01",
      },
      {
        title:
          "Attendance Tracker – Printable Attendance Record Sheet (Monthly Format)",
        problem: "You want a monthly-format tracker you can file by month.",
        bullets: ["Monthly format", "Printable PDF", "Simple layout"],
        image:
          "/images/products/attendance/attendance-register-horizontal-monthly-att-monthly.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1179350757/attendance-tracker-printable-attendance",
        price: "$1.97",
      },
    ],
  },
  {
    slug: "petty-cash",
    name: "Petty Cash",
    summary:
      "Log cash-in/cash-out with a clean, low-friction petty cash sheet.",
    heroImage: "",
    items: [
      {
        title:
          "Petty Cash Log – Printable Cash Flow Sheet (Small Business Bookkeeping)",
        problem: "Small cash purchases pile up and you lose track of them.",
        bullets: ["Cash in/out tracking", "Printable PDF", "Simple totals"],
        image: "/images/products/petty-cash/petty-cash-log-a4-single.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1230155489/petty-cash-log-printable-cash-flow-sheet",
        price: "$1.97",
      },
      {
        title:
          "Petty Cash Log – Fillable Printable Cash Flow Sheet (Auto Calcultating Balance)",
        problem: "Fillable and printable so you can easily track cash flow.",
        bullets: ["Cash in/out tracking", "Printable PDF", "Simple totals"],
        image:
          "/images/products/petty-cash/fillable-petty-cash-log-sheet-image.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1230155489/petty-cash-log-printable-cash-flow-sheet",
        price: "$1.97",
      },
    ],
  },
  {
    slug: "expense-and-spending",
    name: "Expense & Spending Trackers",
    summary:
      "Quick templates to track spending, income, and expenses without chaos.",
    heroImage: "",
    items: [
      {
        title:
          "Expense Tracker – Income and Expense Sheet (GoodNotes Template)",
        problem:
          "You need a simple way to track money in/out (especially on tablet).",
        bullets: [
          "Income + expense tracking",
          "GoodNotes-friendly",
          "Clean layout",
        ],
        image:
          "/images/products/expense-tracker/expenses-tracker-no-total.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1662236236/expense-tracker-income-and-expense-sheet",
        price: "$1.86",
      },
      {
        title:
          "Spending Tracker – Printable Income and Expense Tracker and Finance Planner",
        problem:
          "You need a straightforward spending log to stop leaks in your budget.",
        bullets: ["Spending-focused", "Income + expense", "Printable PDF"],
        image:
          "/images/products/expense-tracker/expenses-tracker-month-start-bal.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1245251867/spending-tracker-printable-income-and",
        price: "$1.93",
      },
      {
        title:
          "Bill Payment Tracker – Editable Yearly, Monthly and Quarterly Bills Tracker",
        problem: "Bills slip through the cracks and you miss payments.",
        bullets: [
          "Yearly/monthly/quarterly options",
          "Editable",
          "Instant download",
        ],
        image: "/images/products/expense-tracker/bill-tracker-quarterly.webp",
        etsyUrl:
          "https://www.etsy.com/listing/1466892677/bill-payment-tracker-editable-yearly",
        price: "$1.69",
      },
    ],
  },

  {
    slug: "receipts",
    name: "Receipts",
    summary:
      "Printable receipt templates in multiple styles and color options.",
    heroImage: "",
    items: [
      {
        title:
          "Printable Receipt Template Pack – Customer Receipt + Sales Receipt Forms (Six Colors) (PDF)",
        problem:
          "You need professional-looking receipts without buying receipt books.",
        bullets: ["Six colors", "Printable pack", "Instant download"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1715418738/printable-receipt-template-pack-customer",
        price: "$2.25",
      },
      {
        title:
          "Receipt – Printable Customer Order Receipt Form (A5 + Half Letter)",
        problem:
          "You need a compact receipt form for quick sales/order handoffs.",
        bullets: ["Compact sizes", "Simple layout", "Printable"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1630920679/receipt-printable-customer-order-receipt",
        price: "$1.89",
      },
      {
        title:
          "Receipt Template – Printable Customer Order Form (A4 + US Letter) (PDF)",
        problem:
          "You want a clean receipt you can print on standard paper sizes.",
        bullets: ["A4 + US Letter", "Printable PDF", "Minimalist style"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1566194978/receipt-template-printable-customer",
        price: "$1.97",
      },
    ],
  },

  {
    slug: "sign-in-sheets",
    name: "Sign In Sheets",
    summary:
      "Reception and check-in sheets for visitors, events, and front desks.",
    heroImage: "",
    items: [
      {
        title:
          "Printable Sign In Sheet – Reception Check In Form (A4/US Letter)",
        problem: "You need a simple front-desk sign-in record.",
        bullets: ["Reception-friendly", "A4 + US Letter", "Printable"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1823174365/printable-sign-in-sheet-reception-check",
        price: "$1.83",
      },
      {
        title:
          "Printable Sign In Sheet – Reception Check In/Out Form (A4/US Letter)",
        problem: "You need both arrival and departure times in one place.",
        bullets: ["Check-in/out", "A4 + US Letter", "Printable"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1684474079/printable-sign-in-sheet-reception-check",
        price: "$1.83",
      },
    ],
  },

  {
    slug: "meeting-notes",
    name: "Meeting Notes",
    summary:
      "Agenda + minutes templates for client meetings and internal notes.",
    heroImage: "",
    items: [
      {
        title:
          "Meeting Notes Template – Agenda Planner (Printable Word Document A4/US Letter)",
        problem: "Meeting notes end up scattered and hard to follow later.",
        bullets: ["Agenda + notes", "Word format", "A4 + US Letter"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1730107410/meeting-notes-template-agenda-planner",
        price: "$1.90",
      },
      {
        title:
          "Meeting Notes Template Printable – Simple Meeting Notes Form (A4/A5/Letter/Half Letter)",
        problem: "You want a simple, printable notes sheet without fluff.",
        bullets: ["Multiple sizes", "Printable", "Clean layout"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1348243646/meeting-notes-template-printable-simple",
        price: "$1.86",
      },
    ],
  },

  {
    slug: "estimates",
    name: "Estimates & Quotes",
    summary: "Estimate/quote templates in printable and fillable formats.",
    heroImage: "",
    items: [
      {
        title:
          "Estimate and Quote Template – Fillable and Printable Simple Estimate Form (Fillable PDF)",
        problem:
          "You need quotes you can send fast without rebuilding a doc each time.",
        bullets: ["Fillable PDF", "Professional layout", "Instant download"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1421249069/estimate-and-quote-template-fillable-and",
        price: "$3.45",
      },
      {
        title: "Estimate and Quote Template – Simple Estimate Form (Printable)",
        problem:
          "You want a simple printable quote sheet you can use on demand.",
        bullets: ["Printable", "Clean estimate layout", "Fast to complete"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1401560272/estimate-and-quote-template-simple",
        price: "$2.00",
      },
    ],
  },

  {
    slug: "invoices",
    name: "Invoices",
    summary: "Minimalist invoices you can print and use immediately.",
    heroImage: "",
    items: [
      {
        title:
          "Invoice Template – Minimalist Invoice (Printable) (Instant Download PDF)",
        problem: "You need a clean invoice format without design work.",
        bullets: ["Minimalist layout", "Printable PDF", "Small business ready"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1707889862/invoice-template-printable-customer",
        price: "$1.83",
      },
    ],
  },

  {
    slug: "order-forms-and-trackers",
    name: "Order Forms & Trackers",
    summary:
      "Order forms and trackers to keep sales, fulfillment, and records tidy.",
    heroImage: "",
    items: [
      {
        title:
          "Order Form Template – Purchase Order Form + Simple Printable Customer Order (GoodNotes Template)",
        problem: "Orders get messy when you don’t have one consistent form.",
        bullets: ["Order form", "GoodNotes-friendly option", "Printable"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1725782753/order-form-template-purchase-order-form",
        price: "$1.83",
      },
      {
        title:
          "Printable Order Tracker – Customer Order History and Sales (PDF)",
        problem: "You need to track what’s ordered, shipped, and completed.",
        bullets: ["Order history", "Printable tracker", "Simple workflow"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1299688737/printable-order-tracker-customer-order",
        price: "$1.94",
      },
    ],
  },

  {
    slug: "tips-and-service",
    name: "Tips & Service Trackers",
    summary: "Tip tracking templates for service workers and staff.",
    heroImage: "",
    items: [
      {
        title:
          "Tips Tracker – Printable Server Tips Tracker (Excel Spreadsheet Template)",
        problem:
          "Tips are hard to track consistently (and you lose the record).",
        bullets: ["Excel-based tracking", "Printable", "Daily/shift friendly"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1791051126/tips-tracker-printable-server-tips",
        price: "$1.90",
      },
      {
        title: "Server Tips Tracker – Simple Tips Record (Printable PDF)",
        problem:
          "You want a simple paper log for tips (no spreadsheet needed).",
        bullets: ["Printable PDF", "Quick daily entry", "Simple totals"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1712139010/server-tips-tracker-simple-tips-record",
        price: "$1.83",
      },
    ],
  },

  {
    slug: "storyboards",
    name: "Storyboards",
    summary:
      "Storyboard templates for creators, planners, and film/video workflows.",
    heroImage: "",
    items: [
      {
        title:
          "Storyboard 6x9 Printable Template – Digital Collage Template and YouTube Planner (4 Frames)",
        problem:
          "You need a fast way to plan shots/scenes without messy notes.",
        bullets: ["4 frames per page", "Printable", "Creator-friendly"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1653524525/storyboard-6x9-printable-template",
        price: "$1.97",
      },
      {
        title:
          "Storyboard Template Printable – Storyboard Planner + Digital Collage Template (A4/US Letter)",
        problem:
          "You want a versatile storyboard that fits standard paper sizes.",
        bullets: ["A4 + US Letter", "Storyboard planner layout", "Printable"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1237652424/storyboard-template-printable-storyboard",
        price: "$2.04",
      },
      {
        title:
          "Storyboard Printable Template – Digital Collage Template and YouTube Planner",
        problem: "You want a clean storyboard layout for creative planning.",
        bullets: ["Printable", "YouTube/film planning", "Simple structure"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1413674238/storyboard-printable-template-digital",
        price: "$2.04",
      },
      {
        title:
          "Storyboard Template A4 Printable – Storyboard Planner + Film Planner",
        problem: "You want an A4-focused storyboard format that prints nicely.",
        bullets: ["A4 optimized", "Printable", "Film planning friendly"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1215935073/storyboard-template-a4-printable",
        price: "$2.04",
      },
    ],
  },

  {
    slug: "amateur-radio",
    name: "Amateur Radio",
    summary: "Ham radio logging sheets and personalized log templates.",
    heroImage: "",
    items: [
      {
        title:
          "Ham Radio Log Sheets – Printable Amateur Radio Log, Logbook and QSL Sheets",
        problem: "You need a tidy log format for contacts and records.",
        bullets: ["Printable log sheets", "Binder-friendly", "Great gift idea"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1220494947/ham-radio-log-sheets-printable-amateur",
        price: "$2.11",
      },
      {
        title:
          "Personalized Ham Radio Log Sheet – Amateur Radio Call Sign (Digital Download)",
        problem: "You want a customized log sheet with your call sign.",
        bullets: ["Personalized", "Printable", "Nice for gifts"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1478042418/personalized-ham-radio-log-sheet-amateur",
        price: "$4.22",
      },
    ],
  },

  {
    slug: "business-ledger-bundles",
    name: "Business Ledger Bundles",
    summary:
      "Bundles that combine the core templates: accounting, orders, payments, and cash.",
    heroImage: "",
    items: [
      {
        title:
          "Business Ledger Templates Bundle – Accounting, Invoice, Petty Cash, Order Tracker, Estimate and Time Sheet",
        problem:
          "You want the essentials in one pack instead of buying separately.",
        bullets: [
          "8 essential forms",
          "Instant download",
          "Small business focused",
        ],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1805181510/business-ledger-templates-accounting",
        price: "$7.04",
      },
      {
        title:
          "Business Ledger Template Bundle – Accounting Ledger, Petty Cash, Order & Payment Trackers",
        problem: "You want a compact bundle for core admin tracking.",
        bullets: [
          "4 core templates",
          "A4 + US Letter",
          "Standard + wide margins",
        ],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1340991925/business-ledger-template-bundle",
        price: "$2.73",
      },
      {
        title:
          "Small Business Ledger Bundle – Accounting, Order & Payment Trackers (PDF)",
        problem: "You want a small set of high-use trackers (no extras).",
        bullets: [
          "Accounting + orders + payments",
          "Printable PDFs",
          "Simple layouts",
        ],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1298947107/small-business-ledger-bundle-accounting",
        price: "$2.11",
      },
      {
        title: "Rent Payment Ledger + Tenant Payment Log (Fillable) (PDF)",
        problem: "You want a landlord-ready bundle-style rent record option.",
        bullets: ["Fillable PDF", "Tenant history", "Instant download"],
        image: "",
        etsyUrl:
          "https://www.etsy.com/listing/1312388593/rent-payment-ledger-tenant-payment-log",
        price: "$3.90",
      },
    ],
  },
];
