import { motion, useReducedMotion } from "framer-motion";
import { clients } from "../../static-data/clients";
import SectionHeading from "../ui/SectionHeading";

// Static "logo wall" — every client is visible at once, nothing is cut off
// at the viewport edge. 12 entries fill complete rows at 2/3/4/6 columns.
export default function OurClients() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#0a1120] py-20 text-white sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[760px] max-w-full -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <SectionHeading
          variant="editorial"
          tone="dark"
          badge="Our Clients"
          title={
            <>
              Trusted by government &amp; <span className="italic text-primary">industry leaders</span>
            </>
          }
          subtitle="RKGC Group is trusted by government authorities, infrastructure agencies, and leading private organizations across India for delivering high-quality construction and development projects."
          className="mb-12 lg:mb-16"
        />

        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.08] sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {clients.map((client, i) => {
            const Icon = client.icon;
            return (
              <motion.li
                key={client.name}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex min-h-[176px] flex-col items-center justify-center gap-3 bg-[#0b1322] px-4 py-7 text-center transition-colors duration-500 hover:bg-[#111b2e]"
              >
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors duration-500 group-hover:border-transparent group-hover:text-white">
                  {/* Brand colour fades in on hover; gold line-art at rest */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${client.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  <Icon className="relative h-5 w-5" />
                </span>
                <p className="text-[13px] font-semibold leading-snug text-white sm:text-sm [text-wrap:balance]">
                  {client.name}
                </p>
                <p className="text-[10px] font-medium uppercase leading-snug tracking-[0.16em] text-white/45 [text-wrap:balance]">
                  {client.subtitle}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
