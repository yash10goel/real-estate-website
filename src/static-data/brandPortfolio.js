// RKGC Group's brand portfolio — the businesses operating under the
// RKGC name, distinct from the four internal construction verticals
// (Infrastructure/Realty/Agro/Spaces) modeled in verticals.js.
//
// Only fields with confirmed source content are populated. No taglines,
// founding stories, sectors or descriptions are invented — where the
// source material doesn't specify one (e.g. The Hillberg has no
// published tagline), the field is left null and the UI simply omits it.
export const brandPortfolio = [
  {
    id: "the-archi",
    number: "01",
    name: "THE ARCHI",
    shortName: "The Archi",
    tagline: "Embellishing Space",
    meta: "ESTD 2018",
    layout: "text-left",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1400&q=80",
    imageAlt: "The Archi — architectural minimalism",
  },
  {
    id: "moo",
    number: "02",
    name: "MOO",
    shortName: "MOO",
    tagline: "Healthy Farm Milk",
    meta: "by RKGC Group",
    layout: "image-left",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1400&q=80",
    imageAlt: "MOO — healthy farm milk by RKGC Group",
  },
  {
    id: "the-hillberg",
    number: "03",
    name: "THE HILLBERG",
    shortName: "The Hillberg",
    tagline: null,
    meta: null,
    layout: "text-left",
    image: "https://images.unsplash.com/photo-1487147264018-f937fba0c817?w=1400&q=80",
    imageAlt: "The Hillberg",
  },
  {
    id: "organica",
    number: "04",
    name: "ORGANICA",
    shortName: "Organica",
    tagline: "Natural Organic Food",
    meta: null,
    layout: "text-left",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1400&q=80",
    imageAlt: "Organica — natural organic food",
  },
];
