import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapPin, Landmark } from "lucide-react";
import { verticals } from "../../static-data/verticals";
import { companyStats } from "../../static-data/companyStats";
import Container from "../ui/Container";
import Button from "../ui/Button";
import AgroExperience from "./AgroExperience";
import RealtyExperience from "./RealtyExperience";

const categories = ["All", ...verticals.map((v) => v.slug)];

const corners = [
  "top-6 left-6 border-t border-l",
  "top-6 right-6 border-t border-r",
  "bottom-6 left-6 border-b border-l",
  "bottom-6 right-6 border-b border-r",
];

// Real, already-published figures only (companyStats.js) plus one
// genuinely derived count — never invented numbers.
const heroStats = [
  companyStats[3],
  companyStats[1],
  companyStats[0],
  { value: verticals.length, suffix: "", label: "Business Verticals", icon: companyStats[3].icon },
];

export default function ProjectsDetailPage() {
  const allProjects = useSelector((state) => state.projects.list);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 80]);

  const requested = searchParams.get("category");
  const [activeCategory, setActiveCategory] = useState(
    categories.includes(requested) ? requested : "All"
  );

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSearchParams(cat === "All" ? {} : { category: cat });
  };

  const filtered =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  const emptyVertical =
    filtered.length === 0
      ? verticals.find((v) => v.slug === activeCategory)
      : null;

  // Realty and Agro render their own contextual CTA at the end of their
  // experience — showing the generic page-wide CTA too would duplicate it.
  const hasOwnCTA = (activeCategory === "Agro" || activeCategory === "Realty") && emptyVertical;

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">

      {/* ============ HERO ============ */}
      <section ref={heroRef} className="relative overflow-hidden bg-bg-dark text-white pt-28 lg:pt-24 pb-20">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: heroImgY }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80')" }}
          />
        </motion.div>
        <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(11,18,32,0.9)_0%,rgba(11,18,32,0.94)_60%,rgba(11,18,32,0.88)_100%)]" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,_transparent_45%,_rgba(11,18,32,0.3)_100%)] pointer-events-none" />
        <div className="hidden lg:block absolute inset-6 z-[2] pointer-events-none">
          {corners.map((pos) => (
            <span key={pos} className={`absolute w-8 h-8 ${pos} border-white/20`} />
          ))}
        </div>

        <Container className="relative z-[3]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-primary" />
                <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">Our Portfolio</span>
              </div>
              <h1 className="font-display font-medium leading-[1.1] mb-6">
                <span className="block text-4xl sm:text-5xl lg:text-[56px]">Building Across</span>
                <span className="block text-4xl sm:text-5xl lg:text-[56px] italic text-primary">Every Vertical.</span>
              </h1>
              <p className="text-gray-300 text-lg max-w-md leading-relaxed">
                RKGC Group operates across Infrastructure, Realty, Agro and Spaces — explore the
                work behind each vertical.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-x-8 gap-y-8"
            >
              {heroStats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label}>
                    <Icon size={18} className="text-primary mb-3" />
                    <p className="font-display text-3xl sm:text-4xl italic leading-none mb-2">
                      {s.value}
                      {s.suffix}
                    </p>
                    <p className="text-xs text-white/50 uppercase tracking-wide">{s.label}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Category Filter — editorial underline switcher */}
      <div className="flex justify-center py-14 px-6 overflow-x-auto no-scrollbar">
        <div className="inline-flex flex-wrap justify-center gap-6 sm:gap-9">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`group relative py-2 text-xs sm:text-[13px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-300 ${
                  isActive
                    ? "text-secondary dark:text-white"
                    : "text-secondary/50 dark:text-white/50 hover:text-secondary dark:hover:text-white"
                }`}
              >
                {cat}
                {isActive ? (
                  <motion.span
                    layoutId="project-filter-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : (
                  <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-primary/60 rounded-full scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid / Empty State */}
      <div className={`max-w-7xl mx-auto px-6 ${hasOwnCTA ? "pb-24" : ""}`}>
        {activeCategory === "Agro" && emptyVertical ? (
          <AgroExperience />
        ) : activeCategory === "Realty" && emptyVertical ? (
          <RealtyExperience />
        ) : emptyVertical ? (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center py-20 px-6 rounded-[28px] border border-dashed border-secondary/20 dark:border-white/15 max-w-2xl mx-auto"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <emptyVertical.icon size={26} className="text-primary" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-3">
              {emptyVertical.name}
            </h3>
            <p className="text-secondary/60 dark:text-white/60 max-w-md mb-2 leading-relaxed">
              {emptyVertical.description}
            </p>
            <p className="text-sm text-primary font-semibold mt-4 mb-8 tracking-wide uppercase">
              Portfolio showcase coming soon
            </p>
            <Button to="/contact" variant="primary" arrow>
              Discuss This Vertical
            </Button>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => {
                const Icon = project.icon || Landmark;
                const gradient = project.gradient || "from-primary to-accent";

                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    className={`group relative rounded-[28px] p-[1px] bg-gradient-to-br ${gradient} shadow-glass dark:shadow-glass-dark transition-all duration-300 overflow-hidden`}
                  >
                    <div className="rounded-[27px] overflow-hidden bg-card-light dark:bg-card-dark h-full flex flex-col">
                      {/* Gradient hero */}
                      <div className={`relative h-[200px] overflow-hidden bg-gradient-to-br ${gradient} shrink-0`}>
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.7 }}
                        >
                          <Icon size={80} strokeWidth={1.2} className="text-white/40" />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        <div className="absolute top-4 left-4 flex gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-secondary">
                            {project.service}
                          </span>
                        </div>

                        <div className="absolute bottom-5 left-5 right-5">
                          <h3 className="font-heading text-xl font-bold text-white leading-snug">
                            {project.name}
                          </h3>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-secondary/60 dark:text-white/60 text-sm mb-3">
                          <MapPin size={16} className="text-primary" />
                          {project.city}
                        </div>

                        {project.description && (
                          <p className="text-secondary/60 dark:text-white/60 text-sm leading-relaxed mb-4">
                            {project.description}
                          </p>
                        )}

                        {project.progress && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-xs text-secondary/50 dark:text-white/50 mb-1.5">
                              <span>Progress</span>
                              <span className="font-semibold text-primary">{project.progress}</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-secondary/10 dark:bg-white/10 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                                style={{ width: project.progress }}
                              />
                            </div>
                          </div>
                        )}

                        {project.amount && (
                          <div className="flex items-center justify-between text-sm mt-auto pt-4 border-t border-secondary/10 dark:border-white/10">
                            <span className="text-secondary/50 dark:text-white/50">Tender Value</span>
                            <span className="font-semibold text-secondary dark:text-white">
                              ₹{project.amount}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* CTA — Realty/Agro already show their own contextual CTA above */}
      {!hasOwnCTA && (
        <div className="mt-28 relative text-center overflow-hidden">

          {/* Background Glow */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute inset-0 flex justify-center items-center pointer-events-none"
          >
            <div className="w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 px-6"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white">
              Let&apos;s Build <span className="text-primary">Something Great</span> Together
            </h2>

            <p className="text-secondary/60 dark:text-white/60 mt-4 text-lg">
              Start your next project with us — quality, trust &amp; excellence guaranteed
            </p>

            <motion.button
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/contact")}
              className="relative mt-10 px-10 py-4 rounded-full font-semibold text-secondary
              bg-gradient-to-r from-primary to-accent
              shadow-glow
              hover:shadow-[0_12px_40px_rgba(244,180,0,0.5)]
              transition-all duration-300 overflow-hidden
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition duration-500 blur-xl" />
              <span className="relative z-10">Get in Touch</span>
            </motion.button>
          </motion.div>

        </div>
      )}

    </div>
  );
}
