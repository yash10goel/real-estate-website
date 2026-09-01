import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { verticals } from "../../static-data/verticals";
import { plantationCatalog, plantationJourney } from "../../static-data/agroContent";
import Button from "../ui/Button";

const agroVertical = verticals.find((v) => v.slug === "Agro");

function JourneyStep({ step, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="w-9 h-9 rounded-full border border-agro-olive/40 flex items-center justify-center font-heading text-xs font-bold text-agro-olive dark:text-agro-olive shrink-0">
          {step.number}
        </span>
        {!isLast && <span className="hidden lg:block h-px flex-1 bg-agro-olive/20" />}
      </div>
      <h3 className="font-heading text-base font-bold text-secondary dark:text-white mb-2 uppercase tracking-wide">
        {step.stage}
      </h3>
      <ul className="space-y-1">
        {step.items.map((item) => (
          <li key={item} className="text-sm text-secondary/55 dark:text-white/55 leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function AgroExperience() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);
  const visionRef = useRef(null);

  const scrollToVision = () =>
    visionRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

  return (
    <motion.div
      key="agro-experience"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ============ CINEMATIC AGRO HERO ============ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden rounded-[32px] min-h-[520px] lg:min-h-[600px] flex items-center text-white mb-24"
      >
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80')" }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,26,20,0.92)_0%,rgba(15,26,20,0.75)_45%,rgba(15,26,20,0.25)_80%,rgba(15,26,20,0.15)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-agro-forest/60 via-transparent to-transparent" />

        <div className="relative z-10 px-8 sm:px-12 lg:px-16 py-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-primary" />
            <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">RKGC Projects / Agro</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-medium leading-[1.1] mb-7"
          >
            <span className="block text-4xl sm:text-5xl lg:text-[56px]">Growing a</span>
            <span className="block text-4xl sm:text-5xl lg:text-[56px] italic text-primary">Greener Future.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/75 text-lg leading-relaxed mb-10 max-w-md"
          >
            {agroVertical.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Button variant="primary" arrow onClick={scrollToVision}>
              Discover The Vision
            </Button>
            <Button to="/contact?subject=Project%20Consultation" variant="secondary">
              Discuss This Vertical
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ============ AGRO VISION ============ */}
      <section ref={visionRef} className="scroll-mt-24 grid lg:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-agro-olive" />
            <span className="text-agro-olive dark:text-agro-olive text-xs font-semibold tracking-[0.25em] uppercase">
              Agro Vision
            </span>
          </div>
          <h3 className="font-display text-3xl sm:text-4xl italic text-secondary dark:text-white leading-tight mb-6">
            More than just plants.
          </h3>
          <p className="text-secondary/65 dark:text-white/65 leading-relaxed max-w-md">
            From selecting the right variety to establishing and maintaining the plantation, RKGC
            provides complete plantation support — farm development, agroforestry and green
            landscaping, delivered with the same discipline behind every RKGC vertical.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[24px] overflow-hidden h-[280px] lg:h-[340px]"
        >
          <img src={agroVertical.image} alt="RKGC Agro — sustainable farming and plantation" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-agro-forest/50 via-transparent to-transparent" />
        </motion.div>
      </section>

      {/* ============ PLANTATION OPTIONS ============ */}
      <section className="mb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-agro-olive" />
            <span className="text-agro-olive dark:text-agro-olive text-xs font-semibold tracking-[0.25em] uppercase">
              Plantation Options
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl italic text-secondary dark:text-white">Explore what we grow.</h3>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          {plantationCatalog.map((plant, i) => (
            <motion.span
              key={plant}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-agro-olive/25 bg-agro-olive/5 text-secondary/75 dark:text-white/75 text-sm font-medium"
            >
              <Leaf size={13} className="text-agro-olive shrink-0" />
              {plant}
            </motion.span>
          ))}
        </div>
      </section>

      {/* ============ PLANTATION SUPPORT JOURNEY ============ */}
      <section className="mb-24 rounded-[28px] bg-agro-forest/[0.04] dark:bg-agro-forest/10 border border-agro-forest/10 dark:border-agro-olive/15 p-8 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-agro-olive" />
            <span className="text-agro-olive dark:text-agro-olive text-xs font-semibold tracking-[0.25em] uppercase">
              RKGC Plantation Support
            </span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl italic text-secondary dark:text-white">From selection to growth.</h3>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
          {plantationJourney.map((step, i) => (
            <JourneyStep key={step.number} step={step} index={i} isLast={i === plantationJourney.length - 1} />
          ))}
        </div>
      </section>

      {/* ============ COMING SOON ============ */}
      <section className="relative overflow-hidden rounded-[28px] bg-secondary text-white px-8 sm:px-12 py-16 text-center mb-16">
        <motion.div
          animate={reduceMotion ? {} : { opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(107,123,79,0.25)_0%,_transparent_70%)] pointer-events-none"
        />

        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-primary text-xs font-semibold tracking-[0.3em] uppercase mb-4">Agro — The Next RKGC Chapter</p>
          <h3 className="font-display text-2xl sm:text-3xl italic mb-6">
            Building a new generation of responsible agricultural and plantation ventures.
          </h3>

          <div className="relative h-px w-40 mx-auto bg-white/15 overflow-hidden my-8">
            <motion.span
              animate={reduceMotion ? { opacity: 0.6 } : { x: ["-100%", "200%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>

          <p className="text-white/50 text-sm uppercase tracking-widest mb-1">Portfolio Coming Soon</p>
          <p className="text-white/70 italic font-display text-lg">Something meaningful is growing.</p>
        </div>
      </section>

      {/* ============ DISCUSS THIS VERTICAL ============ */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 rounded-[24px] border border-secondary/10 dark:border-white/10 px-6 sm:px-8 py-6">
        <div className="text-center sm:text-left">
          <p className="font-heading font-bold text-secondary dark:text-white">Interested in RKGC Agro?</p>
          <p className="text-sm text-secondary/55 dark:text-white/55 mt-0.5">Talk to our team about the vertical's direction and upcoming opportunities.</p>
        </div>
        <Button to="/contact?subject=Project%20Consultation" variant="secondary" arrow className="shrink-0 w-full sm:w-auto justify-center">
          Discuss This Vertical
        </Button>
      </div>
    </motion.div>
  );
}
