import { useMemo } from "react";
import { motion } from "framer-motion";

const DAYS = 14;

export default function LeadsOverTimeChart({ leads }) {
  const days = useMemo(() => {
    const buckets = [];
    const now = new Date();
    for (let i = DAYS - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      buckets.push({ key: d.toDateString(), label: d.getDate(), count: 0 });
    }
    const map = new Map(buckets.map((b) => [b.key, b]));
    leads.forEach((lead) => {
      if (!lead.created_at) return;
      const key = new Date(lead.created_at).toDateString();
      const bucket = map.get(key);
      if (bucket) bucket.count += 1;
    });
    return buckets;
  }, [leads]);

  const max = Math.max(1, ...days.map((d) => d.count));

  return (
    <div className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading font-bold text-secondary dark:text-white">Leads Overview</h3>
          <p className="text-xs text-secondary/45 dark:text-white/45 mt-0.5">Last 14 days</p>
        </div>
      </div>

      {leads.length === 0 ? (
        <p className="text-sm text-secondary/40 dark:text-white/40 py-10 text-center">
          No leads yet to chart.
        </p>
      ) : (
        <div className="flex items-end gap-1.5 sm:gap-2 h-40">
          {days.map((d, i) => (
            <div key={d.key} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full h-32 flex items-end relative">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max((d.count / max) * 100, d.count > 0 ? 6 : 2)}%` }}
                  transition={{ duration: 0.5, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
                  className={`w-full rounded-t-md ${
                    d.count > 0
                      ? "bg-gradient-to-t from-primary to-accent"
                      : "bg-secondary/10 dark:bg-white/10"
                  }`}
                />
                {d.count > 0 && (
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-secondary/60 dark:text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.count}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-secondary/35 dark:text-white/35">{d.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
