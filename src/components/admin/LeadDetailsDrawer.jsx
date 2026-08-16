import { AnimatePresence, motion } from "framer-motion";
import { X, Mail, Phone, Copy, Calendar, Tag } from "lucide-react";
import { formatLeadDate, initials } from "../../utils/formatDate";
import { useToast } from "../../utils/toast.jsx";

export default function LeadDetailsDrawer({ lead, onClose }) {
  const { toast } = useToast();

  const copy = async (value, label) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      toast(`${label} copied to clipboard`, "success");
    } catch {
      toast(`Couldn't copy ${label.toLowerCase()}`, "error");
    }
  };

  const { date, time } = lead ? formatLeadDate(lead.created_at) : { date: "", time: "" };

  return (
    <AnimatePresence>
      {lead && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9995] bg-black/50"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Lead details"
            className="fixed inset-y-0 right-0 z-[9996] w-full sm:w-[440px] bg-card-light dark:bg-card-dark shadow-[-20px_0_60px_rgba(0,0,0,0.15)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-secondary/10 dark:border-white/10 shrink-0">
              <h2 className="font-heading text-lg font-bold text-secondary dark:text-white">Lead Details</h2>
              <button
                onClick={onClose}
                aria-label="Close details"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary/50 dark:text-white/50 hover:bg-secondary/5 dark:hover:bg-white/5"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* Identity */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-secondary text-lg font-bold shrink-0">
                  {initials(lead?.full_name)}
                </div>
                <div className="min-w-0">
                  <p className="font-heading text-lg font-bold text-secondary dark:text-white truncate">
                    {lead?.full_name || "—"}
                  </p>
                  <p className="text-xs text-secondary/40 dark:text-white/40 font-mono">Lead #{lead?.id}</p>
                </div>
              </div>

              {/* Info rows */}
              <div className="space-y-1 mb-6">
                <InfoRow icon={Mail} label="Email" value={lead?.email} onCopy={() => copy(lead?.email, "Email")} />
                <InfoRow icon={Phone} label="Phone" value={lead?.phone} onCopy={() => copy(lead?.phone, "Phone")} />
                <InfoRow icon={Tag} label="Subject" value={lead?.subject || "—"} />
                <InfoRow icon={Calendar} label="Received" value={lead ? `${date} at ${time}` : ""} />
              </div>

              {/* Message */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary/40 dark:text-white/40 mb-2">
                  Message
                </p>
                <div className="rounded-2xl bg-bg-light dark:bg-bg-dark border border-secondary/10 dark:border-white/10 p-4 text-sm text-secondary/80 dark:text-white/80 leading-relaxed whitespace-pre-wrap">
                  {lead?.message || "No message provided."}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-5 border-t border-secondary/10 dark:border-white/10 shrink-0 grid grid-cols-2 gap-3">
              <a
                href={lead?.email ? `mailto:${lead.email}` : undefined}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors ${
                  !lead?.email ? "pointer-events-none opacity-40" : ""
                }`}
              >
                <Mail size={14} /> Email
              </a>
              <a
                href={lead?.phone ? `tel:${lead.phone}` : undefined}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-secondary/5 dark:bg-white/5 text-secondary dark:text-white hover:bg-secondary/10 dark:hover:bg-white/10 transition-colors ${
                  !lead?.phone ? "pointer-events-none opacity-40" : ""
                }`}
              >
                <Phone size={14} /> Call
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function InfoRow({ icon: Icon, label, value, onCopy }) {
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-secondary/5 dark:border-white/5 last:border-b-0 group">
      <div className="w-8 h-8 rounded-lg bg-secondary/5 dark:bg-white/5 flex items-center justify-center shrink-0">
        <Icon size={13} className="text-secondary/40 dark:text-white/40" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-secondary/40 dark:text-white/40">{label}</p>
        <p className="text-sm text-secondary dark:text-white truncate">{value || "—"}</p>
      </div>
      {onCopy && value && (
        <button
          onClick={onCopy}
          aria-label={`Copy ${label.toLowerCase()}`}
          title={`Copy ${label.toLowerCase()}`}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-secondary/30 dark:text-white/30 opacity-0 group-hover:opacity-100 hover:bg-secondary/10 dark:hover:bg-white/10 hover:text-primary transition-all shrink-0"
        >
          <Copy size={12} />
        </button>
      )}
    </div>
  );
}
