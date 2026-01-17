import { testimonials } from "../data/testimonials";

export default function TestimonialGrid() {
  return (
    <div className="row g-3">
      {testimonials.map((t) => (
        <div className="col-md-4" key={t.quote}>
          <blockquote
            className="sb-card p-3 h-100"
            style={{ borderLeft: "3px solid var(--sb-brand-blue)", margin: 0 }}
          >
            <p
              style={{
                fontWeight: 500,
                fontStyle: "italic",
                marginBottom: "0.75rem",
              }}
            >
              "{t.quote}"
            </p>
            <cite
              className="sb-muted"
              style={{ fontSize: "0.8125rem", fontStyle: "normal" }}
            >
              — {t.name}, {t.role}
            </cite>
          </blockquote>
        </div>
      ))}
    </div>
  );
}
