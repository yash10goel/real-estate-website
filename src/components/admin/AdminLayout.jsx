import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

// Note: does not own a ToastProvider — the page rendering this layout is
// expected to supply one above it, so every child (including this layout's
// own content) shares a single toast context instead of duplicating it.
export default function AdminLayout({ breadcrumb, onLogout, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-bg-light dark:bg-bg-dark transition-colors duration-300">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar
          breadcrumb={breadcrumb}
          onOpenMobile={() => setMobileOpen(true)}
          onLogout={onLogout}
        />
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
