import { Shirt, Dumbbell, Waves, ShoppingBag, Wheat, Droplets, Sandwich, Sprout } from "lucide-react";

// The two RKGC Exports business divisions and their product lines.
// Images verified against source before use — swap for real product
// photography when available.
export const exportDivisions = [
  {
    id: "garments",
    number: "01",
    name: "Garments",
    tagline: "Performance, Lifestyle & Travel Essentials",
    description:
      "From performance activewear to everyday travel essentials, we manufacture and export apparel built to international quality and compliance standards.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
    products: [
      {
        id: "active-wear",
        name: "Active Wear",
        description: "Performance fabrics engineered for movement and durability.",
        icon: Dumbbell,
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80",
      },
      {
        id: "gym-wear",
        name: "Gym Wear",
        description: "Functional training wear built for comfort under pressure.",
        icon: Shirt,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80",
      },
      {
        id: "beach-wear",
        name: "Beach Wear",
        description: "Lightweight, quick-dry apparel for resort and leisure markets.",
        icon: Waves,
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=80",
      },
      {
        id: "bags",
        name: "Bags",
        description: "Everyday and travel bags crafted for durability and design.",
        icon: ShoppingBag,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80",
      },
    ],
  },
  {
    id: "fmcg",
    number: "02",
    name: "FMCG",
    tagline: "Quality Food Products for Global Markets",
    description:
      "Sourced from trusted growers and processed to consistent quality standards, our FMCG range brings authentic Indian ingredients to kitchens worldwide.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&q=80",
    products: [
      {
        id: "spices",
        name: "Spices",
        description: "Aromatic, export-grade spices sourced from India's finest growing regions.",
        icon: Sprout,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&q=80",
      },
      {
        id: "cold-pressed-oils",
        name: "Cold-Pressed Oils",
        description: "Naturally extracted oils retaining purity and nutritional value.",
        icon: Droplets,
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=900&q=80",
      },
      {
        id: "flour",
        name: "Flour",
        description: "Stone-ground and milled flour for consistent baking performance.",
        icon: Wheat,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80",
      },
      {
        id: "rice",
        name: "Rice",
        description: "Premium long-grain and specialty rice varieties for global kitchens.",
        icon: Sandwich,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=900&q=80",
      },
    ],
  },
];

export const whyExports = [
  {
    number: "01",
    title: "Quality-Assured Products",
    description: "Every batch is checked against consistent quality benchmarks before it leaves our facilities.",
  },
  {
    number: "02",
    title: "Reliable Supply Chain",
    description: "An established sourcing and logistics network built to support recurring bulk orders.",
  },
  {
    number: "03",
    title: "Consistent Product Standards",
    description: "The same specification, batch after batch — critical for international buyers.",
  },
  {
    number: "04",
    title: "Competitive Pricing",
    description: "Direct sourcing relationships that keep pricing competitive without compromising quality.",
  },
  {
    number: "05",
    title: "Flexible Bulk Orders",
    description: "Order volumes structured around your business, not the other way around.",
  },
  {
    number: "06",
    title: "Export Documentation Support",
    description: "End-to-end support with the paperwork international trade requires.",
  },
];
