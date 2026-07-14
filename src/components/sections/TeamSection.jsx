import { team } from "../../static-data/team";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

export default function TeamSection() {
  return (
    <section className="py-24 bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <SectionHeading
          badge="Our Team"
          title={
            <>
              Meet Our
              <span className="text-primary"> Experts</span>
            </>
          }
          subtitle="A passionate team of professionals committed to delivering exceptional construction and real estate solutions with innovation, quality and trust."
          className="mb-14"
        />

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto justify-items-center">

          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              whileHover={{ y: -10 }}
              className="group relative w-full max-w-sm h-full rounded-[28px] p-[1px] bg-gradient-to-br from-primary/60 via-accent/40 to-primary/60 shadow-glass dark:shadow-glass-dark hover:shadow-glow transition-all duration-300 cursor-pointer"
            >
              <div className="h-full rounded-[27px] bg-card-light/95 dark:bg-card-dark/95 backdrop-blur-xl px-8 pt-10 pb-8 flex flex-col items-center text-center">

                {/* Circular Image with golden border */}
                <div className="relative w-32 h-32 rounded-full p-1.5 bg-gradient-to-br from-primary to-accent mb-6 shadow-glow">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full rounded-full object-cover border-4 border-card-light dark:border-card-dark transition duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Name & Role */}
                <h3 className="font-heading text-xl font-bold text-secondary dark:text-white">
                  {member.name}
                </h3>
                <p className="text-primary text-xs font-semibold tracking-wide uppercase mt-2">
                  {member.role}
                </p>

                <p className="text-secondary/60 dark:text-white/60 text-sm leading-6 mt-5">
                  Dedicated to excellence, innovation and delivering
                  outstanding project results through expertise,
                  teamwork and commitment.
                </p>

                <div
                  className="
                    mt-5
                    h-[2px]
                    w-0
                    bg-primary
                    group-hover:w-12
                    transition-all duration-500
                  "
                />

                <a
                  href="#"
                  aria-label={`${member.name} on LinkedIn`}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-5 w-10 h-10 rounded-full bg-primary/10 dark:bg-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-secondary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Linkedin size={16} />
                </a>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
