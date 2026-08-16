import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Dropdown({ label, icon: Icon, children, align = "left" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark text-sm text-secondary/70 dark:text-white/70 hover:border-primary/40 transition-colors duration-200 whitespace-nowrap"
      >
        {Icon && <Icon size={14} className="text-secondary/40 dark:text-white/40" />}
        {label}
        <ChevronDown size={14} className={`text-secondary/40 dark:text-white/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={`absolute ${align === "right" ? "right-0" : "left-0"} mt-2 min-w-[200px] rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden z-50`}
          >
            {typeof children === "function" ? children(() => setOpen(false)) : children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DropdownItem({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
        active
          ? "bg-primary/10 text-primary font-medium"
          : "text-secondary/70 dark:text-white/70 hover:bg-secondary/5 dark:hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );
}
