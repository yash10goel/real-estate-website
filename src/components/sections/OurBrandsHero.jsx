import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { brandPortfolio } from "../../static-data/brandPortfolio";
import Container from "../ui/Container";

// Compass point per brand, in brandPortfolio order: Archistylo (top),
// Moo Farm (left), Hillberg (right), The Farmer Studio (bottom) —
// matches the same radial layout already used on /our-brand's hero.
const compassPositions = [
  "top-0 left-1/2 -translate-x-1/2 items-center text-center",
  "top-1/2 left-0 -translate-y-1/2 items-start text-left",
  "top-1/2 right-0 -translate-y-1/2 items-end text-right",
  "bottom-0 left-1/2 -translate-x-1/2 items-center text-center",
];
const compassStubs = [
  "left-1/2 -translate-x-1/2 top-full w-px h-7",
  "top-1/2 -translate-y-1/2 left-full w-7 h-px",
  "top-1/2 -translate-y-1/2 right-full w-7 h-px",
  "left-1/2 -translate-x-1/2 bottom-full w-px h-7",
];

// Radial "brand constellation" — a ghosted RKGC monogram, concentric
// rings and a pulsing center point, with the four brands positioned
// at the compass points. Each brand links through to /our-brand rather
// than deep-linking into a chapter, since this lives on the homepage.
function BrandConstellation({ reduceMotion }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: reduceMotion ? 0 : 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[380px] sm:max-w-[480px] lg:max-w-[580px] aspect-square mx-auto"
    >
      {/* soft central illumination */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full bg-primary/[0.08] blur-[70px] pointer-events-none" />

      {/* ghosted vertical RKGC monogram */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden">
        {["R", "K", "G", "C"].map((l) => (
          <span
            key={l}
            className="font-display italic font-medium text-primary/[0.09] text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[0.8]"
          >
            {l}
          </span>
        ))}
      </div>

      {/* concentric rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[56%] aspect-square rounded-full border border-primary/25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] aspect-square rounded-full border border-primary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[96%] aspect-square rounded-full border border-primary/[0.06]" />

      {/* cross guides */}
      <span className="absolute top-1/2 left-[4%] right-[4%] h-px bg-primary/20" />
      <span className="absolute left-1/2 top-[4%] bottom-[4%] w-px bg-primary/20" />

      {/* pulsing center point */}
      <motion.span
        aria-hidden="true"
        animate={reduceMotion ? { opacity: 0.85 } : { scale: [1, 1.25, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_30px_8px_rgba(244,180,0,0.5)]"
      />

      {/* four brands at compass points */}
      {brandPortfolio.map((brand, i) => (
        <motion.div
          key={brand.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute ${compassPositions[i]}`}
        >
          <Link
            to="/our-brand"
            aria-label={`Explore ${brand.name}`}
            className="group flex flex-col focus-visible:outline-none"
          >
            <span
              aria-hidden="true"
              className={`absolute bg-primary/25 transition-colors duration-300 group-hover:bg-primary/60 ${compassStubs[i]}`}
            />
            <span className="font-heading text-sm sm:text-base lg:text-lg font-bold uppercase tracking-wide text-white/90 transition-all duration-300 group-hover:text-primary group-hover:[text-shadow:0_0_18px_rgba(244,180,0,0.5)]">
              {brand.name}
            </span>
            <span className="text-white/40 text-[10px] sm:text-xs mt-1 transition-colors duration-300 group-hover:text-white/65">
              {brand.tagline}
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function OurBrandsHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-bg-dark text-white py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(244,180,0,0.55) 0px, rgba(244,180,0,0.55) 1px, transparent 1px, transparent 42px)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_45%,rgba(244,180,0,0.08)_0%,transparent_22%),radial-gradient(ellipse_at_top,rgba(11,18,32,0.10)_0%,rgba(5,10,18,0.96)_78%)]" />
      <div className="hidden lg:block absolute right-[-8%] top-[10%] w-[46vw] max-w-[680px] aspect-square rounded-full border border-primary/[0.06] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-10 items-center">
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
              <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">RKGC Group</span>
            </motion.div>

            <motion.h2
              variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-medium leading-[0.95] mb-6"
            >
              <span className="block text-[clamp(2.75rem,6.5vw,5rem)] text-white">Our</span>
              <span className="block text-[clamp(2.75rem,6.5vw,5rem)] italic text-primary">Brands.</span>
            </motion.h2>

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
              className="text-gray-400 max-w-md mx-auto lg:mx-0 leading-relaxed mb-9"
            >
              From spaces we design to experiences we create, RKGC brings together distinct businesses
              under one long-term vision.
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

          <BrandConstellation reduceMotion={reduceMotion} />
        </div>
      </Container>
    </section>
  );
}
