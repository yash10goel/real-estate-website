import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Route, Building2, Sofa, HardHat, Landmark, MapPin } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

const iconByType = {
  "Road Construction": Route,
  Infrastructure: HardHat,
  Interior: Sofa,
  "Building Construction": Building2,
  "Commercial Construction": Landmark,
};

export default function ProjectsGallery() {
  const projects = useSelector((state) => state.projects.list);
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
          subtitle="Discover our residential, commercial and infrastructure projects crafted with innovation, quality and excellence."
          className="mb-16"
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {projects?.slice(0, 3).map((project, index) => {
            const Icon = iconByType[project.type] || Building2;
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
                        {project.type}
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
