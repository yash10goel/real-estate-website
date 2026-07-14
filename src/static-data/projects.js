const gradientByType = {
  "Road Construction": "from-amber-500 to-orange-600",
  "Infrastructure": "from-cyan-500 to-blue-600",
  "Interior": "from-emerald-500 to-teal-600",
  "Building Construction": "from-blue-500 to-indigo-600",
  "Commercial Construction": "from-blue-700 via-secondary to-primary",
};

export const projects = [
  {
    id: 1,
    name: "YEIDA Sector 20 Development",
    city: "Yamuna Expressway",
    type: "Road Construction",
  },
  {
    id: 2,
    name: "Greater Noida Commercial Hub",
    city: "Greater Noida",
    type: "Commercial Construction",
    description:
      "Premium commercial complex featuring office spaces, retail outlets, modern architecture, and sustainable infrastructure.",
  },
  {
    id: 3,
    name: "NOIDA Sector 5 Development",
    city: "Noida",
    type: "Infrastructure",
  },
  {
    id: 4,
    name: "DFC Khurja Corridor Project",
    city: "Khurja",
    type: "Road Construction",
  },
  {
    id: 5,
    name: "PWD Hardoi Road Project",
    city: "Hardoi",
    type: "Road Construction",
  },
  {
    id: 6,
    name: "NV Group Office Interior",
    city: "Delhi",
    type: "Interior",
  },
  {
    id: 7,
    name: "Vidya Polymers Interior",
    city: "Noida",
    type: "Interior",
  },
  {
    id: 8,
    name: "Prabhat Height",
    city: "Noida",
    type: "Building Construction",
  },
  {
    id: 9,
    name: "Golf Green Tower",
    city: "Greater Noida",
    type: "Building Construction",
  },
].map((project) => ({
  ...project,
  gradient: gradientByType[project.type] || "from-primary to-accent",
}));
