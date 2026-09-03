import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { brandPortfolio } from "../../static-data/brandPortfolio";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Seo from "../../seo/Seo";
import { seoConfig } from "../../seo/seoConfig";
import { breadcrumbSchema } from "../../seo/schema";

const [archi, moo, hillberg, organica] = brandPortfolio;

// Minimal gold text+arrow CTA — no filled buttons inside the chapters,
// so gold stays an accent rather than a repeated pattern.
function DiscoverLink({ brand }) {
  return (
    <Link
      to="/contact?subject=General%20Inquiry"
      className="group inline-flex items-center gap-2 text-primary text-sm font-semibold tracking-wide hover:text-accent transition-colors duration-300 focus-visible:outline-none"
    >
      Discover {brand.shortName}
      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

function GhostNumber({ children, className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none select-none absolute font-display italic leading-none ${className}`}
    >
      {children}
    </span>
  );
}

// ============================================================
// HERO COMPASS — replaces the earlier orbit/list concepts with a
// minimal line-and-ring diagram: a ghosted vertical "RKGC" wordmark,
// a thin ring + cross, and the four brands at the compass points.
// ============================================================

const compass = [
  { pos: "top-0 left-1/2 -translate-x-1/2 items-center text-center", stub: "left-1/2 -translate-x-1/2 top-full w-px h-7" },
  { pos: "top-1/2 left-0 -translate-y-1/2 items-start text-left", stub: "top-1/2 -translate-y-1/2 left-full w-7 h-px" },
  { pos: "top-1/2 right-0 -translate-y-1/2 items-end text-right", stub: "top-1/2 -translate-y-1/2 right-full w-7 h-px" },
  { pos: "bottom-0 left-1/2 -translate-x-1/2 items-center text-center", stub: "left-1/2 -translate-x-1/2 bottom-full w-px h-7" },
];

function HeroCompass({ onSelect, reduceMotion }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[460px] sm:max-w-[540px] lg:max-w-[620px] aspect-square mx-auto"
    >
      {/* soft central illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full bg-primary/[0.08] blur-[70px] pointer-events-none" />

      {/* ghosted vertical RKGC wordmark */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
        {["R", "K", "G", "C"].map((l) => (
          <span key={l} className="font-display italic font-medium text-primary/[0.09] text-[clamp(3.25rem,8vw,5.75rem)] leading-[0.8]">
            {l}
          </span>
        ))}
      </div>

      {/* rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[56%] aspect-square rounded-full border border-primary/25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] aspect-square rounded-full border border-primary/10" />

      {/* cross + center glow */}
      <span className="absolute top-1/2 left-[4%] right-[4%] h-px bg-primary/20" />
      <span className="absolute left-1/2 top-[4%] bottom-[4%] w-px bg-primary/20" />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_30px_8px_rgba(244,180,0,0.5)]" />

      {/* four brands at compass points */}
      {brandPortfolio.map((brand, i) => (
        <button
          key={brand.id}
          type="button"
          onClick={() => onSelect(brand.id)}
          aria-label={`View ${brand.name}`}
          className={`group absolute flex flex-col ${compass[i].pos} focus-visible:outline-none`}
        >
          <span className={`absolute bg-primary/25 ${compass[i].stub}`} aria-hidden="true" />
          <span className="font-heading text-base sm:text-lg font-bold uppercase tracking-wide text-white group-hover:text-primary transition-colors duration-300">
            {brand.name}
          </span>
          {brand.tagline ? (
            <span className="text-white/40 text-xs sm:text-sm mt-1">{brand.tagline}</span>
          ) : (
            <span className="block w-6 h-px bg-primary/60 mt-2" />
          )}
        </button>
      ))}
    </motion.div>
  );
}

// ============================================================
// STICKY CHAPTER NAV — a real grid column (not a floating overlay),
// so it can never collide with chapter content. Sticks within its
// own column as the four chapters scroll past.
// ============================================================

function ChapterNav({ activeId, onSelect }) {
  return (
    <div className="hidden lg:block relative bg-[#0A0E1A]">
      <div className="sticky top-28 pl-5 xl:pl-7 pr-3 py-4">
        <div className="flex flex-col gap-8">
          {brandPortfolio.map((brand) => {
            const isActive = activeId === brand.id;
            return (
              <button
                key={brand.id}
                type="button"
                onClick={() => onSelect(brand.id)}
                aria-current={isActive ? "true" : undefined}
                className="block text-left focus-visible:outline-none"
              >
                <span className={`block font-display italic text-sm mb-1 transition-colors duration-300 ${isActive ? "text-primary" : "text-white/25"}`}>
                  {brand.number}
                </span>
                <span
                  className={`block text-xs font-bold uppercase tracking-wide transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/35"
                  }`}
                >
                  {brand.name}
                </span>
                <span className={`block h-px bg-primary mt-2 transition-all duration-400 ${isActive ? "w-7" : "w-0"}`} />
              </button>
            );
          })}
        </div>

        <div className="hidden xl:flex flex-col items-start gap-3 mt-20">
          <span className="text-white/25 text-[10px] tracking-widest uppercase [writing-mode:vertical-rl]">Scroll Down</span>
          <span className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-white/40 text-[10px]">1</span>
        </div>
      </div>
    </div>
  );
}

// Compact horizontal equivalent for mobile/tablet, where the sticky
// column is hidden.
function MobileChapterNav({ activeId, onSelect }) {
  return (
    <div className="lg:hidden bg-[#0A0E1A] border-b border-white/10 overflow-x-auto no-scrollbar">
      <div className="flex gap-8 px-6 py-4 min-w-max">
        {brandPortfolio.map((brand) => {
          const isActive = activeId === brand.id;
          return (
            <button
              key={brand.id}
              type="button"
              onClick={() => onSelect(brand.id)}
              aria-current={isActive ? "true" : undefined}
              className="text-left shrink-0 focus-visible:outline-none"
            >
              <span className={`block font-display italic text-xs mb-0.5 ${isActive ? "text-primary" : "text-white/30"}`}>{brand.number}</span>
              <span className={`block text-xs font-bold uppercase tracking-wide ${isActive ? "text-white" : "text-white/40"}`}>{brand.name}</span>
              <span className={`block h-px bg-primary mt-1.5 transition-all duration-300 ${isActive ? "w-6" : "w-0"}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
// FOUR CHAPTERS — no gaps between them; each flows directly into
// the next, alternating layout and palette per brand.
// ============================================================

function BrandChapter({ brand, number, registerRef, reduceMotion }) {
  return (
    <section
      ref={registerRef}
      id={brand.id}
      data-brand-id={brand.id}
      aria-labelledby={`${brand.id}-heading`}
      className="group relative bg-[#080D18] text-white px-5 sm:px-8 lg:px-14 py-10 lg:py-14 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] bg-[size:48px_48px]" />

      <div className="relative max-w-[1320px] mx-auto border border-primary/15 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.28)]">
        <div className="grid lg:grid-cols-[0.72fr_1.28fr] min-h-[390px]">
          <div className="relative z-10 flex flex-col justify-center px-7 sm:px-10 lg:px-14 py-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-primary" />
              <span className="text-primary text-[9px] font-semibold tracking-[0.3em] uppercase">RKGC Portfolio</span>
            </div>
            <span className="font-display italic text-primary text-sm mb-3">{number}</span>
            <h2
              id={`${brand.id}-heading`}
              className="font-display text-4xl sm:text-5xl lg:text-[4.35rem] font-medium leading-[0.9] tracking-tight"
            >
              {brand.name}
            </h2>
            <p className="font-display italic text-primary text-lg mt-3">{brand.tagline}</p>
            {brand.meta && (
              <p className="text-primary/55 text-[10px] font-semibold tracking-[0.25em] uppercase mt-2">
                {brand.meta}
              </p>
            )}
            <div className="mt-8"><DiscoverLink brand={brand} /></div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[300px] lg:min-h-[430px] border-l border-primary/20 overflow-hidden bg-[#050A12]"
          >
            <GhostNumber className="right-5 top-2 text-[8rem] lg:text-[10rem] text-white/[0.045]">{number}</GhostNumber>
            <img
              src={brand.image}
              alt={brand.imageAlt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080D18]/80 via-[#080D18]/10 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050A12]/65 via-transparent to-transparent" />
            <div className="absolute inset-0 opacity-[0.10] mix-blend-overlay pointer-events-none bg-[radial-gradient(circle_at_30%_20%,white,transparent_35%)]" />
            <div className="absolute inset-5 border border-white/10 pointer-events-none" />
            <div className="absolute left-6 bottom-6 z-10 flex items-center gap-2 text-[9px] tracking-[0.25em] uppercase text-white/55">
              <span className="w-5 h-px bg-primary" />
              RKGC Collection
            </div>
            <div className="absolute top-5 right-5 left-5 flex items-center justify-between text-[9px] tracking-[0.28em] uppercase text-white/55">
              <span>RKGC Group</span>
              <span className="text-primary">Explore</span>
            </div>
            <div className="absolute top-5 right-5 w-8 h-8 border-t border-r border-primary/70 pointer-events-none" />
            <div className="absolute bottom-5 left-5 w-8 h-8 border-b border-l border-primary/50 pointer-events-none" />
            <div className="absolute right-5 bottom-5 w-12 h-12 border border-primary/70 flex items-center justify-center text-primary bg-[#080D18]/65 backdrop-blur-md transition-all duration-300 group-hover:bg-primary group-hover:text-[#080D18]">
              <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function OurBrandPage() {
  const reduceMotion = useReducedMotion();
  const sectionRefs = useRef({});
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

  return (
    <div className="bg-[#080D18] text-white">

      <Seo
        {...seoConfig["/our-brand"]}
        path="/our-brand"
        jsonLd={breadcrumbSchema(seoConfig["/our-brand"].breadcrumb)}
      />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[#070C17] text-white min-h-[82vh] lg:min-h-[85vh] flex items-center pt-24 lg:pt-20 pb-14">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(244,180,0,0.55) 0px, rgba(244,180,0,0.55) 1px, transparent 1px, transparent 42px)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(244,180,0,0.08)_0%,transparent_22%),radial-gradient(ellipse_at_top,rgba(11,18,32,0.10)_0%,rgba(5,10,18,0.96)_78%)]" />

        <div className="absolute right-[-8%] top-[12%] w-[48vw] max-w-[760px] aspect-square rounded-full border border-primary/[0.06] shadow-[0_0_120px_rgba(244,180,0,0.06)] pointer-events-none" />
        <div className="absolute right-[4%] top-[25%] w-[34vw] max-w-[540px] aspect-square rounded-full border border-primary/[0.08] pointer-events-none" />

        <Container className="relative z-[3] w-full">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }}
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-7"
              >
                <span className="w-8 h-px bg-primary" />
                <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">RKGC Group</span>
              </motion.div>

              <motion.h1
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-medium leading-[0.95] mb-6"
              >
                <span className="block text-[clamp(4.25rem,9vw,7.5rem)]">Our</span>
                <span className="block text-[clamp(4.25rem,9vw,7.5rem)] italic text-primary">Brands.</span>
              </motion.h1>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className="text-white/70 text-lg mb-4"
              >
                Different identities. One vision.
              </motion.p>

              <motion.p
                variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6 }}
                className="text-gray-400 max-w-md leading-relaxed mb-9"
              >
                From spaces we design to experiences we create, RKGC brings together distinct businesses under one
                long-term vision.
              </motion.p>

              <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }}>
                <button
                  type="button"
                  onClick={() => scrollToBrand(archi.id)}
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-primary/55 bg-primary/[0.03] text-primary text-sm font-semibold tracking-wide hover:bg-primary hover:text-[#080D18] hover:shadow-[0_12px_40px_rgba(244,180,0,0.22)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Explore Our Brands
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>
            </motion.div>

            <HeroCompass onSelect={scrollToBrand} reduceMotion={reduceMotion} />
          </div>
        </Container>
      </section>

      {/* ============ BRAND STATEMENT ============ */}
      <section className="relative bg-[#070C17] text-white py-24 lg:py-28 text-center border-y border-white/[0.06] overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[220px] rounded-full bg-primary/[0.035] blur-[90px] pointer-events-none" />
        <Container className="relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="block w-10 h-px bg-primary mx-auto mb-7" />
            <h2 className="font-display italic font-medium text-[clamp(1.75rem,4.5vw,2.75rem)] leading-tight">
              One Group.
              <br />
              <span className="text-primary">Many Worlds.</span>
            </h2>
            <p className="text-white/45 mt-6 text-base leading-relaxed">
              Four unique brands. Four different worlds.
              <br className="hidden sm:block" /> United by shared values, driven by excellence.
              <br className="hidden sm:block" /> Focused on creating meaningful impact.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ============ STICKY NAV + CONNECTED CHAPTERS ============ */}
      <MobileChapterNav activeId={activeBrand} onSelect={scrollToBrand} />
      <div className="lg:grid lg:grid-cols-[140px_1fr] xl:grid-cols-[160px_1fr]">
        <ChapterNav activeId={activeBrand} onSelect={scrollToBrand} />
        <div>
          <BrandChapter brand={archi} number="01" registerRef={(el) => (sectionRefs.current[archi.id] = el)} reduceMotion={reduceMotion} />
          <BrandChapter brand={moo} number="02" registerRef={(el) => (sectionRefs.current[moo.id] = el)} reduceMotion={reduceMotion} />
          <BrandChapter brand={hillberg} number="03" registerRef={(el) => (sectionRefs.current[hillberg.id] = el)} reduceMotion={reduceMotion} />
          <BrandChapter brand={organica} number="04" registerRef={(el) => (sectionRefs.current[organica.id] = el)} reduceMotion={reduceMotion} />
        </div>
      </div>

      {/* ============ CLOSING ============ */}
      <section className="bg-[#070C17] py-12 lg:py-16 border-t border-white/[0.06]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col sm:flex-row items-center gap-6 sm:gap-8 rounded-[2px] border border-primary/25 bg-primary/[0.025] px-6 sm:px-10 py-8 sm:py-9 shadow-[0_20px_70px_rgba(0,0,0,0.2)]"
          >
            <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Building2 size={18} className="text-primary" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-heading text-lg sm:text-xl font-bold text-white">
                One Group. <span className="text-primary">Many Possibilities.</span>
              </h2>
              <p className="text-white/55 text-sm mt-1">Explore the brands that make RKGC more than a single business.</p>
            </div>
            <Button to="/" variant="primary" size="md" arrow className="shrink-0">
              Explore RKGC
            </Button>
          </motion.div>
        </Container>
      </section>

    </div>
  );
}
