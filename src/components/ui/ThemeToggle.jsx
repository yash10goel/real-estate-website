import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../utils/theme.jsx";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className={`relative flex h-8 w-16 items-center rounded-full border border-secondary/10 dark:border-white/15 bg-white/60 dark:bg-white/10 backdrop-blur-md px-1 shadow-inner transition-all duration-300 hover:border-primary/40 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
    >
      <Sun className="absolute left-1.5 h-4 w-4 text-primary" />
      <Moon className="absolute right-1.5 h-4 w-4 text-secondary/40 dark:text-accent" />
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-accent shadow-glow"
        style={{ marginLeft: isDark ? "auto" : 0 }}
      />
    </motion.button>
  );
}
