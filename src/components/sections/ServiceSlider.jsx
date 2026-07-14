import { motion } from "framer-motion";
import { services } from "../../static-data/services";
import SectionHeading from "../ui/SectionHeading";

export default function ServiceSection() {
  return (
    <section className="py-24 bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Heading */}
        <SectionHeading
          badge="Our Services"
          title={
            <>
              Comprehensive Real Estate{" "}
              <span className="text-primary">Solutions</span>
            </>
          }
          subtitle="We provide complete real estate solutions including residential projects, commercial developments, architecture, consulting and project management."
          className="mb-14"
        />

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
                whileHover={{ y: -8 }}
                className={`group relative rounded-[28px] p-[1px] bg-gradient-to-br ${item.gradient} shadow-glass dark:shadow-glass-dark transition-all duration-300 cursor-pointer`}
              >
                <div
                  className="
                    h-full
                    rounded-[27px]
                    bg-card-light/95 dark:bg-card-dark/95
                    backdrop-blur-xl
                    px-8 py-7
                    min-h-[240px]
                    flex flex-col
                    justify-center
                    text-center
                  "
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    className={`
                      w-16 h-16
                      mx-auto
                      mb-4
                      rounded-2xl
                      bg-gradient-to-br ${item.gradient}
                      flex items-center justify-center
                      shadow-md
                      transition-all duration-300
                    `}
                  >
                    <Icon
                      size={26}
                      strokeWidth={2}
                      className="text-white"
                    />
                  </motion.div>

                  {/* Title */}
                  <h3 className="font-heading text-[22px] font-bold text-secondary dark:text-white mb-3 leading-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-secondary/60 dark:text-white/60 text-sm leading-6 max-w-[260px] mx-auto">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
