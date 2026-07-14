import { motion } from "framer-motion";

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className = "",
}) {
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
