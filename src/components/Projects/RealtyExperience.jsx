import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { realtyCategories } from "../../static-data/realtyContent";
import Button from "../ui/Button";

function CategoryBlock({ category, isActive, onSelect }) {
  const Icon = category.icon;
  return (
    <div className="relative">
      {/* Drop line from the horizontal connector */}
      <div className="hidden lg:block absolute -top-10 left-1/2 -translate-x-1/2 w-px h-10 bg-primary/25" />

      <motion.button
        type="button"
        onClick={() => onSelect(category.id)}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.25 }}
        aria-pressed={isActive}
        className={`w-full text-center rounded-[20px] px-6 py-8 border transition-colors duration-300 ${
          isActive
            ? "border-primary/50 bg-primary/[0.06] shadow-[0_0_40px_-10px_rgba(244,180,0,0.35)]"
            : "border-secondary/10 dark:border-white/10 hover:border-primary/30 bg-transparent"
        }`}
      >
        <div
          className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center border transition-colors duration-300 ${
            isActive ? "border-primary bg-primary/10" : "border-secondary/15 dark:border-white/15 group-hover:border-primary/40"
          }`}
        >
          <Icon size={20} className={isActive ? "text-primary" : "text-secondary/50 dark:text-white/50"} />
        </div>
        <h3
          className={`font-heading text-base font-bold uppercase tracking-wide mb-2 ${
            isActive ? "text-secondary dark:text-white" : "text-secondary/70 dark:text-white/70"
          }`}
        >
          {category.name}
        </h3>
        <p className="text-sm text-secondary/55 dark:text-white/55 leading-relaxed">{category.description}</p>
      </motion.button>
    </div>
  );
}

export default function RealtyExperience() {
  const reduceMotion = useReducedMotion();
  const allProjects = useSelector((state) => state.projects.list);
  const [selectedId, setSelectedId] = useState("residential");

  const selected = realtyCategories.find((c) => c.id === selectedId);

  // Real projects mapped to this Realty sub-category, if any exist.
  // Nothing here is invented — the featured-projects section below
  // simply has nothing to show until real data is added.
  const featured = useMemo(
    () => allProjects.filter((p) => p.category === "Realty" && p.realtySubCategory === selectedId),
    [allProjects, selectedId]
  );

  return (
    <motion.div
      key="realty-experience"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ============ REAL ESTATE VERTICAL DIAGRAM ============ */}
      <section className="mb-20">
        <div className="text-center mb-2">
          <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase">Real Estate Vertical</span>
        </div>

        {/* Stem + horizontal connector */}
        <div className="hidden lg:flex flex-col items-center">
          <div className="w-px h-8 bg-primary/30" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "center" }}
            className="w-3/4 h-px bg-primary/30"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 pt-6 lg:pt-10">
          {realtyCategories.map((category) => (
            <CategoryBlock
              key={category.id}
              category={category}
              isActive={selectedId === category.id}
              onSelect={setSelectedId}
            />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button to="/contact?subject=Project%20Consultation" variant="secondary" arrow>
            Explore {selected.name}
          </Button>
        </div>
      </section>

      {/* ============ FEATURED PROJECTS ============ */}
      <section className="mb-16">
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase block mb-3">
                Featured {selected.name} Projects
              </span>
              <h2 className="font-display text-3xl sm:text-4xl italic text-secondary dark:text-white leading-tight">
                Thoughtfully Designed.
                <br />
                Future Ready.
              </h2>
            </div>
          </div>

          {featured.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((project) => (
                <div
                  key={project.id}
                  className="group rounded-[24px] border border-secondary/10 dark:border-white/10 overflow-hidden hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="relative h-[220px] overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-1.5">{project.name}</h3>
                    <p className="flex items-center gap-1.5 text-sm text-secondary/55 dark:text-white/55 mb-3">
                      <MapPin size={13} className="text-primary shrink-0" /> {project.city}
                    </p>
                    {project.description && (
                      <p className="text-sm text-secondary/55 dark:text-white/55 leading-relaxed mb-4">{project.description}</p>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      View Details
                      <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-16 px-6 rounded-[28px] border border-dashed border-secondary/20 dark:border-white/15">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <selected.icon size={22} className="text-primary" />
              </div>
              <p className="text-sm text-primary font-semibold tracking-wide uppercase mb-3">Coming Soon</p>
              <p className="text-secondary/60 dark:text-white/60 max-w-md">
                Projects in the {selected.name} vertical are coming soon.
              </p>
            </div>
          )}
        </motion.div>
      </section>

      {/* ============ HAVE A PROPERTY PROJECT IN MIND ============ */}
      <section className="relative overflow-hidden rounded-[28px] border border-secondary/10 dark:border-white/10 px-8 sm:px-12 py-14 text-center">
        <p className="font-display text-2xl sm:text-3xl italic text-secondary dark:text-white mb-3">
          Have a Property Project in Mind?
        </p>
        <p className="text-secondary/60 dark:text-white/60 max-w-lg mx-auto mb-8 leading-relaxed">
          Let&apos;s create spaces designed for lasting value.
        </p>
        <Button to="/contact?subject=Project%20Consultation" variant="primary" arrow>
          Discuss Your Project
        </Button>
      </section>
    </motion.div>
  );
}
