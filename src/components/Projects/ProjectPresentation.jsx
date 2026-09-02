import { motion } from "framer-motion";
import { MapPin, Landmark, ArrowUpRight } from "lucide-react";
import { verticals } from "../../static-data/verticals";
import Button from "../ui/Button";

// Every project's abstract visual reuses its own vertical's real,
// already-published photography (verticals.js) — never a fabricated
// "site photo" for a specific project. Category identity is only a
// thin accent, never a full-card gradient.
export const categoryAccent = {
  Infrastructure: "#6E8CA6",
  Realty: "#B0947A",
  Agro: "#5C8B6C",
  Spaces: "#4E9A96",
};

export const verticalFor = (category) => verticals.find((v) => v.slug === category);

// Large-wide / medium-tall, repeating — creates the asymmetric rhythm
// without depending on how many projects a category happens to have.
export const gridPattern = [
  { col: "lg:col-span-7", aspect: "aspect-[16/10]" },
  { col: "lg:col-span-5", aspect: "aspect-[4/5]" },
  { col: "lg:col-span-5", aspect: "aspect-[4/5]" },
  { col: "lg:col-span-7", aspect: "aspect-[16/10]" },
];

// A project's status line: real "Start Soon" projects show that status,
// never a fabricated 0% — everyone else shows their real completed ratio.
export function ProjectStatusLine({ project, size = "sm" }) {
  const big = size === "lg";
  if (project.status === "start-soon") {
    return (
      <p className={`font-display italic text-primary leading-none ${big ? "text-2xl" : "text-base"}`}>Start Soon</p>
    );
  }
  if (project.progress) {
    return (
      <p className={`font-display italic text-primary leading-none ${big ? "text-2xl" : "text-base"}`}>
        {project.progress}
      </p>
    );
  }
  return null;
}

// Four distinct technical-drawing motifs, cycled deterministically by
// project id — so the projects that share the abstract treatment (no
// real per-project photography exists) still read as individually
// art-directed rather than one surface stamped 10 times.
function TechnicalMark({ variant, accent }) {
  // A shared 0–100 viewBox so every coordinate below is a plain number
  // (SVG's points/path attributes don't accept CSS-style "%" strings).
  switch (variant) {
    case 1:
      return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-[0.14]" aria-hidden="true">
          <line x1="0" y1="0" x2="100" y2="100" stroke={accent} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-[0.16]" aria-hidden="true">
          <circle cx="50" cy="50" r="26" fill="none" stroke={accent} strokeWidth="0.6" />
          <line x1="50" y1="18" x2="50" y2="82" stroke={accent} strokeWidth="0.6" />
          <line x1="18" y1="50" x2="82" y2="50" stroke={accent} strokeWidth="0.6" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-[0.15]" aria-hidden="true">
          <line x1="0" y1="50" x2="100" y2="50" stroke={accent} strokeWidth="0.6" />
          <polyline points="8,8 8,20 20,20" fill="none" stroke={accent} strokeWidth="0.6" />
          <polyline points="92,92 92,80 80,80" fill="none" stroke={accent} strokeWidth="0.6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-[0.14]" aria-hidden="true">
          <line x1="0" y1="100" x2="100" y2="0" stroke={accent} strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        </svg>
      );
  }
}

// A few projects still share a source photo where no distinct one was
// available — cycling the focal crop per project id means even a
// reused photo frames a different part of itself on each card.
const focalPositions = ["25% 30%", "75% 25%", "50% 70%", "80% 60%", "20% 65%", "50% 20%"];

// usePhoto=false renders an honest abstract "technical drawing" surface
// (navy + blueprint grid + a technical mark) instead — used only when
// no photo exists at all for this project or its vertical.
export function ProjectVisual({ project, usePhoto = true, className = "" }) {
  const vertical = verticalFor(project.category);
  const Icon = project.icon || Landmark;
  const accent = categoryAccent[project.category] || "#F4B400";
  const image = project.image || vertical?.image;
  const showPhoto = usePhoto && image;
  const markVariant = (project.id || 0) % 4;
  const focalPosition = focalPositions[(project.id || 0) % focalPositions.length];

  return (
    <div className={`absolute inset-0 ${className}`}>
      {showPhoto ? (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{ filter: "brightness(0.5) saturate(0.9)", objectPosition: focalPosition }}
        />
      ) : (
        <div className="absolute inset-0 bg-[#0A0E1A] overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.09] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(244,180,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(244,180,0,0.8) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
          <TechnicalMark variant={markVariant} accent={accent} />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />
      <span className="absolute top-0 left-0 w-full h-[3px]" style={{ backgroundColor: accent }} aria-hidden="true" />
      <Icon size={20} className="absolute top-6 left-6 text-primary/70" aria-hidden="true" />
    </div>
  );
}

export function FeaturedProject({ project, onView, number = "01" }) {
  return (
    <section className="mb-16 lg:mb-24">
      <div className="flex items-center gap-3 mb-10">
        <span className="w-8 h-px bg-primary" />
        <span className="text-primary text-xs font-semibold tracking-[0.25em] uppercase">Featured Project</span>
      </div>

      <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-8 lg:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block font-display italic text-primary/40 text-6xl sm:text-7xl leading-none mb-5">
            {number}
          </span>
          <span className="block text-primary text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">
            {project.employer || project.service}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-medium leading-[1.08] text-secondary dark:text-white mb-4">
            {project.name}
          </h2>
          {project.workType && (
            <p className="text-secondary/60 dark:text-white/60 mb-2">{project.workType}</p>
          )}
          <p className="flex items-center gap-2 text-secondary/60 dark:text-white/60 mb-8">
            <MapPin size={16} className="text-primary shrink-0" />
            {project.location}
          </p>

          <div className="flex items-center gap-10 mb-9">
            {(project.progress || project.status === "start-soon") && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-secondary/40 dark:text-white/40 mb-1.5">
                  {project.status === "start-soon" ? "Status" : "Progress"}
                </p>
                <ProjectStatusLine project={project} size="lg" />
              </div>
            )}
            {project.amount && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-secondary/40 dark:text-white/40 mb-1.5">
                  Contract Value
                </p>
                <p className="font-display text-2xl italic text-secondary dark:text-white leading-none">
                  ₹{project.amount}
                </p>
              </div>
            )}
          </div>

          <Button variant="primary" arrow onClick={() => onView(project)}>
            View Project
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => onView(project)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onView(project);
            }
          }}
          aria-label={`View ${project.name} details`}
          className="group relative rounded-[4px] overflow-hidden h-[320px] sm:h-[420px] lg:h-[500px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ProjectVisual project={project} />
          <span
            aria-hidden="true"
            className="absolute -bottom-8 -right-2 font-display italic text-white/[0.07] text-[9rem] sm:text-[11rem] leading-none pointer-events-none select-none"
          >
            {number}
          </span>
        </motion.div>
      </div>
    </section>
  );
}

export function ProjectCard({ project, number, layout, onView }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
      onClick={() => onView(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onView(project);
        }
      }}
      aria-label={`View ${project.name} details`}
      className={`group relative overflow-hidden rounded-[4px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${layout.col} ${layout.aspect}`}
    >
      <ProjectVisual project={project} />
      <span
        aria-hidden="true"
        className="absolute top-4 right-5 font-display italic text-white/[0.12] text-5xl sm:text-6xl leading-none pointer-events-none select-none"
      >
        {number}
      </span>

      <div className="absolute inset-x-5 sm:inset-x-6 bottom-5 sm:bottom-6">
        <span className="block text-primary text-[10px] font-semibold tracking-[0.2em] uppercase mb-2">
          {project.employer || project.service}
        </span>
        <h3 className="font-display text-2xl sm:text-3xl font-medium text-white leading-[1.1] mb-2 transition-transform duration-300 group-hover:-translate-y-1">
          {project.name}
        </h3>
        <p className="flex items-center gap-1.5 text-white/55 text-xs mb-4">
          <MapPin size={12} className="text-primary shrink-0" />
          {project.location}
          {project.workType ? ` · ${project.workType}` : ""}
        </p>

        {(project.progress || project.status === "start-soon") && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-[10px] text-white/40 uppercase tracking-wide mb-1.5">
              <span>{project.status === "start-soon" ? "Status" : "Progress"}</span>
              <span className="text-primary font-semibold">
                {project.status === "start-soon" ? "Start Soon" : project.progress}
              </span>
            </div>
            {project.progress && (
              <div className="h-px bg-white/15 overflow-hidden">
                <div className="h-full bg-primary" style={{ width: project.progress }} />
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          {project.amount ? (
            <span className="text-white/50 text-xs">₹{project.amount}</span>
          ) : (
            <span aria-hidden="true" />
          )}
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary opacity-100 lg:opacity-0 lg:group-hover:opacity-100 translate-y-0 lg:translate-y-1 lg:group-hover:translate-y-0 transition-all duration-300 shrink-0">
            View Project
            <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
