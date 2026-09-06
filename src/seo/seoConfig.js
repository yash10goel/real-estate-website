// Per-route title/description/breadcrumb. Single source of truth so no
// page hardcodes its own copy — keeps metadata unique and consistent
// with the brand name "RKGC Group" across every route.

export const seoConfig = {
  "/": {
    title: "RKGC Group | Construction, Infrastructure & Real Estate",
    description:
      "RKGC Group is a diversified Indian business group delivering construction, infrastructure and real estate development — roads, civil works, property development and interior spaces — across India.",
    keywords: "RKGC, RKGC Group, RKGC Group India, Construction, Infrastructure, Real Estate",
  },
  "/our-brand": {
    title: "Our Brands | RKGC Group",
    description:
      "Discover the brands under RKGC Group — Archistylo, Moo Farm, Hillberg and The Farmer Studio — spanning home furnishings, milk products, garments and farm-sourced food.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Our Brands", path: "/our-brand" },
    ],
  },
  "/projects": {
    title: "Projects & Developments | RKGC Group",
    description:
      "Explore RKGC Group's project portfolio across Infrastructure, Realty, Agro and Spaces — roads, railway works, development projects and interior fit-outs delivered across India.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
    ],
  },
  "/contact": {
    title: "Contact RKGC Group",
    description:
      "Get in touch with RKGC Group — offices in Ghaziabad and Dadri, Uttar Pradesh. Reach out for project consultations, partnerships, export enquiries and careers.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ],
  },
  "/investment": {
    title: "Investment | RKGC Group",
    description:
      "Investment opportunities with RKGC Group — a diversified construction, real estate and infrastructure group built on long-term thinking, real assets and diversification.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Investment", path: "/investment" },
    ],
  },
  "/careers": {
    title: "Careers | RKGC Group",
    description:
      "Build your career with RKGC Group. Join a team delivering roads, real estate and infrastructure projects across India — explore current openings.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Careers", path: "/careers" },
    ],
  },
  "/exports": {
    title: "RKGC Exports | Garments & FMCG Export Company from India",
    description:
      "RKGC Exports connects quality Indian garments and FMCG products — active wear, beach wear, Indian suits, bags, spices, cold-pressed oils, flour and rice — with global markets. Send an export enquiry today.",
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Exports", path: "/exports" },
    ],
  },
  "/under-construction": {
    title: "Page Coming Soon | RKGC Group",
    description: "This RKGC Group page is currently being prepared.",
    noindex: true,
  },
};
