import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, MapPin, Landmark, Building2, Loader2 } from "lucide-react";
import { verticals } from "../../static-data/verticals";
import { generateProjectPdf, buildFallbackDescription } from "../../utils/generateProjectPdf";
import Button from "../ui/Button";

export default function ProjectDetailsModal({ project, isOpen, onClose }) {
  const [downloading, setDownloading] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const closeRef = useRef(null);

  const vertical = project ? verticals.find((v) => v.slug === project.category) : null;
  const Icon = project?.icon || Landmark;

  // Most projects now have their own assigned photo; the vertical's
  // photo remains a fallback for the few that don't. The gallery is
  // built to support more than one image the moment that exists.
  const projectImage = project?.image || vertical?.image;
  const gallery = projectImage ? [projectImage] : [];

  useEffect(() => {
    if (!isOpen) return;
    setMainImageIndex(0);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      await generateProjectPdf(project, vertical);
    } finally {
      setDownloading(false);
    }
  };

  const isStartSoon = project.status === "start-soon";

  const metaItems = [
    project.employer ? { label: "Employer", value: project.employer } : { label: "Category", value: project.category },
    project.workType ? { label: "Work Type", value: project.workType } : null,
    { label: "Location", value: project.location },
    isStartSoon ? { label: "Status", value: "Start Soon" } : project.progress ? { label: "Progress", value: project.progress } : null,
    project.amount ? { label: "Contract Value", value: `₹${project.amount}` } : null,
  ].filter(Boolean);

  const overview = [
    { label: "Project Name", value: project.name },
    project.employer ? { label: "Employer", value: project.employer } : null,
    project.workType ? { label: "Work Type", value: project.workType } : null,
    !project.employer ? { label: "Category", value: project.category } : null,
    { label: "Location", value: project.location },
    isStartSoon ? { label: "Status", value: "Start Soon" } : project.progress ? { label: "Progress", value: project.progress } : null,
    project.amount ? { label: "Contract Value", value: `₹${project.amount}` } : null,
  ].filter(Boolean);

  const description = project.description || buildFallbackDescription(project);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10020]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="absolute inset-0 overflow-y-auto sm:flex sm:items-center sm:justify-center sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dossier-title"
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full min-h-full sm:min-h-0 sm:max-w-[980px] sm:w-full sm:max-h-[90vh] bg-bg-light dark:bg-[#0B111F] sm:rounded-[4px] sm:border sm:border-white/10 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-bg-light/95 dark:bg-[#0B111F]/95 backdrop-blur-md border-b border-secondary/10 dark:border-white/10">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-8 h-8 rounded-md bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center text-secondary shrink-0">
                    <Building2 size={15} strokeWidth={2.2} />
                  </span>
                  <div className="leading-none min-w-0">
                    <p className="font-heading text-sm font-bold text-secondary dark:text-white truncate">
                      RKGC <span className="text-primary">Group</span>
                    </p>
                    <p className="text-[9px] font-semibold tracking-[0.25em] uppercase text-secondary/45 dark:text-white/40 mt-1">
                      Project Dossier
                    </p>
                  </div>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Close project details"
                  onClick={onClose}
                  className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-secondary/60 dark:text-white/60 hover:text-primary hover:bg-primary/10 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 min-h-0 overflow-y-auto">
                {/* Hero image */}
                <div className="relative h-[220px] sm:h-[340px] lg:h-[400px] overflow-hidden">
                  {gallery.length > 0 ? (
                    <img
                      key={gallery[mainImageIndex]}
                      src={gallery[mainImageIndex]}
                      alt={project.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ filter: "saturate(0.95)" }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-secondary dark:bg-[#0A0E1A] flex items-center justify-center">
                      <Icon size={64} strokeWidth={1.1} className="text-white/10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />
                  <div className="absolute inset-x-5 sm:inset-x-8 bottom-5 sm:bottom-7">
                    <span className="inline-block text-primary text-[10px] font-semibold tracking-[0.25em] uppercase mb-2">
                      {project.category}
                    </span>
                    <h2
                      id="project-dossier-title"
                      className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-white leading-tight mb-1.5"
                    >
                      {project.name}
                    </h2>
                    <p className="flex items-center gap-1.5 text-white/65 text-sm">
                      <MapPin size={13} className="text-primary shrink-0" />
                      {project.location}
                    </p>
                  </div>
                </div>

                {gallery.length > 1 && (
                  <div className="flex gap-3 px-5 sm:px-8 py-4 border-b border-secondary/10 dark:border-white/10 overflow-x-auto no-scrollbar">
                    {gallery.map((src, i) => (
                      <button
                        key={src + i}
                        type="button"
                        onClick={() => setMainImageIndex(i)}
                        aria-label={`Show image ${i + 1}`}
                        className={`relative w-20 h-14 shrink-0 rounded-[3px] overflow-hidden border transition-colors duration-300 ${
                          i === mainImageIndex ? "border-primary" : "border-transparent hover:border-primary/40"
                        }`}
                      >
                        <img src={src} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Meta strip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-secondary/10 dark:divide-white/10 border-b border-secondary/10 dark:border-white/10">
                  {metaItems.map((item) => (
                      <div key={item.label} className="px-5 sm:px-8 py-5">
                        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-secondary/40 dark:text-white/40 mb-1.5">
                          {item.label}
                        </p>
                        <p className="font-display text-lg sm:text-xl italic text-secondary dark:text-white">
                          {item.value}
                        </p>
                      </div>
                    ))}
                </div>

                {/* About */}
                <div className="px-5 sm:px-8 py-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-6 h-px bg-primary" />
                    <span className="text-primary text-[11px] font-semibold tracking-[0.25em] uppercase">
                      About The Project
                    </span>
                  </div>
                  <p className="text-secondary/65 dark:text-white/60 leading-relaxed max-w-2xl">{description}</p>
                </div>

                {/* Overview */}
                <div className="px-5 sm:px-8 pb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-6 h-px bg-primary" />
                    <span className="text-primary text-[11px] font-semibold tracking-[0.25em] uppercase">
                      Project Overview
                    </span>
                  </div>
                  <dl className="divide-y divide-secondary/10 dark:divide-white/10 border-t border-secondary/10 dark:border-white/10">
                    {overview.map((row) => (
                      <div key={row.label} className="flex items-center justify-between gap-6 py-3.5">
                        <dt className="text-secondary/50 dark:text-white/45 text-sm">{row.label}</dt>
                        <dd className="font-semibold text-secondary dark:text-white text-sm text-right">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Footer */}
                <div className="px-5 sm:px-8 py-8 border-t border-secondary/10 dark:border-white/10 text-center">
                  <p className="text-primary text-[11px] font-semibold tracking-[0.25em] uppercase mb-2">RKGC Group</p>
                  <p className="text-secondary/60 dark:text-white/55 mb-6">Have questions about this project?</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Button to="/contact?subject=Project%20Consultation" variant="secondary" arrow onClick={onClose}>
                      Discuss This Project
                    </Button>
                    <Button variant="primary" onClick={handleDownload} className="min-w-[220px] justify-center">
                      {downloading ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          Preparing PDF
                        </>
                      ) : (
                        <>Download Project Details ↓</>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
