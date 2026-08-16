import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Globe,
  Users,
  FolderKanban,
  Wrench,
  FileText,
  BarChart3,
  TrendingUp,
  Download,
  Settings,
  ScrollText,
  ChevronsLeft,
  X,
  Building2,
} from "lucide-react";

const nav = [
  {
    label: "Main",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, path: null },
      { name: "Contact Leads", icon: Inbox, path: "/admin/userinfo" },
      { name: "Job Applications", icon: Briefcase, path: "/admin/job-applications" },
      { name: "Website Enquiries", icon: Globe, path: null },
    ],
  },
  {
    label: "Management",
    items: [
      { name: "Users", icon: Users, path: null },
      { name: "Projects", icon: FolderKanban, path: null },
      { name: "Services", icon: Wrench, path: null },
      { name: "Content Management", icon: FileText, path: null },
    ],
  },
  {
    label: "Reports",
    items: [
      { name: "Lead Reports", icon: BarChart3, path: null },
      { name: "Analytics", icon: TrendingUp, path: null },
      { name: "Export History", icon: Download, path: null },
    ],
  },
  {
    label: "System",
    items: [
      { name: "Settings", icon: Settings, path: null },
      { name: "Activity Logs", icon: ScrollText, path: null },
    ],
  },
];

function NavItem({ item, collapsed, currentPath, onNavigate }) {
  const Icon = item.icon;
  const isActive = item.path && currentPath === item.path;
  const isDisabled = !item.path;

  const content = (
    <>
      <Icon size={18} className="shrink-0" />
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap overflow-hidden text-sm font-medium"
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>
      {isDisabled && !collapsed && (
        <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-secondary/30 dark:text-white/25 shrink-0">
          Soon
        </span>
      )}
    </>
  );

  const baseClass = `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 ${
    isActive
      ? "bg-primary/10 text-primary"
      : isDisabled
      ? "text-secondary/30 dark:text-white/25 cursor-not-allowed"
      : "text-secondary/60 dark:text-white/60 hover:bg-secondary/5 dark:hover:bg-white/5 hover:text-secondary dark:hover:text-white"
  }`;

  if (isDisabled) {
    return (
      <div className={baseClass} title="Coming soon" aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link to={item.path} onClick={onNavigate} className={baseClass}>
      {content}
    </Link>
  );
}

export default function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  const { pathname } = useLocation();

  const body = (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className={`flex items-center gap-3 px-4 py-5 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-secondary shrink-0">
          <Building2 size={16} strokeWidth={2.4} />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-heading font-bold text-secondary dark:text-white text-sm leading-none truncate">
              RKGC Admin
            </p>
            <p className="text-[11px] text-secondary/40 dark:text-white/40 mt-1">Control Panel</p>
          </div>
        )}
        <button
          onClick={onCloseMobile}
          aria-label="Close menu"
          className="ml-auto lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-secondary/50 dark:text-white/50 hover:bg-secondary/5 dark:hover:bg-white/5"
        >
          <X size={16} />
        </button>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-6">
        {nav.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-secondary/30 dark:text-white/25">
                {group.label}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  collapsed={collapsed}
                  currentPath={pathname}
                  onNavigate={onCloseMobile}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse toggle (desktop only) */}
      <div className="hidden lg:block p-3 border-t border-secondary/10 dark:border-white/10">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-secondary/50 dark:text-white/50 hover:bg-secondary/5 dark:hover:bg-white/5 hover:text-secondary dark:hover:text-white transition-colors"
        >
          <motion.span animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronsLeft size={18} />
          </motion.span>
          {!collapsed && <span className="text-sm font-medium">Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 76 : 264 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:block shrink-0 h-screen sticky top-0 bg-card-light dark:bg-card-dark border-r border-secondary/10 dark:border-white/10"
      >
        {body}
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 z-[9990] bg-black/50 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-[9991] w-[280px] bg-card-light dark:bg-card-dark border-r border-secondary/10 dark:border-white/10 lg:hidden"
            >
              {body}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
