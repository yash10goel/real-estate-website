import jsPDF from "jspdf";

// RKGC palette, matching the site's design tokens (tailwind.config.js).
const NAVY = [11, 17, 32];
const GOLD = [244, 180, 0];
const IVORY = [245, 245, 242];
const MUTED = [148, 158, 176];
const INK = [20, 24, 34];
const BODY = [70, 76, 90];

export function sanitizeFilename(name) {
  return name
    .trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

// Only ever composed from fields that already exist on the project —
// no client, budget, date, certification or award is invented. Restates
// the source document's own fields (employer, work type, location,
// completed ratio) in a single factual sentence, nothing more.
export function buildFallbackDescription(project) {
  if (project.employer || project.workType) {
    const workType = project.workType ? project.workType.toLowerCase() : "infrastructure";
    let sentence = `An ongoing ${workType} project${project.location ? ` at ${project.location}` : ""}${
      project.employer ? `, undertaken for ${project.employer}` : ""
    }.`;
    if (project.status === "start-soon") {
      sentence += " The project is scheduled to start soon.";
    } else if (project.progress) {
      const article = /^[8aeiou]/i.test(project.progress) ? "an" : "a";
      sentence += ` The project currently has ${article} ${project.progress} completed ratio.`;
    }
    return sentence;
  }

  const verticalName = project.service ? project.service.replace(/^RKGC\s*/, "") : project.category;
  const parts = [`${project.name} is a ${(project.category || "").toLowerCase()} project delivered by RKGC ${verticalName}`];
  if (project.location) parts.push(`in ${project.location}`);
  let sentence = parts.join(", ") + ".";
  if (project.progress) sentence += ` The project is currently ${project.progress} complete.`;
  return sentence;
}

async function imageToDataUrl(url) {
  try {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) return null;
    const blob = await res.blob();
    const format = blob.type.includes("png") ? "PNG" : "JPEG";
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return { dataUrl, format };
  } catch {
    return null;
  }
}

function drawWordmark(doc, x, y) {
  doc.setFillColor(...GOLD);
  doc.roundedRect(x, y, 9, 9, 1.6, 1.6, "F");
  doc.setFillColor(...NAVY);
  doc.rect(x + 2.2, y + 4.2, 1.3, 3.2, "F");
  doc.rect(x + 4.3, y + 2.6, 1.3, 4.8, "F");
  doc.rect(x + 6.4, y + 5, 1.3, 2.4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...IVORY);
  doc.text("RKGC", x + 13, y + 4.6);
  const rkgcWidth = doc.getTextWidth("RKGC ");
  doc.setTextColor(...GOLD);
  doc.text("Group", x + 13 + rkgcWidth, y + 4.6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6);
  doc.setTextColor(...MUTED);
  doc.text("BUILDING LEGACIES", x + 13, y + 8.6);
}

/**
 * Generates and downloads a three-page RKGC project dossier PDF for a
 * single project. Uses jsPDF directly (already a project dependency —
 * no html2canvas/DOM-snapshot step, so there's nothing to break if the
 * page markup changes later, and no CORS-canvas-tainting risk).
 */
export async function generateProjectPdf(project, vertical) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210;
  const pageH = 297;
  const marginX = 18;

  const sourceImage = project.image || vertical?.image;
  const img = sourceImage
    ? await imageToDataUrl(`${sourceImage.split("?")[0]}?w=1400&q=80&fm=jpg`)
    : null;

  // ============ PAGE 1 — COVER ============
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageW, pageH, "F");
  drawWordmark(doc, marginX, 16);

  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.line(marginX, 36, marginX + 14, 36);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...GOLD);
  doc.text("PROJECT DOSSIER", marginX, 42);

  doc.setFont("times", "bold");
  doc.setFontSize(26);
  doc.setTextColor(...IVORY);
  const titleLines = doc.splitTextToSize(project.name.toUpperCase(), pageW - marginX * 2);
  doc.text(titleLines, marginX, 58);

  let coverY = 58 + titleLines.length * 10 + 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...MUTED);
  doc.text(`${project.employer || project.service || project.category}  ·  ${project.location}`, marginX, coverY);

  coverY += 10;
  if (img) {
    const imgW = pageW - marginX * 2;
    const imgH = 128;
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.6);
    doc.rect(marginX - 1, coverY - 1, imgW + 2, imgH + 2);
    doc.addImage(img.dataUrl, img.format, marginX, coverY, imgW, imgH, undefined, "FAST");
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("RKGC Group  ·  Building Legacies", marginX, pageH - 14);

  // ============ PAGE 2 — OVERVIEW + ABOUT ============
  doc.addPage();
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageW, pageH, "F");
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageW, 28, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...GOLD);
  doc.text("PROJECT OVERVIEW", marginX, 17);

  const overviewRows = [
    ["Project Name", project.name],
    project.employer ? ["Employer", project.employer] : null,
    project.workType ? ["Work Type", project.workType] : null,
    !project.employer ? ["Category", project.category] : null,
    ["Location", project.location],
    project.status === "start-soon"
      ? ["Status", "Start Soon"]
      : project.progress
      ? ["Progress", project.progress]
      : null,
    project.amount ? ["Contract Value", `₹${project.amount}`] : null,
  ].filter(Boolean);

  let y = 46;
  overviewRows.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(label.toUpperCase(), marginX, y);
    doc.setFont("times", "normal");
    doc.setFontSize(13);
    doc.setTextColor(...INK);
    doc.text(String(value), marginX + 62, y);
    doc.setDrawColor(228, 228, 222);
    doc.setLineWidth(0.2);
    doc.line(marginX, y + 3.5, pageW - marginX, y + 3.5);
    y += 12;
  });

  y += 8;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.line(marginX, y, marginX + 14, y);
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...GOLD);
  doc.text("ABOUT THE PROJECT", marginX, y);
  y += 9;

  const description = project.description || buildFallbackDescription(project);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(...BODY);
  const descLines = doc.splitTextToSize(description, pageW - marginX * 2);
  doc.text(descLines, marginX, y, { lineHeightFactor: 1.6 });

  // ============ PAGE 3 — VISUAL ============
  doc.addPage();
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageW, pageH, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...GOLD);
  doc.text("PROJECT VISUAL", marginX, 20);

  if (img) {
    const imgW = pageW - marginX * 2;
    const imgH = 158;
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.6);
    doc.rect(marginX - 1, 28, imgW + 2, imgH + 2);
    doc.addImage(img.dataUrl, img.format, marginX, 29, imgW, imgH, undefined, "FAST");
  }

  const footerY = 258;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.3);
  doc.line(marginX, footerY, pageW - marginX, footerY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  doc.text("RKGC Group", marginX, footerY + 8);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("Building Legacies", marginX, footerY + 13);
  doc.text("+91 77352 35277  ·  info@rkgcgroup.com", marginX, footerY + 18);

  doc.save(`RKGC-${sanitizeFilename(project.name)}-Project-Details.pdf`);
}
