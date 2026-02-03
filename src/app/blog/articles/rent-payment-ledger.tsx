import {
  Section,
  Callout,
  ArticleFooter,
} from "@/components/ArticleComponents";
import { ArticleCTA } from "@/components/ArticleCTA";

const AFFILIATE_URL =
  "https://www.etsy.com/uk/listing/1273225049/rent-payment-ledger-printable-rent"; // TODO: replace with actual Etsy listing URL

export default function RentPaymentLedgerContent() {
  return (
    <>
      <Section>
        <h2>Why rent tracking becomes a problem so quickly</h2>
        <p>
          Rent is repetitive by nature. Same amount, same due date, month after
          month. Ironically, that's why people assume they don't need a proper
          system. Until something goes wrong.
        </p>
        <p>
          A late payment. A partial payment. A bank transfer made on the wrong
          day. A tenant who swears they paid. A landlord who can't immediately
          verify it.
        </p>
        <p>
          Without a simple ledger, resolving these situations means digging
          through bank apps, scrolling emails, or piecing together screenshots.
          It's inefficient, and it creates tension where there doesn't need to
          be any.
        </p>

        <Callout title="The real problem: fragmented records">
          Payments are scattered across bank statements, emails, screenshots,
          and half-remembered conversations. A rent payment ledger fixes this by
          doing one thing extremely well: it creates a single source of truth.
        </Callout>
      </Section>

      <Section>
        <h2>How landlords benefit from a rent payment ledger</h2>
        <p>
          For landlords, clarity is everything. Whether you manage one property
          or several, you need clean records that are easy to understand at a
          glance.
        </p>
        <p>A rent payment ledger lets you:</p>
        <ul>
          <li>Log each payment by date, amount, and method</li>
          <li>Instantly see missed, late, or partial payments</li>
          <li>Track payment history month-by-month without mental effort</li>
          <li>Keep records ready for tax time or accountant reviews</li>
        </ul>
        <p>
          There's no learning curve. You don't need accounting knowledge. You
          simply record what matters, when it happens.
        </p>
        <p>
          Unlike property management software that charges monthly fees and
          bundles in features you'll never use, this ledger stays focused. It
          respects your time. It works even if you prefer paper, spreadsheets,
          or a tablet.
        </p>
        <p>
          Most importantly, it helps you stay professional. When questions
          arise, you're not relying on memory — you're relying on written
          records.
        </p>
      </Section>

      <Section>
        <h2>How tenants benefit just as much</h2>
        <p>
          This tool isn't only for landlords. Tenants benefit enormously from
          having their own clear payment history.
        </p>
        <p>With a rent payment ledger, tenants can:</p>
        <ul>
          <li>Prove payments were made, on time and in full</li>
          <li>Keep personal records for budgeting and planning</li>
          <li>Avoid disputes caused by missing or unclear information</li>
          <li>Build a documented rental history</li>
        </ul>
        <p>
          If you've ever needed proof of payment for a dispute, a reference, or
          even a future rental application, you already know how valuable this
          is.
        </p>
        <p>
          Instead of trusting that "the bank transfer should be enough," you
          have a clean, organized log that shows responsibility and consistency.
        </p>
      </Section>

      <Section>
        <h2>A tool that reduces friction and stress</h2>
        <p>
          Money conversations are emotionally charged. Anything that reduces
          ambiguity reduces conflict.
        </p>
        <p>
          When both parties know that payments are being logged clearly and
          consistently, trust improves. Conversations stay factual instead of
          emotional. Small issues don't turn into big ones.
        </p>

        <Callout title="Simple beats expensive every time">
          There's a common assumption that good organization requires paid
          software. Monthly subscriptions. Dashboards. Apps that try to do
          everything. In reality, most people don't need complexity. They need
          clarity. This rent payment ledger strips the process back to what
          actually matters: no accounts to manage, no data locked behind
          platforms, no recurring costs.
        </Callout>
      </Section>

      <Section>
        <h2>Why this particular rent payment ledger works</h2>
        <p>
          This isn't a generic spreadsheet thrown together as an afterthought.
          It's been designed specifically for real-world use: clear layout,
          sensible spacing, and no unnecessary clutter.
        </p>
        <ul>
          <li>
            <strong>Practical:</strong> Designed for how rent tracking actually
            happens.
          </li>
          <li>
            <strong>Readable:</strong> Easy to understand at a glance, for both
            landlords and tenants.
          </li>
          <li>
            <strong>Flexible:</strong> Works on paper, tablet, or as a digital
            fill-in sheet.
          </li>
          <li>
            <strong>Durable:</strong> Buy once, use for years without
            subscriptions or updates.
          </li>
        </ul>
        <p>
          Once you start using it, it quickly becomes part of your routine — the
          kind of tool you don't think about anymore because it just works.
        </p>
      </Section>

      <Section>
        <h2>A simple workflow landlords and tenants can copy</h2>
        <ol>
          <li>
            Print or download the rent payment ledger (or grab the digital
            version).
          </li>
          <li>
            Share a copy with your tenant or landlord so you're both on the same
            page.
          </li>
          <li>Log each payment as it's made (date, amount, method).</li>
          <li>Review month-by-month to catch issues early.</li>
          <li>
            Keep copies for your records — they become invaluable at tax time or
            for disputes.
          </li>
        </ol>

        <p>
          That's it. No complex setup. No technical skills required. Just
          clarity and peace of mind.
        </p>
      </Section>

      <ArticleCTA
        title="Ready to make rent tracking effortless?"
        description="If you're tired of digging through bank statements, second-guessing payments, or dealing with avoidable misunderstandings, this rent payment ledger is a small change that makes a big difference. It's affordable, easy to use, and immediately useful from day one."
        primaryLabel="Get Your Rent Payment Ledger"
        primaryHref={AFFILIATE_URL}
        showHomeLink={true}
      />

      <ArticleFooter>
        <p>
          Notes: This article is intended as practical guidance for landlords
          and tenants seeking simple, effective rent payment tracking solutions.
          This is not professional legal or accounting advice.
        </p>
      </ArticleFooter>
    </>
  );
}
