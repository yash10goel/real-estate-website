// JSON-LD (schema.org) builders. Every field uses only facts already
// present elsewhere in the project (Footer.jsx, Contact.jsx, Pdf/ContactPage.jsx)
// — nothing here is invented.

export const SITE_URL = "https://www.rkgcgroup.com";
export const SITE_NAME = "RKGC Group";
export const LOGO_URL = `${SITE_URL}/apple-touch-icon.png`;

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
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
