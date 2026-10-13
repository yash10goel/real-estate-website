import { Users, TrendingUp, ShieldCheck, Award, MapPin, Network } from "lucide-react";

// Single source of truth for RKGC's published figures — reused by the
// Hero credibility rail, the homepage stats dashboard, and the
// Investment page. Keep this the only place these numbers are defined.
export const companyStats = [
  {
    value: 100,
    suffix: "+",
    label: "Team Members",
    subtitle: "Verified Workforce",
    icon: Users,
  },
  {
    value: 150,
    prefix: "₹",
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

// "Our Capability" panel under the homepage hero — the four pillars from
// the company profile. Team/capacity figures mirror companyStats above.
export const capabilities = [
  { title: "Capacity", value: "₹150 Cr", detail: "Working Capacity", icon: TrendingUp, featured: true },
  { title: "Team", value: "100+", detail: "Team Members", icon: Users },
  { title: "Coverage", value: "Greater Noida & NCR", detail: "Area of Operations", icon: MapPin },
  { title: "Network", value: "Multi-Vendor", detail: "Vendor Network", icon: Network },
];
