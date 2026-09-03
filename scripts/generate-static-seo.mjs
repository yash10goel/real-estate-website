// Postbuild step: writes accurate per-route <title>/description/canonical/
// OG/Twitter/robots/BreadcrumbList into a copy of the built index.html for
// every public route and every real project, plus regenerates sitemap.xml
// from the same data. Runs automatically after `vite build` via npm's
// postbuild hook (see package.json).
//
// Safe by construction: src/main.jsx mounts via ReactDOM.createRoot(...).render()
// (not hydrateRoot), so React always renders fresh into the empty #root div —
// there is no server/client markup to reconcile, so this cannot cause a
// hydration mismatch. In-app client-side <Link> navigation never re-requests
// these files; they only matter for a direct request (a crawler, a shared
// link, a hard refresh, a typed URL).
//
// IMPORTANT: vercel.json has an explicit rewrite for every route this script
// generates (clean path -> its generated .../index.html), because Vercel's
// default static resolution does not reliably serve a directory's index.html
// for the extensionless path without one (verified locally under `vite
// preview`). Adding/removing a project in static-data/projects.js changes the
// paths generated here — update vercel.json's rewrites list to match.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { seoConfig } from "../src/seo/seoConfig.js";
import { breadcrumbSchema, canonicalUrlFor } from "../src/seo/schema.js";
import { getProjectSeo } from "../src/seo/projectSeo.js";
import { projects } from "../src/static-data/projects.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");
const templatePath = join(distDir, "index.html");

if (!existsSync(templatePath)) {
  console.warn("[generate-static-seo] dist/index.html not found — skipping (did `vite build` run?).");
  process.exit(0);
}

const template = readFileSync(templatePath, "utf-8");

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderHtml({ title, description, path, noindex, breadcrumb }) {
  const canonicalUrl = canonicalUrlFor(path);
  let html = template;

  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(
    /<meta name="description" content=".*?"\/>/s,
    `<meta name="description" content="${escapeHtml(description)}"/>`
  );
  html = html.replace(
    /<meta name="robots" content=".*?"\/>/s,
    `<meta name="robots" content="${noindex ? "noindex,follow" : "index,follow"}"/>`
  );
  html = html.replace(
    /<link rel="canonical" href=".*?"\/>/s,
    `<link rel="canonical" href="${canonicalUrl}"/>`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?"\/>/s,
    `<meta property="og:url" content="${canonicalUrl}"/>`
  );
  html = html.replace(
    /<meta property="og:title" content=".*?"\/>/s,
    `<meta property="og:title" content="${escapeHtml(title)}"/>`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?"\/>/s,
    `<meta property="og:description" content="${escapeHtml(description)}"/>`
  );
  html = html.replace(
    /<meta name="twitter:title" content=".*?"\/>/s,
    `<meta name="twitter:title" content="${escapeHtml(title)}"/>`
  );
  html = html.replace(
    /<meta name="twitter:description" content=".*?"\/>/s,
    `<meta name="twitter:description" content="${escapeHtml(description)}"/>`
  );

  if (breadcrumb) {
    const schemaTag = `<script type="application/ld+json">${JSON.stringify(
      breadcrumbSchema(breadcrumb)
    )}</script>\n</head>`;
    html = html.replace("</head>", schemaTag);
  }

  return html;
}

function writeRoute(routePath, html) {
  const outDir = routePath === "/" ? distDir : join(distDir, routePath.replace(/^\//, ""));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "index.html"), html, "utf-8");
}

let count = 0;
const sitemapUrls = [];

for (const [routePath, config] of Object.entries(seoConfig)) {
  const html = renderHtml({ ...config, path: routePath });
  writeRoute(routePath, html);
  count += 1;
  if (!config.noindex) sitemapUrls.push(routePath);
}

for (const project of projects) {
  const seo = getProjectSeo(project);
  const html = renderHtml(seo);
  writeRoute(seo.path, html);
  count += 1;
  sitemapUrls.push(seo.path);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls
  .map(
    (p) => `  <url>
    <loc>${canonicalUrlFor(p)}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`;
writeFileSync(join(distDir, "sitemap.xml"), sitemap, "utf-8");

console.log(
  `[generate-static-seo] wrote ${count} static route(s) and dist/sitemap.xml (${sitemapUrls.length} indexable URLs).`
);
