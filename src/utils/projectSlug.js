// Slug helpers for real, crawlable per-project URLs (/projects/<category>/<project>).
// Pure functions with no browser/React dependency so they can be imported
// both from the app and from the plain-Node postbuild script.

export const CATEGORY_SLUGS = {
  Infrastructure: "infrastructure",
  Realty: "realty",
  Agro: "agro",
  Spaces: "spaces",
};

// Any run of characters that isn't a-z/0-9 (spaces, en-dashes, punctuation)
// collapses to a single hyphen — sufficient for the real project names in
// static-data/projects.js, all of which are plain ASCII.
export function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function categorySlug(category) {
  return CATEGORY_SLUGS[category] || slugify(category);
}

export function projectDetailPath(project) {
  return `/projects/${categorySlug(project.category)}/${slugify(project.name)}`;
}

export function findProjectBySlug(projects, catSlug, projSlug) {
  return projects.find(
    (p) => categorySlug(p.category) === catSlug && slugify(p.name) === projSlug
  );
}
