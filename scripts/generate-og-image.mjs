// One-off asset generator for public/og-image.png (1200x630 branded social
// preview). Not part of the build — run manually with `node
// scripts/generate-og-image.mjs` after a temporary `npm i -D sharp`
// (sharp is not a runtime/build dependency; uninstall it again afterward).
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "og-image.png");

const WIDTH = 1200;
const HEIGHT = 630;

// Same building-glyph mark as public/favicon.svg, scaled up, on the same
// gold gradient badge, over the site's dark-navy hero background — the
// same visual language as Navbar.jsx's logo lockup, reproduced at social-card size.
const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="badge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F4B400"/>
      <stop offset="1" stop-color="#FFD54F"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="65%">
      <stop offset="0" stop-color="#F4B400" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="#F4B400" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0B1220"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>

  <!-- faint blueprint grid, matching the site's hero motif -->
  <g opacity="0.05" stroke="#FFFFFF" stroke-width="1">
    ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 96}" y1="0" x2="${i * 96}" y2="${HEIGHT}"/>`).join("")}
    ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${i * 90}" x2="${WIDTH}" y2="${i * 90}"/>`).join("")}
  </g>

  <!-- corner frame accents -->
  <g stroke="#FFFFFF" stroke-opacity="0.18" stroke-width="1.5">
    <path d="M48 96 V48 H96" fill="none"/>
    <path d="M${WIDTH - 96} 48 H${WIDTH - 48} V96" fill="none"/>
    <path d="M48 ${HEIGHT - 96} V${HEIGHT - 48} H96" fill="none"/>
    <path d="M${WIDTH - 96} ${HEIGHT - 48} H${WIDTH - 48} V${HEIGHT - 96}" fill="none"/>
  </g>

  <!-- logo badge (favicon.svg's building glyph, scaled up) -->
  <g transform="translate(${WIDTH / 2 - 60}, 140)">
    <rect width="120" height="120" rx="28" fill="url(#badge)"/>
    <rect x="2" y="2" width="116" height="116" rx="26" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2.5"/>
    <g transform="translate(24,24) scale(2.9)" fill="none" stroke="#111827" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 12h4"/>
      <path d="M10 8h4"/>
      <path d="M14 21v-3a2 2 0 0 0-4 0v3"/>
      <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/>
      <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>
    </g>
  </g>

  <!-- wordmark -->
  <text x="50%" y="382" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="72" fill="#ffffff">RKGC <tspan fill="#F4B400">Group</tspan></text>

  <!-- tagline -->
  <text x="50%" y="428" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="19" letter-spacing="7" fill="#F4B400" opacity="0.85">BUILDING LEGACIES</text>

  <!-- positioning line -->
  <text x="50%" y="480" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="400" font-size="21" fill="#ffffff" opacity="0.55">Construction &#183; Real Estate &#183; Infrastructure</text>
</svg>
`;

await sharp(Buffer.from(svg)).png().toFile(outPath);
console.log(`[generate-og-image] wrote ${outPath}`);
