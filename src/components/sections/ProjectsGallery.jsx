import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Building2, MapPin } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

// A representative pick across verticals (road, commercial build, interior)
// rather than a blind first-three slice, so the teaser reflects the group's range.
const FEATURED_IDS = [1, 7, 10];

export default function ProjectsGallery() {
  const allProjects = useSelector((state) => state.projects.list);
  const projects = FEATURED_IDS
    .map((id) => allProjects?.find((p) => p.id === id))
    .filter(Boolean);
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <SectionHeading
          badge="Our Portfolio"
          title={
            <>
              Featured
              <span className="text-primary"> Projects</span>
            </>
          }
          subtitle="A look across our business verticals — from civil infrastructure to interior fit-outs — delivered with the same standard of quality and trust."
          className="mb-16"
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects.map((project, index) => {
            const Icon = project.icon || Building2;
            const gradient = project.gradient || "from-primary to-accent";

            return (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -10 }}
                onClick={() => navigate(`/projects?category=${project.category}`)}
                className={`group relative rounded-[28px] p-[1px] bg-gradient-to-br ${gradient} shadow-glass dark:shadow-glass-dark transition-all duration-500 cursor-pointer overflow-hidden`}
              >
                <div className="rounded-[27px] overflow-hidden bg-card-light dark:bg-card-dark">
                  {/* Gradient hero */}
                  <div className={`relative h-[220px] overflow-hidden bg-gradient-to-br ${gradient}`}>
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    >
                      <Icon size={92} strokeWidth={1.2} className="text-white/40" />
                    </motion.div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-secondary">
                        {project.service || project.category}
                      </span>
                    </div>

                    {/* Project Name */}
                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="font-heading text-xl font-bold text-white">
                        {project.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">

                    <div className="flex items-center gap-2 text-secondary/60 dark:text-white/60 text-sm mb-5">
                      <MapPin size={16} className="text-primary" />
                      {project.city}
                    </div>

                    {project.progress && (
                      <div className="mb-5">
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

                    <div className="flex items-center justify-between pt-4 border-t border-secondary/10 dark:border-white/10">

                      <span className="text-primary font-semibold text-sm">
                        View Details
                      </span>

                      <div
                        className="
                          w-10 h-10
                          rounded-full
                          bg-primary/10
                          flex items-center justify-center
                          text-primary
                          group-hover:translate-x-1
                          transition
                        "
                      >
                        →
                      </div>

                    </div>

                  </div>
                </div>
              </motion.div>
            );
          })}

        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-14">
          <button
            onClick={() => navigate("/projects")}
            className="
              group
              px-8 py-3.5
              rounded-full
              bg-gradient-to-r from-secondary to-secondary/90
              text-white
              font-medium
              shadow-lg
              hover:shadow-glow
              transition-all duration-300
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
            "
          >
            View More Projects

            <span className="ml-2 inline-block group-hover:translate-x-1 transition">
              →
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
