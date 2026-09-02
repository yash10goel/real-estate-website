import { motion } from "framer-motion";
import { projects, infrastructurePortfolioTotal } from "../../static-data/projects";
import { FeaturedProject, ProjectCard, gridPattern } from "./ProjectPresentation";

// Real 11 ongoing works, in the company's own document order — the
// featured slot only re-highlights one of them, it never removes it
// from its numbered position below.
const infrastructureProjects = projects.filter((p) => p.category === "Infrastructure");
const featuredProject = infrastructureProjects.find((p) => p.id === 3); // Pocket Q – Sector 20, 80% complete

export default function InfrastructureExperience({ onView }) {
  return (
    <div>
      {/* ============ INTRO ============ */}
      <section className="mb-14 lg:mb-20 max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-primary" />
          <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">Infrastructure Portfolio</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-medium italic text-secondary dark:text-white leading-tight mb-4">
          Infrastructure That Moves Progress.
        </h2>
        <p className="text-secondary/60 dark:text-white/60 leading-relaxed">
          Explore RKGC's ongoing infrastructure work across roads, development, railway and civic
          infrastructure.
        </p>
      </section>

      <FeaturedProject project={featuredProject} onView={onView} number={featuredProject.projectNumber} />

      {/* ============ EDITORIAL STATEMENT ============ */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center font-display italic text-xl sm:text-2xl text-secondary/70 dark:text-white/60 mb-14 lg:mb-20"
      >
        Built for progress. <span className="text-primary not-italic font-semibold">Designed for purpose.</span>
      </motion.p>

      {/* ============ FULL COLLECTION, SOURCE ORDER ============ */}
      <section className="mb-16 lg:mb-20">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-px bg-primary" />
          <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">
            More From The Infrastructure Portfolio
          </span>
        </div>
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {infrastructureProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              number={project.projectNumber}
              layout={gridPattern[i % gridPattern.length]}
              onView={onView}
            />
          ))}
        </motion.div>
      </section>

      {/* ============ PORTFOLIO SUMMARY ============ */}
      <section className="pb-20 lg:pb-28">
        <div className="rounded-[4px] border border-secondary/10 dark:border-white/10 px-8 sm:px-14 py-10 sm:py-12">
          <p className="text-primary text-xs font-semibold tracking-[0.25em] uppercase text-center mb-8">
            Ongoing Infrastructure
          </p>
          <div className="grid grid-cols-2 divide-x divide-secondary/10 dark:divide-white/10 max-w-md mx-auto text-center">
            <div className="px-6">
              <p className="font-display text-4xl sm:text-5xl italic text-secondary dark:text-white leading-none mb-2">
                {infrastructurePortfolioTotal.count}
              </p>
              <p className="text-[11px] text-secondary/45 dark:text-white/45 uppercase tracking-wide">Projects</p>
            </div>
            <div className="px-6">
              <p className="font-display text-4xl sm:text-5xl italic text-primary leading-none mb-2">
                ~₹{infrastructurePortfolioTotal.approxCrore} Cr
              </p>
              <p className="text-[11px] text-secondary/45 dark:text-white/45 uppercase tracking-wide">
                Contract Value (approx.)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
