import { useMemo } from "react";
import { motion } from "framer-motion";

const PALETTE = ["#F4B400", "#FFD54F", "#111827", "#64748B", "#94A3B8", "#CBD5E1"];

export default function SubjectDistributionChart({ leads }) {
  const segments = useMemo(() => {
    const counts = new Map();
    leads.forEach((lead) => {
      const key = lead.subject?.trim() || "Unspecified";
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    const total = leads.length || 1;
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([label, count], i) => ({
        label,
        count,
        pct: Math.round((count / total) * 100),
        color: PALETTE[i % PALETTE.length],
      }));
  }, [leads]);

  const total = leads.length;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark p-6">
      <h3 className="font-heading font-bold text-secondary dark:text-white">Enquiry Subjects</h3>
      <p className="text-xs text-secondary/45 dark:text-white/45 mt-0.5 mb-6">Distribution by subject</p>

      {total === 0 ? (
        <p className="text-sm text-secondary/40 dark:text-white/40 py-10 text-center">
          No enquiries yet to chart.
        </p>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <svg width="150" height="150" viewBox="0 0 150 150" className="shrink-0 -rotate-90">
            <circle cx="75" cy="75" r={radius} fill="none" stroke="currentColor" className="text-secondary/5 dark:text-white/5" strokeWidth="16" />
            {segments.map((seg) => {
              const length = (seg.pct / 100) * circumference;
              const dasharray = `${length} ${circumference - length}`;
              const el = (
                <motion.circle
                  key={seg.label}
                  cx="75"
                  cy="75"
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="16"
                  strokeDasharray={dasharray}
                  strokeDashoffset={-offset}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              );
              offset += length;
              return el;
            })}
          </svg>

          <div className="flex-1 w-full space-y-2.5">
            {segments.map((seg) => (
              <div key={seg.label} className="flex items-center gap-2.5 text-sm">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                <span className="text-secondary/70 dark:text-white/70 truncate flex-1">{seg.label}</span>
                <span className="text-secondary/40 dark:text-white/40 text-xs shrink-0">{seg.count}</span>
                <span className="text-secondary dark:text-white font-semibold text-xs w-9 text-right shrink-0">
                  {seg.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
