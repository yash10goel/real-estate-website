import { HardHat, Landmark, Sprout, Sofa } from "lucide-react";

// The four RKGC business verticals — source of truth for Services,
// Projects categorization, and cross-page navigation.
export const verticals = [
  {
    id: "infrastructure",
    number: "01",
    slug: "Infrastructure",
    name: "RKGC Infrastructure",
    tagline: "Roads, highways, buildings & civil infrastructure",
    description:
      "Our founding vertical — delivering roads, highways and civil infrastructure for government authorities and development bodies, alongside commercial and residential building construction executed to the same engineering standard.",
    icon: HardHat,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
  },
  {
    id: "realty",
    number: "02",
    slug: "Realty",
    name: "RKGC Realty",
    tagline: "Real estate development, investment & advisory",
    description:
      "Extending our construction expertise into real estate development, investment and advisory — helping shape land and property into long-term value for investors and communities.",
    icon: Landmark,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  },
  {
    id: "agro",
    number: "03",
    slug: "Agro",
    name: "RKGC Agro",
    tagline: "Sustainable farming, agriculture & agri ventures",
    description:
      "Our newest vertical, channeling the same discipline and long-term thinking behind our infrastructure work into sustainable farming, agriculture and agri ventures.",
    icon: Sprout,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
  },
  {
    id: "spaces",
    number: "04",
    slug: "Spaces",
    name: "RKGC Spaces",
    tagline: "Interior design, fit-outs & turnkey solutions",
    description:
      "Full interior design, fit-out and turnkey execution for corporate and residential spaces — carrying the same build quality from the site to the final finish.",
    icon: Sofa,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
  },
];
