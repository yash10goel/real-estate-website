import { motion, useReducedMotion } from "framer-motion";
import { teamPortraits } from "../../static-data/team";

const EASE = [0.16, 1, 0.3, 1];

export default function TeamSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="team-heading"
      className="relative overflow-hidden bg-[#07101d] py-20 sm:py-24 lg:py-28"
    >
      {/* Restrained lighting: a soft wash behind the portraits */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_75%_50%,rgba(244,180,0,0.06),transparent_70%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid items-center gap-12 xl:grid-cols-[0.8fr_1.2fr] xl:gap-16">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
                Our People
              </span>
            </div>

            <div className="border-l border-primary/40 pl-5 sm:pl-6">
              <h2
                id="team-heading"
                className="font-display text-[42px] font-semibold leading-[1.02] tracking-tight text-white sm:text-[54px] xl:text-[60px]"
              >
                About Our <span className="italic text-primary">Team</span>
              </h2>
            </div>

            <p className="mt-6 max-w-md text-[15px] leading-7 text-white/60 sm:text-base sm:leading-8">
              Our team is made up of passionate professionals with diverse skills and experiences.
              Together, we collaborate, innovate, and deliver outstanding results while maintaining a
              strong commitment to our clients and company values.
            </p>
          </motion.div>

          {/* Portraits */}
          <div className="relative mx-auto w-full max-w-[340px] sm:mx-0 sm:max-w-[720px] xl:max-w-none">
            {/* Fine connecting line through the portrait centres (single row only) */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/35 to-transparent sm:block"
            />

            <ul className="relative grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-5 xl:gap-6">
              {teamPortraits.map((p, i) => (
                <motion.li
                  key={p.image}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: EASE }}
                  className="group"
                >
                  {/* Gold outer ring → navy gap → photo */}
                  <div className="aspect-square rounded-full bg-[linear-gradient(145deg,rgba(255,213,79,0.85),rgba(244,180,0,0.25)_45%,rgba(230,154,0,0.7))] p-[2px] shadow-[0_0_28px_rgba(244,180,0,0.12)] transition-shadow duration-500 group-hover:shadow-[0_0_36px_rgba(244,180,0,0.3)]">
                    <div className="h-full w-full overflow-hidden rounded-full bg-[#07101d] p-[5px]">
                      <img
                        src={p.image}
                        alt={p.alt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full rounded-full object-cover object-[50%_30%] grayscale transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
