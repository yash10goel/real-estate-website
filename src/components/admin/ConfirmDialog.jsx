import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  danger = false,
  onConfirm,
  onCancel,
  loading = false,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 z-[10020] bg-black/50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="alertdialog"
            aria-modal="true"
            aria-label={title}
            className="fixed inset-0 z-[10021] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-sm rounded-2xl bg-card-light dark:bg-card-dark p-6 shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${danger ? "bg-red-500/10" : "bg-primary/10"}`}>
                <AlertTriangle size={20} className={danger ? "text-red-500" : "text-primary"} />
              </div>
              <h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-secondary/60 dark:text-white/60 mb-6 leading-relaxed">{description}</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-secondary/60 dark:text-white/60 hover:bg-secondary/5 dark:hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold disabled:opacity-60 transition-colors ${
                    danger ? "bg-red-600 hover:bg-red-700 text-white" : "bg-primary hover:shadow-glow text-secondary"
                  }`}
                >
                  {loading ? "Please wait..." : confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
