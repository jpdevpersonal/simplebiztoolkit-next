type Props = { items: string[] };

// Map trust items to relevant icons
// const getIcon = (item: string): string => {
//   if (item.includes("rating") || item.includes("★")) return "⭐";
//   if (item.includes("Star Seller")) return "🏆";
//   if (item.includes("Secure") || item.includes("checkout")) return "🔒";
//   if (item.includes("sales")) return "✨";
//   return "✓";
// };

export default function TrustBar({ items }: Props) {
  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start">
      {items.map((t) => (
        <span key={t} className="sb-trust-pill">
          <span style={{ fontSize: "0.875em" }}>⭐</span>
          {t}
        </span>
      ))}
    </div>
  );
}
