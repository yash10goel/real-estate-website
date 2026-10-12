import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, MapPin, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import Button from "../ui/Button";

export default function PropertyLightbox({ property, list, onClose, onNavigate }) {
  const index = property ? list.findIndex((p) => p.id === property.id) : -1;

  const go = (dir) => {
    if (index < 0 || list.length < 2) return;
    onNavigate(list[(index + dir + list.length) % list.length]);
  };

  useEffect(() => {
    if (!property) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

  return createPortal(
    <AnimatePresence>
      {property && (
        <motion.div
          key="property-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[10000] bg-[#060b14]/90 backdrop-blur-xl overflow-y-auto"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={property.name}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-primary hover:text-secondary text-white border border-white/15 flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>

          <div className="min-h-full flex items-center justify-center px-4 py-20 sm:px-8 lg:px-16">
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl grid lg:grid-cols-[1.35fr_1fr] rounded-[30px] overflow-hidden bg-bg-dark border border-white/10 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
            >
              {/* Image stage — blurred copy fills the letterbox */}
              <div className="relative bg-black flex items-center justify-center min-h-[300px] lg:min-h-[620px] overflow-hidden">
                <img
                  src={property.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-40"
                />
                <img
                  src={property.image}
                  alt={`${property.name}, ${property.location}`}
                  className="relative z-[1] max-h-[70vh] lg:max-h-[80vh] w-auto max-w-full object-contain"
                />

                {list.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Previous property"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-[2] w-11 h-11 rounded-full bg-black/40 hover:bg-primary hover:text-secondary text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next property"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-[2] w-11 h-11 rounded-full bg-black/40 hover:bg-primary hover:text-secondary text-white backdrop-blur-md border border-white/15 flex items-center justify-center transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[2] rounded-full bg-black/50 backdrop-blur-md px-3 py-1 text-[11px] font-semibold tracking-widest text-white/80">
                  {String(index + 1).padStart(2, "0")} / {String(list.length).padStart(2, "0")}
                </span>
              </div>

              {/* Details */}
              <div className="relative p-7 sm:p-10 text-white flex flex-col">
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/15 blur-[90px] pointer-events-none" />

                <span className="relative inline-flex self-start items-center gap-2 rounded-full bg-primary/15 text-primary px-3.5 py-1.5 text-[10px] font-bold tracking-[0.22em] uppercase">
                  {property.category === "commercial" ? "Commercial" : "Residence"} · {property.typology}
                </span>

                <h2 className="relative mt-5 font-display text-3xl sm:text-4xl font-semibold leading-tight">
                  {property.name}
                </h2>
                <p className="relative mt-3 text-white/60 italic">“{property.tagline}”</p>

                <dl className="relative mt-7 grid gap-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] border border-white/[0.07] px-4 py-3">
                    <Building2 size={16} className="text-primary shrink-0" />
                    <dt className="sr-only">Developer</dt>
                    <dd className="text-sm text-white/80">{property.developer}</dd>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] border border-white/[0.07] px-4 py-3">
                    <MapPin size={16} className="text-primary shrink-0" />
                    <dt className="sr-only">Location</dt>
                    <dd className="text-sm text-white/80">{property.location}</dd>
                  </div>
                </dl>

                <p className="relative mt-8 text-[11px] font-semibold tracking-[0.25em] uppercase text-white/40">
                  Highlights
                </p>
                <ul className="relative mt-3 space-y-2.5">
                  {property.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-sm text-white/75">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-auto pt-9 flex flex-wrap items-center gap-3">
                  <Button to="/contact?subject=Project%20Consultation" variant="primary">
                    Enquire Now
                    <ArrowRight size={16} />
                  </Button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-3 text-sm font-semibold text-white/60 hover:text-white transition-colors"
                  >
                    Back to portfolio
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
