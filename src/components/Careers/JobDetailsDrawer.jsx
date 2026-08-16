import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  MapPin,
  Briefcase,
  Clock,
  CalendarDays,
  Share2,
  Link as LinkIcon,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import Button from "../ui/Button";
import { useToast } from "../../utils/toast.jsx";

const OFFER_HIGHLIGHTS = [
  "Room to grow — learn, experiment and take on real responsibility",
  "A collaborative, supportive team environment",
  "Continuous learning and professional development",
  "A healthy, flexible working environment",
];

function formatDate(dateStr) {
  if (!dateStr) return "Ongoing";
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function JobDetailsDrawer({ job, onClose, onApply }) {
  const { toast } = useToast();
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (shareRef.current && !shareRef.current.contains(e.target)) setShareOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!job) return null;

  const shareUrl = `${window.location.origin}/careers?job=${job.id}`;
  const shareText = `${job.title} at RKGC Group`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast("Link copied to clipboard", "success");
    } catch {
      toast("Couldn't copy link", "error");
    }
    setShareOpen(false);
  };

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} — ${shareUrl}`)}`,
    email: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <AnimatePresence>
      {job && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[10000] bg-black/50"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Job details"
            className="fixed inset-y-0 right-0 z-[10001] w-full sm:w-[520px] bg-card-light dark:bg-card-dark shadow-[-20px_0_60px_rgba(0,0,0,0.15)] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-secondary/10 dark:border-white/10 shrink-0">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Job Details</span>
              <button
                onClick={onClose}
                aria-label="Close job details"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary/50 dark:text-white/50 hover:bg-secondary/5 dark:hover:bg-white/5"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <h2 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-1.5">{job.title}</h2>
              <p className="text-primary text-sm font-semibold mb-5">{job.department}</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <InfoTile icon={MapPin} label="Location" value={job.location} />
                <InfoTile icon={Briefcase} label="Type" value={job.type} />
                <InfoTile icon={Clock} label="Experience" value={job.experience} />
                <InfoTile icon={CalendarDays} label="Posted" value={formatDate(job.postedDate)} />
              </div>

              <Section title="Overview">
                <p className="text-sm text-secondary/70 dark:text-white/70 leading-relaxed">{job.description}</p>
              </Section>

              {job.responsibilities?.length > 0 && (
                <Section title="Responsibilities">
                  <BulletList items={job.responsibilities} />
                </Section>
              )}

              {job.requirements?.length > 0 && (
                <Section title="Requirements">
                  <BulletList items={job.requirements} />
                </Section>
              )}

              {job.niceToHave?.length > 0 && (
                <Section title="Nice to Have">
                  <BulletList items={job.niceToHave} />
                </Section>
              )}

              <Section title="What We Offer">
                <BulletList items={OFFER_HIGHLIGHTS} />
              </Section>
            </div>

            <div className="px-6 py-5 border-t border-secondary/10 dark:border-white/10 shrink-0 flex items-center gap-3">
              <Button variant="primary" className="flex-1 justify-center" onClick={() => onApply(job)}>
                Apply for this Position
              </Button>

              <div className="relative" ref={shareRef}>
                <button
                  onClick={() => setShareOpen((o) => !o)}
                  aria-label="Share job"
                  aria-expanded={shareOpen}
                  className="w-11 h-11 rounded-full flex items-center justify-center bg-secondary/5 dark:bg-white/5 text-secondary dark:text-white hover:bg-secondary/10 dark:hover:bg-white/10 transition-colors shrink-0"
                >
                  <Share2 size={16} />
                </button>

                <AnimatePresence>
                  {shareOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full right-0 mb-2 w-52 rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden py-1.5"
                    >
                      <ShareItem icon={LinkIcon} label="Copy Link" onClick={copyLink} />
                      <ShareItem icon={Linkedin} label="Share on LinkedIn" href={shareLinks.linkedin} />
                      <ShareItem icon={MessageCircle} label="Share on WhatsApp" href={shareLinks.whatsapp} />
                      <ShareItem icon={Mail} label="Share via Email" href={shareLinks.email} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function InfoTile({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-bg-light dark:bg-bg-dark border border-secondary/10 dark:border-white/10 p-3.5">
      <p className="flex items-center gap-1.5 text-[11px] text-secondary/40 dark:text-white/40 mb-1">
        <Icon size={11} /> {label}
      </p>
      <p className="text-sm font-semibold text-secondary dark:text-white truncate">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-secondary/40 dark:text-white/40 mb-2.5">{title}</p>
      {children}
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-secondary/70 dark:text-white/70 leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ShareItem({ icon: Icon, label, href, onClick }) {
  const Comp = href ? "a" : "button";
  return (
    <Comp
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-secondary/70 dark:text-white/70 hover:bg-secondary/5 dark:hover:bg-white/5 transition-colors"
    >
      <Icon size={14} className="text-primary" />
      {label}
    </Comp>
  );
}
