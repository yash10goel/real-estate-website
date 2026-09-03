import { Helmet } from "react-helmet-async";
import { SITE_NAME, OG_IMAGE_URL, canonicalUrlFor } from "./schema";

// Single reusable per-route SEO component — title, description, canonical,
// Open Graph, Twitter card, robots and optional JSON-LD. Canonical always
// strips query params/trailing slash (via canonicalUrlFor) so filtered views
// (e.g. /projects?category=Realty) collapse to one canonical URL instead of
// creating duplicate-content variants.
export default function Seo({
  title,
  description,
  keywords,
  path = "/",
  noindex = false,
  jsonLd,
}) {
  const canonicalUrl = canonicalUrlFor(path);
  const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noindex ? "noindex,follow" : "index,follow"} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={OG_IMAGE_URL} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={OG_IMAGE_URL} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
