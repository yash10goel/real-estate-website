// JSON-LD (schema.org) builders. Every field uses only facts already
// present elsewhere in the project (Footer.jsx, Contact.jsx, Pdf/ContactPage.jsx)
// — nothing here is invented.

export const SITE_URL = "https://www.rkgcgroup.com";
export const SITE_NAME = "RKGC Group";
// Square mark for schema.org Organization.logo (Google's logo guidance
// wants a square/near-square image) — distinct from the 1200x630 OG_IMAGE_URL
// social-card asset, which needs the wider aspect ratio.
export const LOGO_URL = `${SITE_URL}/apple-touch-icon.png`;
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

// Single source of truth for building an absolute canonical URL from a
// route path — home keeps a trailing slash ("https://www.rkgcgroup.com/"),
// every other route drops it ("https://www.rkgcgroup.com/our-brand").
// Used by Seo.jsx, breadcrumbSchema, and the postbuild static-seo script,
// so the CSR-rendered canonical and the static HTML baseline can never drift.
export function canonicalUrlFor(path) {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.replace(/\/+$/, "")}`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "RKGC",
    url: SITE_URL,
    logo: LOGO_URL,
    description:
      "RKGC Group is an Indian construction, real estate and infrastructure group, delivering roads, civil infrastructure, real estate development and interior fit-outs across Infrastructure, Realty, Agro and Spaces.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-77352-35277",
      email: "info@rkgcgroup.com",
      contactType: "customer service",
      areaServed: "IN",
    },
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "408, 409 4th Floor, Aditya High Street, Lalkuan",
        addressLocality: "Ghaziabad",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Plot No 2, Vill Kot, Near EPE Toll Plaza",
        addressLocality: "Dadri",
        postalCode: "203207",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
      },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

// items: [{ name, path }] in breadcrumb order, path relative (e.g. "/projects")
export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonicalUrlFor(item.path),
    })),
  };
}
