import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapPin, Landmark } from "lucide-react";
import { verticals } from "../../static-data/verticals";
import Button from "../ui/Button";

const categories = ["All", ...verticals.map((v) => v.slug)];

export default function ProjectsDetailPage() {
  const allProjects = useSelector((state) => state.projects.list);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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

  return (
    <div className="pt-32 pb-24 min-h-screen bg-gradient-to-br from-bg-light via-primary/5 to-bg-light dark:from-bg-dark dark:via-secondary dark:to-bg-dark transition-colors duration-300">

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 px-6">
        <span className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/15 text-primary px-4 py-1.5 text-xs font-semibold tracking-widest uppercase mb-5">
          Our Portfolio
        </span>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary dark:text-white">
          Projects Across <span className="text-primary">Four Verticals</span>
        </h1>
        <p className="text-secondary/60 dark:text-white/60 mt-4 text-lg leading-relaxed">
          RKGC Group operates across Infrastructure, Realty, Agro and Spaces —
          explore the work behind each vertical.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex justify-center mb-16 px-6">
        <div className="inline-flex flex-wrap justify-center gap-1 p-1.5 rounded-full bg-secondary/5 dark:bg-white/5 border border-secondary/10 dark:border-white/10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-secondary"
                    : "text-secondary/55 dark:text-white/55 hover:text-secondary dark:hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid / Empty State */}
      <div className="max-w-7xl mx-auto px-6">
        {emptyVertical ? (
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

      {/* CTA */}
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

    </div>
  );
}
