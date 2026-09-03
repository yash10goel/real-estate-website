import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Building2 } from "lucide-react";

export default function ProjectsGallery() {
  const allProjects = useSelector((state) => state.projects.list);

  /*
   * Keep your existing featured project selection.
   * Change IDs whenever you want to feature different projects.
   */
  const FEATURED_IDS = [1, 7, 10];

  const featuredProjects = useMemo(() => {
    return FEATURED_IDS
      .map((id) => allProjects?.find((project) => project.id === id))
      .filter(Boolean);
  }, [allProjects]);

  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = featuredProjects[activeIndex];

  if (!activeProject) return null;

  /*
   * Supports different possible image field names.
   */
  const getProjectImage = (project) => {
    return (
      project?.image ||
      project?.imageUrl ||
      project?.thumbnail ||
      project?.coverImage ||
      project?.bannerImage ||
      null
    );
  };

  const image = getProjectImage(activeProject);

  /*
   * Converts values such as:
   * "70%" -> 70
   * 70 -> 70
   */
  const getProgress = (project) => {
    if (!project?.progress) return null;

    const value = String(project.progress).replace("%", "");

    const number = Number(value);

    return Number.isFinite(number) ? number : null;
  };

  const progress = getProgress(activeProject);

  /*
   * Link to the complete projects page, filtered to this project's category.
   */
  const projectHref = `/projects?category=${encodeURIComponent(
    activeProject.category || ""
  )}`;

  return (
    <section className="relative overflow-hidden bg-[#080f1c] py-24 text-white md:py-32">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* architectural grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
          }}
        />

        {/* subtle gold glow */}
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#f5b817]/[0.035] blur-[140px]" />

        {/* architectural vertical line */}
        <div className="absolute left-[7%] top-0 hidden h-full w-px bg-white/[0.04] lg:block" />

        <div className="absolute right-[7%] top-0 hidden h-full w-px bg-white/[0.04] lg:block" />
      </div>

      <div className="relative mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">

        {/* =====================================================
            HEADER
        ====================================================== */}
        {/* =====================================================
    PORTFOLIO HEADER
===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mb-16 text-center"
        >
          {/* Badge */}
          <div className="mb-7 inline-flex items-center rounded-full bg-[#f5b817]/10 px-5 py-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f5b817]">
              Our Portfolio
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-4xl font-medium leading-tight tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl">
            Explore Our{" "}
            <span className="text-[#f5b817]">
              Projects
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-white/55 sm:text-lg">
            A look across our business verticals — from civil infrastructure
            to real estate and interior spaces — delivered with the same
            standard of quality, trust and excellence.
          </p>

          {/* Decorative line */}
          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#f5b817]/50" />

            <span className="h-1.5 w-1.5 rounded-full bg-[#f5b817]" />

            <span className="h-px w-10 bg-[#f5b817]/50" />
          </div>
        </motion.div>

        {/* =====================================================
            FEATURED PROJECT
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden border border-white/[0.10] bg-[#0a1220]"
        >
          {/* GOLD TOP LINE */}
          <div className="absolute left-0 right-0 top-0 z-20 h-px bg-gradient-to-r from-[#f5b817] via-[#f5b817]/60 to-transparent" />

          <div className="grid min-h-[520px] lg:grid-cols-[0.85fr_1.15fr]">

            {/* =================================================
                LEFT CONTENT
            ================================================== */}

            <div className="relative flex flex-col justify-between overflow-hidden p-7 sm:p-10 lg:p-12">

              {/* giant number */}
              <div className="pointer-events-none absolute -right-8 top-4 select-none font-serif text-[180px] font-light leading-none text-white/[0.025] sm:text-[230px]">
                {String(activeIndex + 1).padStart(2, "0")}
              </div>

              {/* small vertical architectural line */}
              <div className="absolute left-0 top-16 h-32 w-px bg-[#f5b817]" />

              <div className="relative z-10">

                <div className="mb-10 flex items-center gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#f5b817]">
                    Featured Project
                  </span>

                  <span className="h-px w-12 bg-[#f5b817]/50" />
                </div>

                {/* project number */}
                <div className="mb-4 font-serif text-5xl italic text-[#f5b817]/80">
                  {String(activeIndex + 1).padStart(2, "0")}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="max-w-md font-serif text-4xl leading-[1.05] text-white sm:text-5xl">
                      {activeProject.name}
                    </h3>

                    <div className="mt-6 space-y-3 text-sm">

                      {/* employer */}
                      {(activeProject.employer ||
                        activeProject.client ||
                        activeProject.company) && (
                          <div className="flex items-center gap-3 text-white/60">
                            <Building2
                              size={15}
                              strokeWidth={1.4}
                              className="text-[#f5b817]"
                            />

                            <span>
                              {activeProject.employer ||
                                activeProject.client ||
                                activeProject.company}
                            </span>
                          </div>
                        )}

                      {/* location */}
                      {(activeProject.city ||
                        activeProject.location) && (
                          <div className="flex items-center gap-3 text-white/60">
                            <MapPin
                              size={15}
                              strokeWidth={1.4}
                              className="text-[#f5b817]"
                            />

                            <span>
                              {activeProject.city ||
                                activeProject.location}
                            </span>
                          </div>
                        )}

                      {/* work type */}
                      {(activeProject.workType ||
                        activeProject.natureOfWork ||
                        activeProject.service) && (
                          <div className="pt-1 text-xs uppercase tracking-[0.12em] text-white/35">
                            {activeProject.workType ||
                              activeProject.natureOfWork ||
                              activeProject.service}
                          </div>
                        )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* =================================================
                  PROJECT STATS
              ================================================== */}

              <div className="relative z-10 mt-12 border-t border-white/[0.10] pt-6">

                <div className="grid grid-cols-2 gap-6">

                  {/* progress */}
                  {progress !== null && (
                    <div>
                      <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                        Progress
                      </div>

                      <div className="font-serif text-3xl text-[#f5b817]">
                        {progress}%
                      </div>

                      <div className="mt-2 h-px w-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1 }}
                          className="h-px bg-[#f5b817]"
                        />
                      </div>
                    </div>
                  )}

                  {/* contract */}
                  {(activeProject.contractValue ||
                    activeProject.value ||
                    activeProject.tenderValue) && (
                      <div>
                        <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/35">
                          Contract Value
                        </div>

                        <div className="font-serif text-xl text-white sm:text-2xl">
                          {activeProject.contractValue ||
                            activeProject.value ||
                            activeProject.tenderValue}
                        </div>
                      </div>
                    )}
                </div>

                {/* CTA */}
                <Link
                  to={projectHref}
                  className="group mt-7 inline-flex items-center gap-3 border-b border-[#f5b817]/60 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#f5b817] transition-colors hover:border-[#f5b817] hover:text-white"
                >
                  View Project

                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* =================================================
                RIGHT IMAGE
            ================================================== */}

            <div className="relative min-h-[330px] overflow-hidden lg:min-h-full">

              {image ? (
                <motion.img
                  key={image}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  src={image}
                  alt={activeProject.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                /* Premium fallback instead of generic icon */
                <div className="absolute inset-0 overflow-hidden bg-[#0c1625]">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(245,184,23,.15) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(245,184,23,.15) 1px, transparent 1px)
                      `,
                      backgroundSize: "45px 45px",
                    }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="font-serif text-[180px] italic text-[#f5b817]/10">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 text-[10px] uppercase tracking-[0.3em] text-[#f5b817]/50">
                    RKGC Infrastructure
                  </div>
                </div>
              )}

              {/* image dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#080f1c]/20 via-transparent to-black/20" />

              {/* image number */}
              <div className="absolute bottom-5 right-6 font-serif text-7xl italic text-white/20">
                {String(activeIndex + 1).padStart(2, "0")}
              </div>

              {/* gold corner */}
              <div className="absolute right-0 top-0 h-16 w-16 border-l border-b border-[#f5b817]/60" />
            </div>
          </div>

          {/* =====================================================
              PROJECT INDEX
          ====================================================== */}

          <div className="border-t border-white/[0.10] bg-[#080f1a]">

            <div className="flex overflow-x-auto scrollbar-hide">
              {featuredProjects.map((project, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={project.id || index}
                    onClick={() => setActiveIndex(index)}
                    className={`group relative min-w-[210px] flex-1 border-r border-white/[0.08] px-5 py-5 text-left transition-all duration-300 ${isActive
                        ? "bg-white/[0.035]"
                        : "hover:bg-white/[0.02]"
                      }`}
                  >
                    {/* active line */}
                    <span
                      className={`absolute bottom-0 left-0 h-px bg-[#f5b817] transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    />

                    <div className="mb-1 text-[10px] font-serif italic text-[#f5b817]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div
                      className={`text-xs font-medium uppercase tracking-[0.08em] transition-colors ${isActive
                          ? "text-white"
                          : "text-white/40 group-hover:text-white"
                        }`}
                    >
                      {project.name}
                    </div>
                  </button>
                );
              })}

              <Link
                to="/projects"
                className="flex min-w-[170px] items-center justify-center gap-2 px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#f5b817] transition-colors hover:bg-white/[0.03] hover:text-white"
              >
                View All Projects
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            BOTTOM PORTFOLIO STATEMENT
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 flex flex-col justify-between gap-8 border-y border-white/[0.08] py-8 sm:flex-row sm:items-center"
        >
          <div>
            <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#f5b817]">
              RKGC Group
            </div>

            <h3 className="font-serif text-2xl text-white sm:text-3xl">
              Built for progress.
              <span className="ml-2 italic text-[#f5b817]">
                Designed for permanence.
              </span>
            </h3>
          </div>

          <Link
            to="/projects"
            className="group inline-flex shrink-0 items-center gap-3 border border-[#f5b817]/50 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#f5b817] transition-all duration-300 hover:bg-[#f5b817] hover:text-[#080f1c]"
          >
            Explore Portfolio

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}