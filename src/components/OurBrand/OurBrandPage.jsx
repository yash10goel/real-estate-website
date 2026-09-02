import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, Leaf } from "lucide-react";
import { brandPortfolio } from "../../static-data/brandPortfolio";
import Container from "../ui/Container";
import Button from "../ui/Button";
import useDocumentMeta from "../../utils/useDocumentMeta";

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
      className="relative w-full max-w-[400px] sm:max-w-[480px] lg:max-w-[560px] aspect-square mx-auto"
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

function ArchiChapter({ registerRef, reduceMotion }) {
  return (
    <section
      ref={registerRef}
      id={archi.id}
      data-brand-id={archi.id}
      aria-labelledby="archi-heading"
      className="relative bg-[#0A0E1A] text-white scroll-mt-24 px-6 sm:px-10 lg:px-14 py-16 lg:py-20 overflow-hidden"
    >
      <div className="grid lg:grid-cols-2 gap-10 items-center max-w-[1280px] mx-auto">
        <div className="relative z-10">
          <span className="block text-primary font-display italic text-sm mb-4">01</span>
          <h2 id="archi-heading" className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold uppercase tracking-tight mb-3">
            The Archi
          </h2>
          <p className="font-display italic text-primary text-lg mb-1">{archi.tagline}</p>
          <p className="text-white/40 text-xs font-semibold tracking-[0.2em] uppercase mb-7">{archi.meta}</p>
          <DiscoverLink brand={archi} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <GhostNumber className="-top-8 right-2 text-[7rem] sm:text-[8rem] text-white/[0.06]">01</GhostNumber>
          <div className="relative rounded-tl-[90px] rounded-br-[20px] overflow-hidden h-[260px] sm:h-[320px] border border-white/10">
            <img src={archi.image} alt={archi.imageAlt} loading="lazy" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MooChapter({ registerRef, reduceMotion }) {
  return (
    <section
      ref={registerRef}
      id={moo.id}
      data-brand-id={moo.id}
      aria-labelledby="moo-heading"
      className="relative bg-[#F7EEDF] text-secondary scroll-mt-24 px-6 sm:px-10 lg:px-14 py-16 lg:py-20 overflow-hidden"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 220 150"
        className="hidden lg:block absolute left-8 xl:left-16 bottom-8 w-36 lg:w-44 text-[#8A5A2B]/[0.14] pointer-events-none select-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
      >
        <circle cx="55" cy="85" r="35" />
        <line x1="55" y1="50" x2="55" y2="18" />
        <path d="M38 24 L55 6 L72 24" />
        <rect x="105" y="60" width="80" height="65" />
        <path d="M105 60 L145 30 L185 60" />
        <rect x="128" y="88" width="24" height="37" />
      </svg>
      <div className="grid lg:grid-cols-2 gap-10 items-center max-w-[1280px] mx-auto">
        <div className="relative z-10">
          <span className="block text-[#8A5A2B] font-display italic text-sm mb-4">02</span>
          <h2 id="moo-heading" className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold uppercase tracking-tight mb-3">
            {moo.name}
          </h2>
          <p className="font-display italic text-[#8A5A2B] text-lg mb-1">{moo.tagline}</p>
          <p className="text-secondary/40 text-xs font-semibold tracking-[0.2em] uppercase mb-7">{moo.meta}</p>
          <DiscoverLink brand={moo} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <GhostNumber className="-top-10 right-2 text-[7rem] sm:text-[8rem] text-[#8A5A2B]/[0.08]">02</GhostNumber>
          <div className="relative rounded-tr-[90px] rounded-bl-[20px] overflow-hidden h-[260px] sm:h-[320px] border border-secondary/10">
            <img src={moo.image} alt={moo.imageAlt} loading="lazy" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HillbergChapter({ registerRef, reduceMotion }) {
  return (
    <section
      ref={registerRef}
      id={hillberg.id}
      data-brand-id={hillberg.id}
      aria-labelledby="hillberg-heading"
      className="relative bg-[#1A1613] text-white scroll-mt-24 px-6 sm:px-10 lg:px-14 py-16 lg:py-20 overflow-hidden"
    >
      <div className="grid lg:grid-cols-2 gap-10 items-center max-w-[1280px] mx-auto">
        <div className="relative z-10">
          <span className="block text-white/30 font-display italic text-sm mb-4">03</span>
          <h2 id="hillberg-heading" className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold uppercase tracking-tight mb-4">
            The Hillberg
          </h2>
          <span className="block w-10 h-px bg-primary/70 mb-7" aria-hidden="true" />
          <DiscoverLink brand={hillberg} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <GhostNumber className="-top-8 right-2 text-[7rem] sm:text-[8rem] text-white/[0.06]">03</GhostNumber>
          <div className="relative rounded-tr-[90px] rounded-bl-[20px] overflow-hidden h-[260px] sm:h-[320px] border border-white/10">
            <img src={hillberg.image} alt={hillberg.imageAlt} loading="lazy" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function OrganicaChapter({ registerRef, reduceMotion }) {
  return (
    <section
      ref={registerRef}
      id={organica.id}
      data-brand-id={organica.id}
      aria-labelledby="organica-heading"
      className="relative bg-[#12291E] text-white scroll-mt-24 px-6 sm:px-10 lg:px-14 py-16 lg:py-20 overflow-hidden"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 300 220"
        className="absolute inset-0 w-full h-full text-white/[0.05] pointer-events-none select-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M15 210 Q35 165 15 120 Q-5 75 25 25" />
        <path d="M15 175 Q32 169 43 152" />
        <path d="M17 128 Q34 122 47 106" />
        <path d="M20 80 Q37 74 50 58" />
        <path d="M285 15 Q305 60 285 105 Q265 150 295 195" />
        <path d="M285 50 Q301 56 312 72" />
        <path d="M283 95 Q299 101 310 116" />
      </svg>
      <div className="grid lg:grid-cols-2 gap-10 items-center max-w-[1280px] mx-auto">
        <div className="relative z-10">
          <span className="block text-[#8FD9A8] font-display italic text-sm mb-4">04</span>
          <h2 id="organica-heading" className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold uppercase tracking-tight mb-3">
            {organica.name}
          </h2>
          <p className="font-display italic text-[#8FD9A8] text-lg mb-7 flex items-center gap-2">
            <Leaf size={16} className="shrink-0" /> {organica.tagline}
          </p>
          <DiscoverLink brand={organica} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <GhostNumber className="-top-8 right-2 text-[7rem] sm:text-[8rem] text-white/[0.06]">04</GhostNumber>
          <div className="relative rounded-[20px] overflow-hidden h-[260px] sm:h-[320px] border border-white/10">
            <img src={organica.image} alt={organica.imageAlt} loading="lazy" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>
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
    <div className="bg-bg-light dark:bg-bg-dark transition-colors duration-300">

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-bg-dark text-white min-h-[82vh] lg:min-h-[85vh] flex items-center pt-24 lg:pt-20 pb-14">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(45,212,191,0.7) 0px, rgba(45,212,191,0.7) 1px, transparent 1px, transparent 30px)",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(11,18,32,0.15)_0%,_rgba(11,18,32,0.94)_75%)]" />

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
                <span className="block text-[clamp(3.75rem,8.5vw,6.75rem)]">Our</span>
                <span className="block text-[clamp(3.75rem,8.5vw,6.75rem)] italic text-primary">Brands.</span>
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
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/25 text-white text-sm font-semibold tracking-wide hover:border-primary hover:text-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
      <section className="bg-bg-dark text-white py-16 lg:py-20 text-center">
        <Container className="max-w-xl">
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
          <ArchiChapter registerRef={(el) => (sectionRefs.current[archi.id] = el)} reduceMotion={reduceMotion} />
          <MooChapter registerRef={(el) => (sectionRefs.current[moo.id] = el)} reduceMotion={reduceMotion} />
          <HillbergChapter registerRef={(el) => (sectionRefs.current[hillberg.id] = el)} reduceMotion={reduceMotion} />
          <OrganicaChapter registerRef={(el) => (sectionRefs.current[organica.id] = el)} reduceMotion={reduceMotion} />
        </div>
      </div>

      {/* ============ CLOSING ============ */}
      <section className="bg-secondary py-14 lg:py-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 rounded-[24px] border border-white/10 px-6 sm:px-10 py-7 sm:py-8"
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
