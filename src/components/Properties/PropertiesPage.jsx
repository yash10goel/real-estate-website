import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  Compass,
  Handshake,
  Home,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { properties, propertyCategories, heroPropertyIds } from "../../static-data/properties";
import Container from "../ui/Container";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";
import PropertyCard from "./PropertyCard";
import PropertyLightbox from "./PropertyLightbox";
import Seo from "../../seo/Seo";
import { seoConfig } from "../../seo/seoConfig";
import { breadcrumbSchema } from "../../seo/schema";

const EASE = [0.16, 1, 0.3, 1];
const SLIDE_MS = 6000;

const heroSlides = heroPropertyIds.map((id) => properties.find((p) => p.id === id));
const featured = properties.filter((p) => p.featured);
const residenceCount = properties.filter((p) => p.category === "residences").length;
const commercialCount = properties.length - residenceCount;
const microMarkets = [...new Set(properties.map((p) => p.location.split(",")[0]))];

const pillars = [
  {
    icon: Sparkles,
    title: "Handpicked Projects",
    description: "A tight shortlist of developments from established developers — not an endless listing feed.",
  },
  {
    icon: Compass,
    title: "Guided Site Visits",
    description: "We walk the project with you so you see the location, the build and the neighbourhood first-hand.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Advice",
    description: "Straight answers on location, configuration and fit — built on our own experience developing real estate.",
  },
  {
    icon: Handshake,
    title: "End-to-End Support",
    description: "From first shortlist to paperwork and handover, one RKGC point of contact stays with you.",
  },
];

/* ---------------------------------------------------------------- */
/*  Hero                                                            */
/* ---------------------------------------------------------------- */

function Hero({ onExplore }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setTimeout(() => setActive((a) => (a + 1) % heroSlides.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [active]);

  const slide = heroSlides[active];

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-end overflow-hidden bg-bg-dark text-white">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.img
            key={slide.id}
            src={slide.image}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: reduceMotion ? 1.12 : 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4 }, scale: { duration: SLIDE_MS / 1000 + 1.4, ease: "linear" } }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </motion.div>

      {/* Legibility layers */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,32,0.75)_0%,rgba(11,18,32,0.15)_35%,rgba(11,18,32,0.55)_65%,#0B1220_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,18,32,0.85)_0%,rgba(11,18,32,0.25)_60%,transparent_100%)]" />
      <div className="absolute -bottom-40 -left-40 w-[520px] h-[520px] rounded-full bg-primary/20 blur-[160px] pointer-events-none" />

      <motion.div style={{ opacity: contentOpacity }} className="relative z-[2] w-full">
        <Container className="pt-36 pb-12 sm:pb-16">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }}
            className="max-w-3xl"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: EASE }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="w-10 h-px bg-primary" />
              <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">
                RKGC Properties · Greater Noida
              </span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.9, ease: EASE }}
              className="font-display text-[44px] leading-[1.05] sm:text-6xl lg:text-[80px] font-semibold tracking-tight"
            >
              Addresses worth
              <br />
              <span className="italic bg-[linear-gradient(120deg,#FFD54F,#F4B400_45%,#E69A00)] bg-clip-text text-transparent">
                coming home to.
              </span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-6 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed"
            >
              A curated portfolio of golf-side residences, villas and high-street commercial
              spaces across Greater Noida's most connected sectors.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button onClick={onExplore} variant="primary" size="lg">
                Explore Properties
                <ArrowDown size={16} />
              </Button>
              <Button to="/contact?subject=Project%20Consultation" variant="secondary" size="lg" arrow>
                Book a Site Visit
              </Button>
            </motion.div>
          </motion.div>

          {/* Bottom rail: stats + slide indicator */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            className="mt-14 sm:mt-20 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
          >
            <div className="grid grid-cols-3 max-w-lg divide-x divide-white/10 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10">
              {[
                { value: properties.length, label: "Properties" },
                { value: residenceCount, label: "Residences" },
                { value: commercialCount, label: "Commercial" },
              ].map((s) => (
                <div key={s.label} className="px-4 sm:px-6 py-4">
                  <p className="font-heading text-2xl sm:text-3xl font-bold text-white">
                    {String(s.value).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-white/50">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="lg:w-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mb-3"
                >
                  <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/45">Now showing</p>
                  <p className="mt-1 font-heading font-bold text-lg">{slide.name}</p>
                  <p className="flex items-center gap-1.5 text-xs text-white/60">
                    <MapPin size={12} className="text-primary" />
                    {slide.location}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="flex gap-2">
                {heroSlides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show ${s.name}`}
                    className="relative h-1 flex-1 rounded-full bg-white/20 overflow-hidden"
                  >
                    {i === active && (
                      <motion.span
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                        className="absolute inset-0 origin-left bg-primary"
                      />
                    )}
                    {i < active && <span className="absolute inset-0 bg-white/60" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Micro-market marquee                                            */
/* ---------------------------------------------------------------- */

function MarketMarquee() {
  const reduceMotion = useReducedMotion();
  const items = [...microMarkets, ...microMarkets];
  return (
    <div className="relative overflow-hidden border-y border-secondary/10 dark:border-white/10 bg-secondary py-5">
      <motion.div
        animate={reduceMotion ? {} : { x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-12"
      >
        {[...items, ...items].map((m, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap font-display italic text-2xl sm:text-3xl text-white/80">
            {m}
            <span className="w-2 h-2 rotate-45 bg-primary" />
          </span>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-secondary to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-secondary to-transparent" />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  Signature collection                                            */
/* ---------------------------------------------------------------- */

function SignatureCollection({ onOpen }) {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <SectionHeading
            align="left"
            badge="Signature Collection"
            title="Three addresses we'd shortlist first."
            subtitle="Golf-view villas, a 100-acre township and a metro-side commercial tower — the projects our clients ask about most."
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => onOpen(p)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: EASE }}
              className={`group relative block text-left rounded-[30px] overflow-hidden aspect-[4/5] shadow-glass dark:shadow-glass-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                i === 1 ? "md:translate-y-10" : ""
              }`}
            >
              <img
                src={p.image}
                alt={`${p.name}, ${p.location}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/30 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[30px] group-hover:ring-primary/60 transition-colors duration-500" />

              <span className="absolute top-5 left-5 font-display italic text-5xl text-white/25 group-hover:text-primary/80 transition-colors duration-500">
                0{i + 1}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 text-white">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-primary">{p.typology}</p>
                <h3 className="mt-2 font-display text-2xl sm:text-[28px] font-semibold leading-tight">{p.name}</h3>
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500">
                  <p className="overflow-hidden text-sm text-white/65 leading-relaxed">
                    <span className="block pt-2">{p.tagline}</span>
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-white/70">
                    <MapPin size={13} className="text-primary" />
                    {p.location}
                  </span>
                  <span className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:text-secondary group-hover:border-primary transition-all duration-500">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Portfolio (filter + masonry)                                    */
/* ---------------------------------------------------------------- */

function Portfolio({ sectionRef, filtered, category, setCategory, query, setQuery, onOpen }) {
  const counts = {
    all: properties.length,
    residences: residenceCount,
    commercial: commercialCount,
  };

  return (
    <section ref={sectionRef} className="scroll-mt-20 pt-16 pb-24 sm:pb-28 bg-white/60 dark:bg-white/[0.015] border-t border-secondary/[0.06] dark:border-white/[0.06]">
      <Container>
        <SectionHeading
          badge="The Portfolio"
          title="Every property, one place."
          subtitle="Filter by what you're looking for — tap any property for highlights and to enquire."
        />

        {/* Sticky filter bar */}
        <div className="sticky top-[84px] z-30 mt-12 mb-10">
          <div className="mx-auto max-w-3xl flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-[22px] sm:rounded-full p-2 bg-white/85 dark:bg-card-dark/85 backdrop-blur-xl border border-secondary/10 dark:border-white/10 shadow-glass dark:shadow-glass-dark">
            <div className="flex gap-1">
              {propertyCategories.map((c) => {
                const isActive = category === c.slug;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    onClick={() => setCategory(c.slug)}
                    className={`relative flex-1 sm:flex-none rounded-full px-3 sm:px-5 py-2.5 text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-colors duration-300 ${
                      isActive ? "text-secondary" : "text-secondary/55 dark:text-white/55 hover:text-secondary dark:hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="property-filter-pill"
                        className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,#E69A00,#FFC928)] shadow-glow"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative z-[1] inline-flex items-center gap-1.5">
                      {c.slug === "residences" && <Home size={13} />}
                      {c.slug === "commercial" && <Building2 size={13} />}
                      {c.label}
                      <span className={`text-[10px] ${isActive ? "text-secondary/60" : "opacity-50"}`}>{counts[c.slug]}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <label className="relative flex-1 flex items-center">
              <Search size={15} className="absolute left-4 text-secondary/40 dark:text-white/40 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, developer or sector"
                aria-label="Search properties"
                className="w-full rounded-full bg-secondary/[0.04] dark:bg-white/[0.05] pl-10 pr-10 py-2.5 text-sm text-secondary dark:text-white placeholder:text-secondary/40 dark:placeholder:text-white/40 outline-none focus:ring-2 focus:ring-primary/50 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 w-6 h-6 rounded-full flex items-center justify-center text-secondary/50 dark:text-white/50 hover:text-primary"
                >
                  <X size={14} />
                </button>
              )}
            </label>
          </div>
        </div>

        {filtered.length > 0 ? (
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} onOpen={onOpen} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="font-display italic text-2xl text-secondary/70 dark:text-white/70">No properties match “{query}”.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("all");
              }}
              className="mt-4 text-sm font-semibold text-primary hover:underline underline-offset-4"
            >
              Reset filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Why RKGC + CTA                                                  */
/* ---------------------------------------------------------------- */

function WhyRkgc() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20 items-center">
          <div>
            <SectionHeading
              align="left"
              badge="Why Buy With RKGC"
              title="A builder's eye on every address."
              subtitle="We build roads, civil works and real estate ourselves — so we look at a project the way an engineer does, not just a brochure."
            />
            <div className="mt-10 relative rounded-[28px] overflow-hidden aspect-[16/10] shadow-glass dark:shadow-glass-dark">
              <img
                src="/properties/jaypee-greens-golf.webp"
                alt="Jaypee Greens Golf & Spa, Greater Noida"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/60 to-transparent" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className={`group rounded-[26px] p-7 bg-card-light dark:bg-card-dark border border-secondary/[0.07] dark:border-white/[0.07] shadow-glass dark:shadow-glass-dark hover:border-primary/40 transition-colors duration-500 ${
                  i % 2 === 1 ? "sm:translate-y-8" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-secondary group-hover:rotate-6 transition-all duration-500">
                  <p.icon size={20} />
                </div>
                <h3 className="mt-6 font-heading text-lg font-bold text-secondary dark:text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-secondary/60 dark:text-white/60 leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function VisitCta() {
  return (
    <section className="pb-24 sm:pb-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-[34px] text-white"
        >
          <img
            src="/properties/godrej-golf.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,#0B1220_10%,rgba(11,18,32,0.85)_45%,rgba(11,18,32,0.35)_100%)]" />
          <div className="relative px-8 py-14 sm:px-14 sm:py-20 max-w-2xl">
            <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">Site visits this week</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold leading-tight">
              See it in person before you <span className="italic text-primary">decide.</span>
            </h2>
            <p className="mt-5 text-white/70 leading-relaxed">
              Tell us what you're looking for — a golf-side villa, a family apartment or a retail unit
              on the metro line — and we'll line up the right visits.
            </p>
            <div className="mt-9">
              <Button to="/contact?subject=Project%20Consultation" variant="primary" size="lg" arrow>
                Schedule a Visit
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/*  Page                                                            */
/* ---------------------------------------------------------------- */

export default function PropertiesPage() {
  const reduceMotion = useReducedMotion();
  const portfolioRef = useRef(null);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return properties.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!q || [p.name, p.developer, p.location, p.typology].some((f) => f.toLowerCase().includes(q)))
    );
  }, [category, query]);

  const scrollToPortfolio = () =>
    portfolioRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });

  // Lightbox prev/next walks the current filtered list; featured cards open
  // against the full list so they're always navigable.
  const lightboxList = selected && filtered.some((p) => p.id === selected.id) ? filtered : properties;

  return (
    <div className="bg-bg-light dark:bg-bg-dark transition-colors duration-300 overflow-x-clip">
      <Seo
        {...seoConfig["/properties"]}
        path="/properties"
        jsonLd={breadcrumbSchema(seoConfig["/properties"].breadcrumb)}
      />

      <Hero onExplore={scrollToPortfolio} />
      <MarketMarquee />
      <SignatureCollection onOpen={setSelected} />
      <Portfolio
        sectionRef={portfolioRef}
        filtered={filtered}
        category={category}
        setCategory={setCategory}
        query={query}
        setQuery={setQuery}
        onOpen={setSelected}
      />
      <WhyRkgc />
      <VisitCta />

      <PropertyLightbox
        property={selected}
        list={lightboxList}
        onClose={() => setSelected(null)}
        onNavigate={setSelected}
      />
    </div>
  );
}
