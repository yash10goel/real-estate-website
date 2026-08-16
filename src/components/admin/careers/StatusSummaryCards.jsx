import { motion } from "framer-motion";
import { Inbox } from "lucide-react";
import { STATUSES, getStatusMeta } from "../../../static-data/applicationStatus";

export default function StatusSummaryCards({ counts, total, activeStatus, onSelect }) {
  const cards = [
    { value: "all", label: "Total Applications", count: total },
    ...STATUSES.map((s) => ({ value: s.value, label: s.value, count: counts[s.value] || 0 })),
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {cards.map((c, i) => {
        const isActive = activeStatus === c.value;
        const meta = c.value === "all" ? null : getStatusMeta(c.value);
        return (
          <motion.button
            key={c.value}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            onClick={() => onSelect(isActive ? "all" : c.value)}
            className={`text-left rounded-2xl border p-4 transition-all duration-200 ${
              isActive
                ? "border-primary bg-primary/5 shadow-[0_8px_24px_-8px_rgba(244,180,0,0.4)]"
                : "border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark hover:border-primary/30"
            }`}
          >
            <div className="flex items-center gap-1.5 mb-2">
              {meta ? (
                <span className={`w-2 h-2 rounded-full shrink-0 ${meta.dot}`} />
              ) : (
                <Inbox size={12} className="text-primary shrink-0" />
              )}
              <p className="text-[11px] font-medium text-secondary/50 dark:text-white/50 truncate">{c.label}</p>
            </div>
            <p className="font-heading text-2xl font-bold text-secondary dark:text-white">{c.count}</p>
          </motion.button>
        );
      })}
    </div>
  );
}
