import { Helmet } from "react-helmet-async";
import { SITE_NAME, SITE_URL, LOGO_URL } from "./schema";

// Single reusable per-route SEO component — title, description, canonical,
// Open Graph, Twitter card, robots and optional JSON-LD. Canonical always
// strips query params/trailing slash so filtered views (e.g. /projects?category=Realty)
// collapse to one canonical URL instead of creating duplicate-content variants.
export default function Seo({
  title,
  description,
  path = "/",
  noindex = false,
  jsonLd,
}) {
  const cleanPath = path === "/" ? "" : path.replace(/\/+$/, "");
  const canonicalUrl = `${SITE_URL}${cleanPath}`;
  const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noindex ? "noindex,follow" : "index,follow"} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={LOGO_URL} />
      <meta property="og:image:width" content="180" />
      <meta property="og:image:height" content="180" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={LOGO_URL} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
