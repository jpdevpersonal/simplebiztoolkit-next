import { faqs } from "../data/faqs";

export default function FaqAccordion() {
  return (
    <div className="accordion" id="faqAcc">
      {faqs.map((f, idx) => {
        const id = `faq-${idx}`;
        return (
          <div className="accordion-item" key={id} style={{ border: "1px solid var(--sb-border)" }}>
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${idx === 0 ? "" : "collapsed"}`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${id}`}
                aria-expanded={idx === 0 ? "true" : "false"}
                aria-controls={id}
                style={{ fontWeight: 900 }}
              >
                {f.q}
              </button>
            </h2>
            <div
              id={id}
              className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
              data-bs-parent="#faqAcc"
            >
              <div className="accordion-body sb-muted">{f.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
