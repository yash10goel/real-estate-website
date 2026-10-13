import { motion } from "framer-motion";

// `variant="pill"` (default) is the original centered badge style used on
// inner pages. `variant="editorial"` is the homepage system: gold rule +
// small caps eyebrow, serif display title, and an optional subtitle that
// sits beside the title on wide screens. `tone="dark"` forces light text
// for sections that are always dark regardless of theme.
export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  variant = "pill",
  tone = "auto",
  className = "",
}) {
  if (variant === "editorial") {
    const dark = tone === "dark";
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16 ${className}`}
      >
        <div>
          {badge && (
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
                {badge}
              </span>
            </div>
          )}
          <h2
            className={`font-display text-[38px] font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-[56px] ${
              dark ? "text-white" : "text-secondary dark:text-white"
            }`}
          >
            {title}
          </h2>
        </div>
        {subtitle && (
          <p
            className={`max-w-xl text-[15px] leading-7 sm:text-base lg:pb-2 ${
              dark ? "text-white/60" : "text-secondary/60 dark:text-white/60"
            }`}
          >
            {subtitle}
          </p>
        )}
      </motion.div>
    );
  }

  const alignment =
    align === "center" ? "text-center mx-auto items-center" : "text-left items-start";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col gap-4 max-w-2xl ${alignment} ${className}`}
    >
      {badge && (
        <span className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/15 text-primary px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
          {badge}
        </span>
      )}
      <h2 className="font-heading text-4xl md:text-[40px] font-bold text-secondary dark:text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-secondary/60 dark:text-white/60 leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
