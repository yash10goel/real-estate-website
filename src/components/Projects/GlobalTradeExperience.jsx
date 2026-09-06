import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { brandPortfolio } from "../../static-data/brandPortfolio";

// Compass point per brand, in brandPortfolio order: Archistylo (top),
// Moo Farm (left), Hillberg (right), The Farmer Studio (bottom).
const NODE_POSITION = [
  "top-0 left-1/2 -translate-x-1/2 items-center text-center",
  "top-1/2 left-0 -translate-y-1/2 items-start text-left",
  "top-1/2 right-0 -translate-y-1/2 items-end text-right",
  "bottom-0 left-1/2 -translate-x-1/2 items-center text-center",
];

// One connecting line per direction, independently highlighted when its
// brand is hovered/focused.
const LINE_CLASS = [
  "left-1/2 -translate-x-1/2 top-[7%] h-[43%] w-px", // top -> center
  "top-1/2 -translate-y-1/2 left-[7%] w-[43%] h-px", // left -> center
  "top-1/2 -translate-y-1/2 left-1/2 w-[43%] h-px", // center -> right
  "left-1/2 -translate-x-1/2 top-1/2 h-[43%] w-px", // center -> bottom
];

// ============================================================
// GLOBAL TRADE ECOSYSTEM — desktop-only radial composition. A central
// "RKGC Global Trade" node connects to the four brand nodes via thin
// gold lines; hovering/focusing a node brightens its own connection
// and reveals its category + description.
// ============================================================
function GlobalTradeEcosystem({ reduceMotion }) {
  const [activeId, setActiveId] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduceMotion ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative hidden lg:block w-full max-w-[560px] aspect-square mx-auto"
    >
      {/* soft central illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full bg-primary/[0.08] blur-[80px] pointer-events-none" />

      {/* concentric rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full border border-primary/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[82%] aspect-square rounded-full border border-primary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[98%] aspect-square rounded-full border border-primary/[0.06]" />

      {/* connecting lines — one per brand direction */}
      {brandPortfolio.map((brand, i) => (
        <span
          key={brand.id}
          aria-hidden="true"
          className={`absolute transition-all duration-500 ${LINE_CLASS[i]} ${
            activeId === brand.id ? "bg-primary shadow-[0_0_8px_rgba(244,180,0,0.6)]" : "bg-primary/20"
          }`}
        />
      ))}

      {/* center node — RKGC Global Trade */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center w-[128px] h-[128px] rounded-full border border-primary/60 bg-[#080D18] shadow-[0_0_40px_rgba(244,180,0,0.18)]">
        <motion.span
          aria-hidden="true"
          animate={reduceMotion ? { opacity: 0.85 } : { scale: [1, 1.15, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -z-10 w-3 h-3 rounded-full bg-primary shadow-[0_0_30px_8px_rgba(244,180,0,0.5)]"
        />
        <span className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-white">RKGC</span>
        <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-primary">Global Trade</span>
      </div>

      {/* four brand nodes */}
      {brandPortfolio.map((brand, i) => {
        const isActive = activeId === brand.id;
        return (
          <div key={brand.id} className={`absolute flex flex-col ${NODE_POSITION[i]}`}>
            <Link
              to="/our-brand"
              onMouseEnter={() => setActiveId(brand.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(brand.id)}
              onBlur={() => setActiveId(null)}
              aria-label={`Explore ${brand.name} — ${brand.tagline}`}
              className="group relative flex flex-col focus-visible:outline-none"
            >
              <motion.span
                animate={isActive ? { scale: 1.06 } : { scale: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`font-heading text-sm xl:text-base font-bold uppercase tracking-wide transition-all duration-300 ${
                  isActive
                    ? "text-primary [text-shadow:0_0_18px_rgba(244,180,0,0.55)]"
                    : "text-white/85 group-focus-visible:text-primary"
                }`}
              >
                {brand.name}
              </motion.span>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="mt-1.5 max-w-[190px]"
                  >
                    <p className="text-primary/70 text-[10px] font-semibold uppercase tracking-[0.14em]">
                      {brand.tagline}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </div>
        );
      })}
    </motion.div>
  );
}

// ============================================================
// PREMIUM BRAND CARD — shown on every breakpoint, below the (desktop-
// only) ecosystem visualization.
// ============================================================
function BrandCard({ brand, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-primary/25 bg-gradient-to-b from-[#0D1A2B] to-[#0A1420] shadow-[0_10px_40px_rgba(0,0,0,0.30)] transition-all duration-500 hover:border-primary/70 hover:shadow-[0_20px_55px_rgba(244,180,0,0.14)]"
    >
      <div className="relative flex flex-1 flex-col px-6 py-7">
        {/* Oversized editorial number — very subtle, behind content */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute bottom-1 right-2 font-heading text-[92px] font-bold leading-none text-white/[0.025]"
        >
          {brand.number}
        </span>

        <p className="relative text-primary text-[11px] font-semibold uppercase tracking-[0.2em] mb-3">
          {brand.tagline}
        </p>

        <h3 className="relative font-display italic font-medium text-[24px] text-white tracking-tight">
          {brand.name}
        </h3>

        <div className="relative mt-3 mb-4 h-[2px] w-14 bg-primary transition-all duration-500 group-hover:w-16" />

        <p className="relative text-[15px] leading-relaxed text-white/55 max-w-[95%]">{brand.description}</p>

        <Link
          to="/our-brand"
          className="relative mt-auto inline-flex w-fit items-center gap-2 pt-5 text-sm font-medium text-primary transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
        >
          Explore {brand.shortName}
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-primary/10 opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-100"
      />
    </motion.div>
  );
}

export default function GlobalTradeExperience() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key="global-trade-experience"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <section className="relative overflow-hidden rounded-[32px] bg-[#080D18] text-white px-6 sm:px-10 lg:px-14 py-14 lg:py-20 mb-16">
        {/* Decorative background — faint grid + radial gold glows */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "46px 46px",
            }}
          />
          <div className="absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[140px]" />
          <div className="absolute -right-32 bottom-0 h-[320px] w-[320px] rounded-full bg-primary/[0.04] blur-[110px]" />
        </div>

        <div className="relative z-10 grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-10 items-center mb-16 lg:mb-20">
          {/* ================= TEXT ================= */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }}
            className="text-center lg:text-left"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-7"
            >
              <span className="w-8 h-px bg-primary" />
              <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">RKGC Global Trade</span>
            </motion.div>

            <motion.h2
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-medium leading-[1.05] mb-6"
            >
              <span className="block text-[clamp(2.25rem,5.5vw,3.75rem)] text-white">Connecting</span>
              <span className="block text-[clamp(2.25rem,5.5vw,3.75rem)] italic text-primary">
                Businesses. Markets. Possibilities.
              </span>
            </motion.h2>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
              className="text-gray-400 max-w-md mx-auto lg:mx-0 leading-relaxed mb-9"
            >
              RKGC brings together diverse businesses across home furnishings, dairy, garments and
              food products, creating opportunities for growth across global markets.
            </motion.p>

            <motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} transition={{ duration: 0.6 }}>
              <Link
                to="/our-brand"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-primary/55 bg-primary/[0.03] text-primary text-sm font-semibold tracking-wide hover:bg-primary hover:text-bg-dark hover:shadow-[0_12px_40px_rgba(244,180,0,0.22)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Explore Our Brands
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* ================= ECOSYSTEM (desktop) ================= */}
          <GlobalTradeEcosystem reduceMotion={reduceMotion} />
        </div>

        {/* ================= BRAND CARDS (every breakpoint) ================= */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {brandPortfolio.map((brand, i) => (
            <BrandCard key={brand.id} brand={brand} index={i} />
          ))}
        </div>

        {/* ================= FOOTER STATEMENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mt-14 text-center"
        >
          <p className="text-white/45 text-sm sm:text-base font-medium tracking-wide uppercase">
            Four Businesses. One Vision. Global Possibilities.
          </p>
          <span className="mt-5 inline-block w-10 h-px bg-primary" />
        </motion.div>
      </section>
    </motion.div>
  );
}
