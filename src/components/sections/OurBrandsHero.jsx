import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { brandPortfolio } from "../../static-data/brandPortfolio";

const EASE = [0.16, 1, 0.3, 1];

// Node positions on a 100×100 canvas, in brandPortfolio order:
// Archistylo (top), Moo Farm (left), Hillberg (right), The Farmer Studio (bottom).
const NODE_RADIUS = 33;
const nodes = [
  { x: 50, y: 50 - NODE_RADIUS, side: "top" },
  { x: 50 - NODE_RADIUS, y: 50, side: "left" },
  { x: 50 + NODE_RADIUS, y: 50, side: "right" },
  { x: 50, y: 50 + NODE_RADIUS, side: "bottom" },
];

// Where each label sits relative to its node. Side labels go beneath the
// node on small screens (no room beside it) and outward from lg up.
const labelPlacement = {
  top: "-translate-x-1/2 -translate-y-[calc(100%+14px)] items-center text-center",
  bottom: "-translate-x-1/2 translate-y-[14px] items-center text-center",
  left: "-translate-x-1/2 translate-y-[14px] items-center text-center lg:-translate-x-[calc(100%+18px)] lg:-translate-y-1/2 lg:items-end lg:text-right",
  right: "-translate-x-1/2 translate-y-[14px] items-center text-center lg:translate-x-[18px] lg:-translate-y-1/2 lg:items-start lg:text-left",
};

const RINGS = [
  { r: 15, opacity: 0.35 },
  { r: 24, opacity: 0.16 },
  { r: NODE_RADIUS, opacity: 0.22, dashed: true },
  { r: 45, opacity: 0.07 },
];
const CENTER_R = 11; // lines start at the edge of the centre disc

function BrandEcosystem({ reduceMotion }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px] min-[400px]:max-w-[400px] sm:max-w-[500px] lg:max-w-[540px]">
      {/* Restrained central glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.13] blur-[60px]" />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        {RINGS.map((ring) => (
          <circle
            key={ring.r}
            cx="50"
            cy="50"
            r={ring.r}
            fill="none"
            stroke="#F4B400"
            strokeOpacity={ring.opacity}
            strokeWidth="1"
            strokeDasharray={ring.dashed ? "1.5 2.5" : undefined}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {nodes.map((n, i) => {
          const dx = n.x - 50;
          const dy = n.y - 50;
          const len = Math.hypot(dx, dy);
          const x1 = 50 + (dx / len) * CENTER_R;
          const y1 = 50 + (dy / len) * CENTER_R;
          // small connection node where the line crosses the middle ring
          const mx = 50 + (dx / len) * 24;
          const my = 50 + (dy / len) * 24;
          return (
            <g key={i}>
              <motion.line
                x1={x1}
                y1={y1}
                x2={n.x}
                y2={n.y}
                stroke="#F4B400"
                strokeOpacity="0.6"
                // canvas units (≈1px at desktop size); non-scaling-stroke
                // would break Framer's pathLength dash maths
                strokeWidth="0.22"
                initial={{ pathLength: reduceMotion ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: EASE }}
              />
              <circle cx={mx} cy={my} r="0.9" fill="#F4B400" />
            </g>
          );
        })}
      </svg>

      {/* Centre — RKGC Group. The wrapper centres it; the inner element
          animates scale, so Framer's inline transform can't undo the centring. */}
      <div className="absolute left-1/2 top-1/2 h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex h-full w-full flex-col items-center justify-center rounded-full border border-primary/50 bg-[radial-gradient(circle_at_35%_30%,#1b2740_0%,#0B1220_75%)] shadow-[0_0_40px_rgba(244,180,0,0.18)]"
        >
          <span className="font-display text-[clamp(1rem,3.6vw,1.6rem)] font-semibold leading-none text-white">
            RKGC
          </span>
          <span className="mt-1 text-[clamp(0.45rem,1.3vw,0.6rem)] font-semibold uppercase tracking-[0.3em] text-primary">
            Group
          </span>
        </motion.div>
      </div>

      {/* Brand nodes + labels */}
      {brandPortfolio.map((brand, i) => {
        const n = nodes[i];
        return (
          <motion.div
            key={brand.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: reduceMotion ? 0 : 0.6 + i * 0.12 }}
            className="absolute"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <Link
              to="/our-brand"
              aria-label={`${brand.shortName} — ${brand.tagline}`}
              className="group block focus-visible:outline-none"
            >
              {/* node */}
              <span className="absolute left-0 top-0 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/60 bg-bg-dark transition-transform duration-300 group-hover:scale-125 group-focus-visible:scale-125">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(244,180,0,0.8)]" />
              </span>

              {/* label */}
              <span
                className={`absolute left-0 top-0 flex w-max max-w-[150px] flex-col sm:max-w-[190px] ${labelPlacement[n.side]}`}
              >
                <span className="font-heading text-[12px] font-bold uppercase leading-tight tracking-[0.12em] text-white transition-colors duration-300 group-hover:text-primary group-focus-visible:text-primary sm:text-sm lg:text-[15px]">
                  {brand.name}
                </span>
                <span className="mt-1 text-[10px] leading-snug text-white/50 sm:text-xs">
                  {brand.tagline}
                </span>
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function OurBrandsHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-bg-dark py-20 text-white sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute right-[-10%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* Copy */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-md"
          >
            {[
              <div key="eyebrow" className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">RKGC Group</span>
              </div>,
              <h2 key="title" className="font-display font-semibold leading-[0.95] tracking-tight">
                <span className="block text-[clamp(3rem,7vw,5.25rem)] text-white">Our</span>
                <span className="block pr-2 text-[clamp(3rem,7vw,5.25rem)] italic text-primary">Brands.</span>
              </h2>,
              <p key="lead" className="mt-7 text-lg text-white/80">
                Different identities. One vision.
              </p>,
              <p key="body" className="mt-3 leading-relaxed text-white/55">
                From spaces we design to experiences we create, RKGC brings together distinct
                businesses under one long-term vision.
              </p>,
              <div key="cta" className="mt-9">
                <Link
                  to="/our-brand"
                  className="group inline-flex items-center gap-3 rounded-full border border-primary/55 px-7 py-3.5 text-sm font-semibold tracking-wide text-primary transition-all duration-300 hover:bg-primary hover:text-bg-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Explore Our Brands
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>,
            ].map((child) => (
              <motion.div
                key={child.key}
                variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 18 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                {child}
              </motion.div>
            ))}
          </motion.div>

          {/* Ecosystem — extra side padding on lg gives outward labels room */}
          <div className="lg:px-16">
            <BrandEcosystem reduceMotion={reduceMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}
