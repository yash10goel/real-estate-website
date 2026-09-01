import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, ChevronLeft, ChevronRight, Leaf } from "lucide-react";
import { brandPortfolio } from "../../static-data/brandPortfolio";
import Container from "../ui/Container";
import Button from "../ui/Button";
import useDocumentMeta from "../../utils/useDocumentMeta";

const corners = [
  "top-6 left-6 border-t border-l",
  "top-6 right-6 border-t border-r",
  "bottom-6 left-6 border-b border-l",
  "bottom-6 right-6 border-b border-r",
];

// Orbit satellite positions, in the same order as brandPortfolio:
// The Archi (top), MOO (left), The Hillberg (right), Organica (bottom).
const orbitPositions = [
  "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
  "top-1/2 left-full -translate-x-1/2 -translate-y-1/2",
  "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
];

function OrbitMark({ brand }) {
  if (brand.id === "the-archi") {
    return (
      <>
        <p className="font-display italic text-[10px] sm:text-xs text-secondary/50 leading-none">The</p>
        <p className="font-display font-bold text-xs sm:text-sm text-secondary tracking-wide leading-tight">ARCHI</p>
      </>
    );
  }
  if (brand.id === "moo") {
    return (
      <>
        <p className="font-heading font-extrabold text-base sm:text-lg text-secondary tracking-tight leading-none">Moo</p>
        <p className="text-[7px] sm:text-[8px] text-secondary/45 uppercase tracking-wide mt-1">Farm Milk</p>
      </>
    );
  }
  if (brand.id === "the-hillberg") {
    return (
      <>
        <p className="font-display text-[9px] sm:text-[10px] font-semibold text-secondary/60 tracking-[0.25em] leading-none">THE</p>
        <p className="font-display text-xs sm:text-sm font-semibold text-secondary tracking-wide leading-tight">HILLBERG</p>
      </>
    );
  }
  return (
    <>
      <Leaf size={13} className="text-[#2F6B4A] mb-1" />
      <p className="font-heading font-bold text-[9px] sm:text-[10px] text-[#2F6B4A] tracking-wide leading-tight">ORGANICA</p>
    </>
  );
}

function BrandOrbit({ activeId, onSelect, reduceMotion }) {
  return (
    <div className="relative w-[240px] sm:w-[300px] lg:w-[360px] aspect-square mx-auto">
      {/* ambient glow */}
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-[60px] pointer-events-none" />

      {/* orbit ring */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        <motion.circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="rgba(244,180,0,0.35)"
          strokeWidth="0.6"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {/* center node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] aspect-square rounded-full bg-secondary border border-primary/30 flex flex-col items-center justify-center text-center shadow-[0_0_40px_-8px_rgba(244,180,0,0.4)]">
        <span className="font-heading font-extrabold text-primary text-xs sm:text-sm tracking-wide leading-none">RKGC</span>
        <span className="text-white/50 text-[8px] sm:text-[9px] tracking-[0.2em] uppercase mt-1">Group</span>
      </div>

      {/* satellites */}
      {brandPortfolio.map((brand, i) => (
        <motion.button
          key={brand.id}
          type="button"
          onClick={() => onSelect(brand.id)}
          aria-current={activeId === brand.id ? "true" : undefined}
          whileHover={reduceMotion ? undefined : { scale: 1.06, y: -2 }}
          transition={{ duration: 0.25 }}
          className={`absolute ${orbitPositions[i]} w-[32%] aspect-square rounded-full bg-white flex flex-col items-center justify-center text-center px-1.5 shadow-[0_10px_30px_-6px_rgba(0,0,0,0.35)] border-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
            activeId === brand.id ? "border-primary" : "border-transparent"
          }`}
        >
          <OrbitMark brand={brand} />
        </motion.button>
      ))}
    </div>
  );
}

function BrandNav({ activeId, onSelect }) {
  const activeIndex = brandPortfolio.findIndex((b) => b.id === activeId);
  const go = (delta) => {
    const next = brandPortfolio[(activeIndex + delta + brandPortfolio.length) % brandPortfolio.length];
    onSelect(next.id);
  };

  return (
    <div className="border-y border-secondary/10 dark:border-white/10">
      <Container>
        <nav aria-label="Brand portfolio navigation" className="flex items-center justify-between gap-6 py-5 lg:py-6">
          <div className="flex items-center gap-8 sm:gap-10 overflow-x-auto no-scrollbar">
            {brandPortfolio.map((brand) => {
              const isActive = activeId === brand.id;
              return (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => onSelect(brand.id)}
                  aria-current={isActive ? "true" : undefined}
                  className="shrink-0 text-left py-1 focus-visible:outline-none"
                >
                  <span className={`block text-[11px] font-semibold tracking-widest mb-1 transition-colors duration-300 ${isActive ? "text-primary" : "text-secondary/40 dark:text-white/40"}`}>
                    {brand.number}
                  </span>
                  <span
                    className={`block font-heading text-sm font-bold uppercase tracking-wide whitespace-nowrap transition-colors duration-300 ${
                      isActive ? "text-secondary dark:text-white" : "text-secondary/45 dark:text-white/45"
                    }`}
                  >
                    {brand.name}
                  </span>
                  <span className={`block h-[2px] bg-primary mt-2 transition-all duration-400 ${isActive ? "w-full" : "w-0"}`} />
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              type="button"
              aria-label="Previous brand"
              onClick={() => go(-1)}
              className="w-9 h-9 rounded-full border border-secondary/15 dark:border-white/15 flex items-center justify-center text-secondary/60 dark:text-white/60 hover:border-primary hover:text-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Next brand"
              onClick={() => go(1)}
              className="w-9 h-9 rounded-full border border-secondary/15 dark:border-white/15 flex items-center justify-center text-secondary/60 dark:text-white/60 hover:border-primary hover:text-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </nav>
      </Container>
    </div>
  );
}

const palettes = {
  "the-archi": { section: "bg-[#0A0E1A] text-white", accent: "text-primary", meta: "text-white/40" },
  moo: {
    section: "bg-[linear-gradient(135deg,#3B2A1D_0%,#6B4226_55%,#8A5A2B_100%)] text-white",
    accent: "text-[#F3C77E]",
    meta: "text-white/50",
  },
  "the-hillberg": {
    section: "bg-[#F3EDE4] dark:bg-[#1B1611] text-secondary dark:text-white",
    accent: "text-secondary/70 dark:text-white/70",
    meta: "text-secondary/40 dark:text-white/40",
  },
  organica: { section: "bg-[#12291E] text-white", accent: "text-[#8FD9A8]", meta: "text-white/40" },
};

function BrandSection({ brand, reduceMotion, registerRef }) {
  const p = palettes[brand.id];
  const isImageLeft = brand.layout === "image-left";
  const ctaVariant = brand.id === "the-hillberg" ? "secondary" : "primary";

  const image = (
    <div className="relative h-[260px] lg:h-full overflow-hidden">
      <motion.img
        src={brand.image}
        alt={brand.imageAlt}
        loading="lazy"
        initial={{ scale: 1.08, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        whileHover={reduceMotion ? undefined : { scale: 1.03 }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );

  const text = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-14 lg:py-0"
    >
      <span className={`font-display italic text-4xl sm:text-5xl leading-none mb-4 ${p.accent}`}>{brand.number}</span>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight mb-3">{brand.name}</h2>
      {brand.tagline && <p className={`text-lg font-display italic mb-1 ${p.accent}`}>{brand.tagline}</p>}
      {brand.meta && <p className={`text-xs font-semibold tracking-[0.25em] uppercase mb-8 ${p.meta}`}>{brand.meta}</p>}
      {!brand.tagline && !brand.meta && <div className="mb-8" />}
      <div>
        <Button to="/contact?subject=General%20Inquiry" variant={ctaVariant} arrow>
          Discover {brand.shortName}
        </Button>
      </div>
    </motion.div>
  );

  return (
    <section
      ref={registerRef}
      data-brand-id={brand.id}
      className={`scroll-mt-28 grid lg:grid-cols-2 lg:min-h-[480px] ${p.section}`}
    >
      {isImageLeft ? (
        <>
          {image}
          {text}
        </>
      ) : (
        <>
          {text}
          {image}
        </>
      )}
    </section>
  );
}

export default function OurBrandPage() {
  useDocumentMeta(
    "Our Brands | RKGC Group",
    "Discover the brands shaping RKGC Group across design, food, lifestyle and emerging businesses — The Archi, MOO, The Hillberg and Organica."
  );

  const reduceMotion = useReducedMotion();
  const sectionRefs = useRef({});
  const closingRef = useRef(null);
  const [activeBrand, setActiveBrand] = useState(brandPortfolio[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveBrand(entry.target.dataset.brandId);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToBrand = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  const scrollToClosing = () => {
    closingRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
  };

  return (
    <div className="bg-bg-light dark:bg-bg-dark transition-colors duration-300">

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-bg-dark text-white pt-32 lg:pt-36 pb-16 lg:pb-20">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(45,212,191,0.7) 0px, rgba(45,212,191,0.7) 1px, transparent 1px, transparent 30px)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(11,18,32,0.2)_0%,_rgba(11,18,32,0.92)_75%)]" />
        <div className="hidden lg:block absolute inset-6 z-[2] pointer-events-none">
          {corners.map((pos) => (
            <span key={pos} className={`absolute w-8 h-8 ${pos} border-white/20`} />
          ))}
        </div>

        <Container className="relative z-[3]">
          <div className="grid lg:grid-cols-[1fr_0.9fr] gap-16 lg:gap-10 items-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
              className="text-center lg:text-left"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-center lg:justify-start gap-3 mb-6"
              >
                <span className="w-8 h-px bg-primary" />
                <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">RKGC Group</span>
              </motion.div>

              <motion.h1
                variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-medium leading-[1.1] mb-6"
              >
                <span className="block text-5xl sm:text-6xl lg:text-[68px]">Our</span>
                <span className="block text-5xl sm:text-6xl lg:text-[68px] italic text-primary">Brands.</span>
              </motion.h1>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className="text-white/70 text-lg sm:text-xl mb-4"
              >
                Different businesses. One RKGC vision.
              </motion.p>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className="text-gray-400 max-w-md mx-auto lg:mx-0 leading-relaxed mb-9"
              >
                Discover the brands shaping RKGC Group across design, food, lifestyle and emerging businesses.
              </motion.p>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }}>
                <button
                  type="button"
                  onClick={scrollToClosing}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 text-white text-sm font-semibold tracking-wide hover:border-primary hover:text-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  One Group. Many Possibilities.
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <BrandOrbit activeId={activeBrand} onSelect={scrollToBrand} reduceMotion={reduceMotion} />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ============ BRAND NAVIGATION ============ */}
      <BrandNav activeId={activeBrand} onSelect={scrollToBrand} />

      {/* ============ BRAND SHOWCASE ============ */}
      <div className="max-w-7xl mx-auto">
        {brandPortfolio.map((brand) => (
          <BrandSection
            key={brand.id}
            brand={brand}
            reduceMotion={reduceMotion}
            registerRef={(el) => (sectionRefs.current[brand.id] = el)}
          />
        ))}
      </div>

      {/* ============ CLOSING CTA ============ */}
      <section ref={closingRef} className="bg-secondary py-16 lg:py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 rounded-[24px] border border-white/10 px-6 sm:px-10 py-8 sm:py-10"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Building2 size={20} className="text-primary" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-white">
                One Group. <span className="text-primary">Many Possibilities.</span>
              </h2>
              <p className="text-white/60 text-sm mt-1.5">
                Explore the brands that make RKGC more than a single business.
              </p>
            </div>
            <Button to="/" variant="primary" arrow className="shrink-0">
              Explore RKGC
            </Button>
          </motion.div>
        </Container>
      </section>

    </div>
  );
}
