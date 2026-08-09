import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const variants = {
  primary:
    "bg-[linear-gradient(135deg,#E69A00,#FFC928)] text-secondary shadow-[0_12px_38px_rgba(230,154,0,0.5)] hover:shadow-[0_20px_55px_rgba(255,201,40,0.7)] font-bold",
  secondary:
    "bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-secondary/15 dark:border-white/20 text-secondary dark:text-white hover:bg-white/20 dark:hover:bg-white/10 hover:border-primary/60 font-semibold",
};

const sizes = {
  md: "px-7 py-3 text-sm",
  lg: "px-8 py-3.5 text-[15px]",
};

export default function Button({
  as,
  to,
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  magnetic = true,
  className = "",
  children,
  onClick,
  ...props
}) {
  const ref = useRef(null);
  const [ripples, setRipples] = useState([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 });

  const handleMouseMove = (e) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (e) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const id = Date.now();
      setRipples((prev) => [
        ...prev,
        { id, left: e.clientX - rect.left, top: e.clientY - rect.top },
      ]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
    }
    onClick?.(e);
  };

  const classes = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${sizes[size] || sizes.md} ${variants[variant]} ${className}`;

  const MotionComp =
    to || as === Link
      ? motion(Link)
      : href
      ? motion.a
      : motion.button;

  const linkProps = to ? { to } : href ? { href } : {};

  return (
    <MotionComp
      ref={ref}
      style={magnetic ? { x: springX, y: springY } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className={classes}
      {...linkProps}
      {...props}
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.45 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="pointer-events-none absolute w-10 h-10 rounded-full bg-white"
          style={{ left: r.left - 20, top: r.top - 20 }}
        />
      ))}

      {/* Ambient shine sweep, every few seconds */}
      {variant === "primary" && (
        <motion.span
          aria-hidden="true"
          animate={{ x: ["-150%", "250%"] }}
          transition={{ duration: 1.3, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12"
        />
      )}

      <span className="relative z-10 inline-flex items-center gap-2 transition-transform duration-300 group-hover:-translate-y-0.5">
        {children}
        {arrow && (
          <motion.span
            className="inline-flex"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
          >
            <ArrowRight size={16} />
          </motion.span>
        )}
      </span>
    </MotionComp>
  );
}
