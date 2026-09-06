import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { verticals } from "../../static-data/verticals";
import { companyStats } from "../../static-data/companyStats";
import Container from "../ui/Container";
import Button from "../ui/Button";
import AgroExperience from "./AgroExperience";
import RealtyExperience from "./RealtyExperience";
import InfrastructureExperience from "./InfrastructureExperience";
import GlobalTradeExperience from "./GlobalTradeExperience";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { FeaturedProject, ProjectCard, gridPattern } from "./ProjectPresentation";
import Seo from "../../seo/Seo";
import { seoConfig } from "../../seo/seoConfig";
import { breadcrumbSchema } from "../../seo/schema";

const categories = verticals.map((v) => v.slug);

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
  const [searchParams, setSearchParams] = useSearchParams();
  const reduceMotion = useReducedMotion();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 80]);

  const requested = searchParams.get("category");
  // No "All" option — the page always shows one of the four verticals,
  // defaulting to Infrastructure (RKGC's flagship, data-rich vertical).
  const [activeCategory, setActiveCategory] = useState(
    categories.includes(requested) ? requested : "Infrastructure"
  );

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSearchParams(cat === "Infrastructure" ? {} : { category: cat });
  };

  const filtered = allProjects.filter((p) => p.category === activeCategory);

  const emptyVertical =
    filtered.length === 0
      ? verticals.find((v) => v.slug === activeCategory)
      : null;

  const [featured, ...rest] = filtered;

  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const openProject = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };
  const closeProjectModal = () => setIsProjectModalOpen(false);

  // Realty and Agro render their own contextual CTA at the end of their
  // experience — showing the generic page-wide CTA too would duplicate it.
  // Global Trade (Spaces) always has its own CTA regardless of emptiness,
  // since it no longer renders the empty-vertical placeholder at all.
  const hasOwnCTA =
    ((activeCategory === "Agro" || activeCategory === "Realty") && emptyVertical) ||
    activeCategory === "Spaces";
  // Infrastructure already carries its own editorial statement + portfolio
  // summary, and Global Trade carries its own footer statement — showing
  // the generic statement again would repeat the beat.
  const hasOwnStatement = activeCategory === "Infrastructure" || activeCategory === "Spaces";

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">

      <Seo
        {...seoConfig["/projects"]}
        path="/projects"
        jsonLd={breadcrumbSchema(seoConfig["/projects"].breadcrumb)}
      />

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
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(244,180,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(244,180,0,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
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
                RKGC Group operates across Infrastructure, Realty, Agro and RKGC Global Trade —
                explore the work behind each vertical.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 divide-x divide-y divide-white/10 border-t border-l border-white/10"
            >
              {heroStats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="px-6 py-5">
                    <Icon size={16} className="text-primary mb-3" />
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
      <nav aria-label="Filter projects by vertical" className="flex justify-center py-14 px-6 overflow-x-auto no-scrollbar">
        <div className="inline-flex justify-center gap-6 sm:gap-9">
          {verticals.map((v) => {
            const cat = v.slug;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleCategoryChange(cat)}
                className={`group relative py-2 text-xs sm:text-[13px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? "text-primary [text-shadow:0_0_18px_rgba(244,180,0,0.35)]"
                    : "text-secondary/50 dark:text-white/50 hover:text-secondary dark:hover:text-white"
                }`}
              >
                {v.label || cat}
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
      </nav>

      {/* Projects / Empty State */}
      <div className={`max-w-7xl mx-auto px-6 ${hasOwnCTA ? "pb-24" : ""}`}>
        {activeCategory === "Infrastructure" ? (
          <InfrastructureExperience onView={openProject} />
        ) : activeCategory === "Agro" && emptyVertical ? (
          <AgroExperience />
        ) : activeCategory === "Realty" && emptyVertical ? (
          <RealtyExperience />
        ) : activeCategory === "Spaces" ? (
          <GlobalTradeExperience />
        ) : emptyVertical ? (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center py-16 px-6 rounded-[4px] border border-dashed border-secondary/20 dark:border-white/15 max-w-xl mx-auto"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
              <emptyVertical.icon size={22} className="text-primary" />
            </div>
            <p className="text-xs text-primary font-semibold tracking-[0.25em] uppercase mb-3">Coming Soon</p>
            <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">
              {emptyVertical.name}
            </h3>
            <p className="text-secondary/55 dark:text-white/55 max-w-sm mb-8 leading-relaxed">
              New projects are currently being prepared for this vertical.
            </p>
            <Button to="/contact?subject=Project%20Consultation" variant="primary" arrow>
              Discuss This Vertical
            </Button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <FeaturedProject project={featured} onView={openProject} />

              {rest.length > 0 && (
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="w-8 h-px bg-primary" />
                    <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">
                      More From The Portfolio
                    </span>
                  </div>
                  <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 pb-20 lg:pb-28">
                    {rest.map((project, i) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        number={String(i + 2).padStart(2, "0")}
                        layout={gridPattern[i % gridPattern.length]}
                        onView={openProject}
                      />
                    ))}
                  </motion.div>
                </section>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Portfolio Statement */}
      {!hasOwnCTA && !hasOwnStatement && (
        <section className="pb-20 lg:pb-24 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display italic text-2xl sm:text-3xl lg:text-4xl text-secondary dark:text-white max-w-2xl mx-auto leading-tight"
          >
            Built for progress. <span className="text-primary">Designed for permanence.</span>
          </motion.p>
        </section>
      )}

      {/* CTA — Realty/Agro already show their own contextual CTA above */}
      {!hasOwnCTA && (
        <section className="pb-24 lg:pb-28 px-6">
          <div className="max-w-4xl mx-auto rounded-[4px] border border-secondary/10 dark:border-white/10 px-8 sm:px-14 py-12 sm:py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-2xl sm:text-3xl italic text-secondary dark:text-white mb-2">
                Have a Project in Mind?
              </h2>
              <p className="text-primary text-sm font-semibold tracking-wide uppercase mb-5">
                Let&apos;s Build Something Extraordinary
              </p>
              <p className="text-secondary/60 dark:text-white/60 max-w-md mx-auto mb-8 leading-relaxed">
                Share your requirements with the RKGC team.
              </p>
              <Button to="/contact?subject=Project%20Consultation" variant="primary" arrow>
                Discuss Your Project
              </Button>
            </motion.div>
          </div>
        </section>
      )}

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isProjectModalOpen}
        onClose={closeProjectModal}
      />

    </div>
  );
}
