import {
  Section,
  Callout,
  ArticleFooter,
} from "@/components/ArticleComponents";
// import { ArticleCTA } from "@/components/ArticleCTA";

export default function BookkeepingBasicsContent() {
  return (
    <>
      <Section>
        <p>
          Most small businesses don't need complicated accounting software on
          day one. They need consistency.
        </p>
        <p>
          The biggest mistake new business owners make? They wait until tax
          season to figure out their numbers. By then, receipts are lost,
          transactions are forgotten, and stress is through the roof.
        </p>
      </Section>

      <Section>
        <h2>Start with one simple habit</h2>
        <p>
          Record your income and expenses weekly. That's it. Keep categories
          simple and repeatable:
        </p>
        <ul>
          <li>Sales / Revenue</li>
          <li>Materials / Supplies</li>
          <li>Shipping</li>
          <li>Software / Subscriptions</li>
          <li>Marketing</li>
          <li>Other expenses</li>
        </ul>
        <p>
          You don't need 47 categories. You need categories you'll actually use
          consistently.
        </p>

        <Callout title="Practical win: consistency beats complexity">
          A simple system you use every week beats a fancy system you abandon
          after two weeks. Start simple, then add complexity only when you
          actually need it.
        </Callout>
      </Section>

      <Section>
        <h2>The weekly admin reset</h2>
        <p>
          Set a recurring calendar reminder for a 15-minute weekly admin reset.
          During this time:
        </p>
        <ol>
          <li>Open your ledger or tracking system</li>
          <li>Record all income from the past week</li>
          <li>Record all expenses</li>
          <li>File or photograph any paper receipts</li>
          <li>Note any pending invoices or payments</li>
        </ol>
        <p>
          That's 15 minutes a week. Less than one episode of your favorite show.
          But those 15 minutes will save you hours of panic at tax time.
        </p>
      </Section>

      <Section>
        <h2>Why a printable ledger works</h2>
        <p>
          If you want a ready-made structure, a printable accounting ledger
          gives you a frictionless routine — and that routine is the real win.
        </p>
        <p>
          Physical ledgers work because they reduce decision fatigue. The
          categories are already there. The columns are already set up. You just
          fill in the blanks.
        </p>
        <p>
          Plus, there's something satisfying about writing things down by hand.
          It forces you to slow down and actually look at your numbers, rather
          than just clicking buttons.
        </p>
      </Section>

      {/* <ArticleCTA
        title="Get your bookkeeping started"
        description="Download a free template to start tracking your business finances today."
      /> */}

      <ArticleFooter>
        <p>
          Notes: This article is intended as practical guidance for small
          business owners. For complex tax situations, consult a qualified
          accountant.
        </p>
      </ArticleFooter>
    </>
  );
}
