import { Users, TrendingUp, ShieldCheck, Award } from "lucide-react";

// Single source of truth for RKGC's published figures — reused by the
// Hero credibility rail, the homepage stats dashboard, and the
// Investment page. Keep this the only place these numbers are defined.
export const companyStats = [
  {
    value: 80,
    suffix: "+",
    label: "Employees",
    subtitle: "Verified Workforce",
    icon: Users,
  },
  {
    value: 150,
    suffix: " Cr",
    label: "Working Capacity",
    subtitle: "Financial Strength",
    icon: TrendingUp,
  },
  {
    value: 16,
    suffix: " Cr",
    label: "Solvency",
    subtitle: "Audited & Certified",
    icon: ShieldCheck,
  },
  {
    value: 30,
    suffix: "+",
    label: "Years Experience",
    subtitle: "Industry Leadership",
    icon: Award,
  },
];
