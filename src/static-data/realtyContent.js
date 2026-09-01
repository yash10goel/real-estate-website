import { Building2, Home, Sprout, Layers } from "lucide-react";

// RKGC Realty's four sub-verticals, shown in the Projects → Realty
// diagram. These are product categories within Realty (real estate
// development types) — distinct from the separate top-level "RKGC Agro"
// business vertical, even though "Agriculture" real estate overlaps in
// name. No project counts, locations or figures are asserted here.
export const realtyCategories = [
  {
    id: "commercial",
    name: "Commercial",
    icon: Building2,
    description: "Creating workspaces that empower businesses to grow.",
  },
  {
    id: "residential",
    name: "Residential",
    icon: Home,
    description: "Designing homes that elevate everyday living.",
  },
  {
    id: "agriculture",
    name: "Agriculture",
    icon: Sprout,
    description: "Sustainable farming and agri-spaces for a greener tomorrow.",
  },
  {
    id: "mixed-use",
    name: "Mixed Use",
    icon: Layers,
    description: "Integrated spaces that bring work, living & leisure together.",
  },
];
