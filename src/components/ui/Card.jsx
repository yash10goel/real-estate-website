import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  gradient = "from-primary/60 via-accent/40 to-primary/60",
  hover = true,
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -8 } : undefined}
      className={`group relative rounded-[28px] p-[1px] bg-gradient-to-br ${gradient} shadow-glass dark:shadow-glass-dark transition-transform duration-300`}
      {...props}
    >
      <div
        className={`h-full w-full rounded-[27px] bg-card-light/90 dark:bg-card-dark/90 backdrop-blur-xl ${className}`}
      >
        {children}
      </div>
    </motion.div>
  );
}
