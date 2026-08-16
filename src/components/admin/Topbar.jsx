import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronRight, LogOut, User, Bell } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import { ADMIN_EMAIL } from "../../utils/auth";

export default function Topbar({ breadcrumb, onOpenMobile, onLogout }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-[100] flex items-center gap-4 px-4 sm:px-6 py-4 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-xl border-b border-secondary/10 dark:border-white/10">
      <button
        onClick={onOpenMobile}
        aria-label="Open menu"
        className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-secondary/60 dark:text-white/60 hover:bg-secondary/5 dark:hover:bg-white/5"
      >
        <Menu size={18} />
      </button>

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-sm min-w-0">
        {breadcrumb.map((crumb, i) => (
          <span key={crumb} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && <ChevronRight size={13} className="text-secondary/30 dark:text-white/30 shrink-0" />}
            <span
              className={`truncate ${
                i === breadcrumb.length - 1
                  ? "text-secondary dark:text-white font-semibold"
                  : "text-secondary/45 dark:text-white/45"
              }`}
            >
              {crumb}
            </span>
          </span>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <button
          aria-label="Notifications (none yet)"
          title="No new notifications"
          className="relative w-9 h-9 rounded-lg flex items-center justify-center text-secondary/50 dark:text-white/50 hover:bg-secondary/5 dark:hover:bg-white/5 transition-colors"
        >
          <Bell size={17} />
        </button>

        <ThemeToggle />

        {/* Profile menu */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setProfileOpen((p) => !p)}
            className="flex items-center gap-2.5 pl-1 pr-2.5 sm:pr-3 py-1 rounded-full hover:bg-secondary/5 dark:hover:bg-white/5 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-secondary text-xs font-bold shrink-0">
              A
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <p className="text-sm font-semibold text-secondary dark:text-white">Admin</p>
              <p className="text-[11px] text-secondary/40 dark:text-white/40">Administrator</p>
            </div>
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-secondary/10 dark:border-white/10">
                  <p className="text-sm font-semibold text-secondary dark:text-white flex items-center gap-2">
                    <User size={14} className="text-primary" /> Administrator
                  </p>
                  <p className="text-xs text-secondary/50 dark:text-white/50 mt-0.5 truncate">{ADMIN_EMAIL}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-500/5 transition-colors"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
