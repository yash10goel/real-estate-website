// Per-project SEO copy — built only from real fields already in
// static-data/projects.js. Single source of truth reused by
// ProjectDetailPage.jsx and the postbuild static-seo script, so the
// title/description text can never drift between the two.
import { projectDetailPath } from "../utils/projectSlug.js";

export function getProjectSeo(project) {
  const path = projectDetailPath(project);
  const locationBit = project.location ? ` in ${project.location}` : "";
  const employerBit = project.employer ? ` for ${project.employer}` : "";
  const workBit = project.workType || project.service || "";

  const description =
    `${project.name} — an RKGC Group ${project.category} project${locationBit}${employerBit}` +
    (workBit ? `. ${workBit}.` : ".");

  return {
    title: `${project.name} | RKGC ${project.category} Projects`,
    description,
    path,
    breadcrumb: [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
      { name: project.name, path },
    ],
  };
}

// Shared, descriptive (never keyword-stuffed) alt text for a project's hero
// photo — reused by ProjectDetailPage.jsx and ProjectDetailsModal.jsx so the
// two never drift, e.g. "RKGC Group Infrastructure project in Tundla".
export function getProjectImageAlt(project) {
  const locationBit = project.location ? ` in ${project.location}` : "";
  return `RKGC Group ${project.category} project${locationBit}`;
}
