import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-gradient-to-r from-primary to-accent text-secondary shadow-glow hover:shadow-[0_0_45px_rgba(244,180,0,0.5)]",
  secondary:
    "bg-white/10 dark:bg-white/5 backdrop-blur-md border border-secondary/15 dark:border-white/20 text-secondary dark:text-white hover:border-primary/60",
};

export default function Button({
  as,
  to,
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-sm tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${variants[variant]} ${className}`;

  const MotionComp =
    to || as === Link
      ? motion(Link)
      : href
      ? motion.a
      : motion.button;

  const linkProps = to ? { to } : href ? { href } : {};

  return (
    <MotionComp
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={classes}
      {...linkProps}
      {...props}
    >
      {children}
    </MotionComp>
  );
}
