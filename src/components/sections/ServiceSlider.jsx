import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { verticals } from "../../static-data/verticals";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";

const AUTO_ADVANCE_MS = 6000;

export default function ServiceSection() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (reduceMotion || paused) return undefined;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % verticals.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, reduceMotion]);

  const current = verticals[active];

  return (
    <section className="py-24 bg-bg-light dark:bg-bg-dark transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <SectionHeading
          badge="What We Do"
          title={
            <>
              One Group. <span className="text-primary">Four Verticals.</span>
            </>
          }
          subtitle="From civil infrastructure to interiors, real estate to agriculture — RKGC Group operates across four dedicated business verticals, each built on the same standard of quality and trust."
          className="mb-14"
        />

        {/* DESKTOP — numbered selector + large image panel */}
        <div
          className="hidden lg:grid grid-cols-[0.85fr_1.15fr] gap-12 items-stretch"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Selector list */}
          <div className="flex flex-col justify-center gap-1">
            {verticals.map((v, i) => {
              const isActive = i === active;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`w-full text-left relative pl-7 py-5 border-l-2 transition-colors duration-300 ${
                    isActive
                      ? "border-primary"
                      : "border-secondary/10 dark:border-white/10 hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-heading text-sm font-bold tracking-wide transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-secondary/30 dark:text-white/30"
                      }`}
                    >
                      {v.number}
                    </span>
                    <div className="min-w-0">
                      <h3
                        className={`font-heading text-xl xl:text-2xl font-bold transition-colors duration-300 ${
                          isActive
                            ? "text-secondary dark:text-white"
                            : "text-secondary/45 dark:text-white/45"
                        }`}
                      >
                        {v.name}
                      </h3>
                      <p
                        className={`text-sm mt-1 transition-colors duration-300 ${
                          isActive
                            ? "text-secondary/60 dark:text-white/60"
                            : "text-secondary/35 dark:text-white/35"
                        }`}
                      >
                        {v.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Auto-advance progress indicator */}
                  {isActive && !reduceMotion && !paused && (
                    <motion.span
                      key={`${v.id}-${active}`}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                      style={{ originY: 0 }}
                      className="absolute left-[-2px] top-0 w-[2px] h-full bg-primary"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Image + description panel */}
          <div className="relative rounded-[32px] overflow-hidden shadow-glass dark:shadow-glass-dark min-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/55 to-secondary/10" />

                <div className="absolute inset-0 flex flex-col justify-end p-10">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5">
                      <current.icon size={22} className="text-primary" />
                    </div>

                    <h3 className="font-heading text-3xl font-bold text-white mb-3">
                      {current.name}
                    </h3>
                    <p className="text-white/70 leading-relaxed max-w-lg mb-6">
                      {current.description}
                    </p>

                    <Button
                      to={`/projects?category=${current.slug}`}
                      variant="secondary"
                      arrow
                    >
                      Explore {current.slug} Projects
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* MOBILE / TABLET — accordion */}
        <div className="lg:hidden flex flex-col gap-4">
          {verticals.map((v, i) => {
            const isOpen = mobileOpen === i;
            return (
              <div
                key={v.id}
                className="rounded-2xl border border-secondary/10 dark:border-white/10 overflow-hidden bg-card-light/60 dark:bg-card-dark/60"
              >
                <button
                  type="button"
                  onClick={() => setMobileOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-4 px-5 py-5 text-left"
                >
                  <span className="font-heading text-sm font-bold text-primary shrink-0">
                    {v.number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-lg font-bold text-secondary dark:text-white">
                      {v.name}
                    </h3>
                    <p className="text-xs text-secondary/50 dark:text-white/50 mt-0.5">
                      {v.tagline}
                    </p>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-secondary/40 dark:text-white/40"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="relative h-48 mx-5 rounded-xl overflow-hidden mb-5">
                        <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/10 to-transparent" />
                      </div>
                      <p className="px-5 text-sm text-secondary/60 dark:text-white/60 leading-relaxed mb-5">
                        {v.description}
                      </p>
                      <div className="px-5 pb-5">
                        <Link
                          to={`/projects?category=${v.slug}`}
                          className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold"
                        >
                          Explore {v.slug} Projects
                          <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
