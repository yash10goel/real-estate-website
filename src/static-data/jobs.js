// RKGC Group has no live job postings wired up yet, so this ships with a
// single evergreen "general application" entry rather than any fabricated
// specific openings — misrepresenting open roles at a real company (job
// titles, experience requirements, locations that don't actually exist)
// would mislead real candidates. Add real postings to OPEN_POSITIONS below
// as they come up; the whole search/filter/details/apply flow already
// supports them. Shape of a real posting:
//
// {
//   id: "site-engineer-ghaziabad",       // unique, used in the shareable URL
//   title: "Site Engineer",
//   department: "Infrastructure",         // matches an RKGC vertical where relevant
//   location: "Ghaziabad, UP",
//   workMode: "On-site",                  // "On-site" | "Hybrid" | "Remote"
//   type: "Full Time",                    // "Full Time" | "Part Time" | "Contract" | "Internship"
//   experience: "2-5 Years",
//   postedDate: "2026-08-01",             // ISO date
//   description: "Short 1-2 sentence summary shown on the card.",
//   responsibilities: ["...", "..."],
//   requirements: ["...", "..."],
//   niceToHave: ["...", "..."],
//   skills: ["Site Supervision", "AutoCAD", "Quality Control"],
// }

export const OPEN_POSITIONS = [];

// Always present — lets candidates apply even when no specific role matches.
export const GENERAL_APPLICATION = {
  id: "general-application",
  title: "Register Your Interest",
  department: "General",
  location: "Multiple Locations",
  workMode: "On-site",
  type: "Full Time",
  experience: "Any Level",
  postedDate: null,
  isGeneral: true,
  description:
    "Don't see a role that matches right now? Send us your profile and we'll reach out when a fitting opportunity opens up.",
  responsibilities: [],
  requirements: [
    "A clear resume outlining your relevant experience",
    "A short note on the kind of role you're looking for",
  ],
  niceToHave: [],
  skills: [],
};

export function getAllJobs() {
  return [...OPEN_POSITIONS, GENERAL_APPLICATION];
}

export function getJobById(id) {
  return getAllJobs().find((j) => j.id === id) || null;
}

export const DEPARTMENTS = [...new Set(OPEN_POSITIONS.map((j) => j.department))];
export const LOCATIONS = [...new Set(OPEN_POSITIONS.map((j) => j.location))];
export const WORK_MODES = ["On-site", "Hybrid", "Remote"];
export const JOB_TYPES = ["Full Time", "Part Time", "Contract", "Internship"];
