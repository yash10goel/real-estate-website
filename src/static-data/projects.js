import { Route, Building2, Sofa, HardHat, Landmark } from "lucide-react";

// Icon + gradient per project type — used for the abstract card treatment
// (no stock photography is attached to named real projects, so nothing
// visually implies a documentary photo of a specific site).
const typeMeta = {
  "Road Construction": { icon: Route, gradient: "from-amber-500 to-orange-600" },
  Infrastructure: { icon: HardHat, gradient: "from-cyan-500 to-blue-600" },
  "Building Construction": { icon: Building2, gradient: "from-blue-500 to-indigo-600" },
  "Commercial Construction": { icon: Landmark, gradient: "from-blue-700 via-secondary to-primary" },
  Interior: { icon: Sofa, gradient: "from-emerald-500 to-teal-600" },
};

// Every project maps to one of the four RKGC business verticals
// (see static-data/verticals.js). Amount/progress figures are sourced
// from the company's own ongoing-projects profile (RKGC PROFILE.pdf).
const rawProjects = [
  {
    id: 1,
    name: "YEIDA Sector 20 Development",
    city: "Yamuna Expressway",
    type: "Road Construction",
    category: "Infrastructure",
    service: "RKGC Infrastructure",
    department: "YEIDA",
    amount: "11.09 Cr",
    progress: "90%",
  },
  {
    id: 2,
    name: "YEIDA Sector 17 Development",
    city: "Yamuna Expressway",
    type: "Road Construction",
    category: "Infrastructure",
    service: "RKGC Infrastructure",
    department: "YEIDA",
    amount: "3.99 Cr",
    progress: "60%",
  },
  {
    id: 3,
    name: "UPSIDA Industrial Development",
    city: "Unnao",
    type: "Infrastructure",
    category: "Infrastructure",
    service: "RKGC Infrastructure",
    department: "UPSIDA",
    amount: "10.52 Cr",
    progress: "93%",
  },
  {
    id: 4,
    name: "NOIDA Sector 5 Development",
    city: "Noida",
    type: "Infrastructure",
    category: "Infrastructure",
    service: "RKGC Infrastructure",
    department: "NOIDA",
    amount: "5.02 Cr",
    progress: "60%",
  },
  {
    id: 5,
    name: "DFC Khurja Corridor Project",
    city: "Khurja",
    type: "Road Construction",
    category: "Infrastructure",
    service: "RKGC Infrastructure",
    department: "DFC",
    amount: "13.65 Cr",
    progress: "80%",
  },
  {
    id: 6,
    name: "PWD Hardoi Road Project",
    city: "Hardoi",
    type: "Road Construction",
    category: "Infrastructure",
    service: "RKGC Infrastructure",
    department: "PWD",
  },
  {
    id: 7,
    name: "Greater Noida Commercial Hub",
    city: "Greater Noida",
    type: "Commercial Construction",
    category: "Infrastructure",
    service: "RKGC Infrastructure",
    description:
      "Premium commercial complex featuring office spaces, retail outlets, modern architecture, and sustainable infrastructure.",
  },
  {
    id: 8,
    name: "Prabhat Height",
    city: "Noida",
    type: "Building Construction",
    category: "Infrastructure",
    service: "RKGC Infrastructure",
  },
  {
    id: 9,
    name: "Golf Green Tower",
    city: "Greater Noida",
    type: "Building Construction",
    category: "Infrastructure",
    service: "RKGC Infrastructure",
  },
  {
    id: 10,
    name: "NV Group Office Interior",
    city: "Delhi",
    type: "Interior",
    category: "Spaces",
    service: "RKGC Spaces",
  },
  {
    id: 11,
    name: "Vidya Polymers Interior",
    city: "Noida",
    type: "Interior",
    category: "Spaces",
    service: "RKGC Spaces",
  },
];

export const projects = rawProjects.map((project) => ({
  ...project,
  ...typeMeta[project.type],
}));
