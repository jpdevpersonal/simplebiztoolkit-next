import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description: string;
  canonicalPath?: string;
  noIndex?: boolean;
  jsonLd?: object;
};

export default function Seo({ title, description, canonicalPath, noIndex, jsonLd }: Props) {
  const canonicalUrl = canonicalPath
    ? `https://simplebiztoolkit.com${canonicalPath}`
    : undefined;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
