import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="
            relative
            overflow-hidden
            rounded-[32px]
            bg-gradient-to-br
            from-secondary
            via-secondary
            to-[#1E293B]
            px-8 md:px-14
            py-12 md:py-14
          "
        >
          {/* Background Glow */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-20 -left-20 w-56 h-56 rounded-full bg-primary/20 blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-accent/20 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

            {/* Left Content */}
            <div>

              <span
                className="
                  inline-block
                  px-4 py-2
                  rounded-full
                  bg-primary/15
                  text-primary
                  text-sm
                  font-medium
                  mb-5
                "
              >
                LET'S BUILD TOGETHER
              </span>

              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
                Ready To Build
                <br />
                Your Dream Project?
              </h2>

              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                From residential developments to commercial spaces,
                we deliver innovative construction and real estate
                solutions designed for long-term value and growth.
              </p>

            </div>

            {/* Right Stats Card */}
            <div
              className="
                bg-white/5
                backdrop-blur-md
                rounded-2xl
                p-6
                border border-white/10
              "
            >
              <div className="grid grid-cols-3 gap-4 mb-6">

                <div className="text-center">
                  <h3 className="font-heading text-2xl font-bold text-primary">
                    500+
                  </h3>
                  <p className="text-white/60 text-xs">
                    Projects
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="font-heading text-2xl font-bold text-primary">
                    20+
                  </h3>
                  <p className="text-white/60 text-xs">
                    Years
                  </p>
                </div>

                <div className="text-center">
                  <h3 className="font-heading text-2xl font-bold text-primary">
                    1000+
                  </h3>
                  <p className="text-white/60 text-xs">
                    Clients
                  </p>
                </div>

              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/contact")}
                className="
                  w-full
                  py-3
                  rounded-xl
                  bg-gradient-to-r from-primary to-accent
                  text-secondary
                  font-semibold
                  shadow-glow
                  hover:shadow-[0_0_45px_rgba(244,180,0,0.5)]
                  transition-all duration-300
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary
                "
              >
                Get Free Consultation →
              </motion.button>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
