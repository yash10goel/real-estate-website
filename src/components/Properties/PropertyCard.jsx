import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Maximize2 } from "lucide-react";

// Masonry card — the image keeps its natural aspect ratio because most of
// the developer creatives carry baked-in logos/copy that cropping would cut.
export default function PropertyCard({ property, index, onOpen }) {
  const isCommercial = property.category === "commercial";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="break-inside-avoid mb-6"
    >
      <button
        type="button"
        onClick={() => onOpen(property)}
        aria-label={`View ${property.name}`}
        className="group block w-full text-left rounded-[26px] bg-card-light dark:bg-card-dark border border-secondary/[0.07] dark:border-white/[0.07] shadow-glass dark:shadow-glass-dark overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(17,24,39,0.16)] dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.55)] hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={property.image}
            alt={`${property.name}, ${property.location}`}
            loading="lazy"
            decoding="async"
            className="w-full h-auto block transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-secondary/0 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

          <span
            className={`absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase backdrop-blur-md border ${
              isCommercial
                ? "bg-secondary/70 text-primary border-primary/40"
                : "bg-white/85 text-secondary border-white/60"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isCommercial ? "bg-primary" : "bg-emerald-500"}`} />
            {isCommercial ? "Commercial" : "Residence"}
          </span>

          <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white/95 text-secondary px-4 py-2 text-xs font-semibold opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <Maximize2 size={13} />
            View details
          </span>
        </div>

        {/* Details */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-primary mb-1.5">
                {property.typology}
              </p>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-secondary dark:text-white leading-snug">
                {property.name}
              </h3>
              <p className="mt-1 text-xs text-secondary/45 dark:text-white/45">by {property.developer}</p>
            </div>
            <span className="mt-1 w-10 h-10 shrink-0 rounded-full border border-secondary/10 dark:border-white/10 flex items-center justify-center text-secondary/40 dark:text-white/40 group-hover:bg-primary group-hover:border-primary group-hover:text-secondary group-hover:rotate-45 transition-all duration-500">
              <ArrowUpRight size={17} />
            </span>
          </div>

          <div className="mt-4 pt-4 border-t border-secondary/[0.07] dark:border-white/[0.07] flex items-center gap-1.5 text-sm text-secondary/60 dark:text-white/60">
            <MapPin size={14} className="text-primary shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>
        </div>
      </button>
    </motion.article>
  );
}
