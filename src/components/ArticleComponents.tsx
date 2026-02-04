export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="article-badge">{children}</span>;
}

export function Callout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <aside className="article-callout">
      <div className="article-callout-title">{title}</div>
      <div className="article-callout-content">{children}</div>
    </aside>
  );
}

export function Section({ children }: { children: React.ReactNode }) {
  return <section className="article-section">{children}</section>;
}

export function ArticleFooter({ children }: { children: React.ReactNode }) {
  return <footer className="article-footer">{children}</footer>;
}
