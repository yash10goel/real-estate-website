import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";

export default function CTASection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-bg-light py-16 transition-colors duration-300 dark:bg-bg-dark sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative isolate overflow-hidden rounded-[32px] bg-secondary text-white"
        >
          {/* Roadworks photo from the RKGC company profile */}
          <img
            src="/home/cta-roadworks.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-10 h-full w-full object-cover object-[60%_55%] grayscale"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,18,32,0.82)_0%,rgba(11,18,32,0.95)_70%)] md:bg-[linear-gradient(100deg,#0B1220_20%,rgba(11,18,32,0.88)_55%,rgba(11,18,32,0.55)_100%)]" />
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

          <div className="grid gap-10 px-7 py-14 sm:px-12 sm:py-16 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:px-16 lg:py-20">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-primary" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
                  Let&apos;s build together
                </span>
              </div>

              <h2 className="font-display text-[38px] font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-[58px]">
                Ready to build your <span className="italic text-primary">dream project?</span>
              </h2>

              <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/70 sm:text-base">
                From residential developments to commercial spaces, we deliver innovative
                construction and real estate solutions designed for long-term value and growth.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Link
                to="/contact?subject=Project%20Consultation"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#E69A00,#FFC928)] px-8 py-4 text-[15px] font-bold text-secondary shadow-[0_14px_40px_-12px_rgba(244,180,0,0.6)] transition-shadow duration-300 hover:shadow-[0_18px_50px_-10px_rgba(244,180,0,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
              >
                Get Free Consultation
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="/pdf/RKGC%20PROFILE.pdf"
                download="RKGC-PROFILE.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-[15px] font-semibold text-white transition-colors duration-300 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Download size={16} />
                Download Company Profile
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
