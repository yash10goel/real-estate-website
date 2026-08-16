import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export default function KpiCard({ icon: Icon, label, value, subtitle, trend }) {
  const hasTrend = typeof trend === "number" && Number.isFinite(trend);
  const isFlat = hasTrend && trend === 0;
  const isUp = hasTrend && trend > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark p-5 transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
    >
      <div className="flex items-start justify-between">
        <p className="text-secondary/50 dark:text-white/50 text-sm font-medium">{label}</p>
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon size={16} className="text-primary" />
        </div>
      </div>

      <h3 className="font-heading text-3xl font-bold text-secondary dark:text-white mt-3">
        {value}
      </h3>

      <div className="flex items-center gap-1.5 mt-2 text-xs">
        {hasTrend && (
          <span
            className={`inline-flex items-center gap-0.5 font-semibold ${
              isFlat
                ? "text-secondary/40 dark:text-white/40"
                : isUp
                ? "text-emerald-500"
                : "text-red-500"
            }`}
          >
            {isFlat ? <Minus size={12} /> : isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {isFlat ? "0%" : `${isUp ? "+" : ""}${trend}%`}
          </span>
        )}
        {subtitle && <span className="text-secondary/40 dark:text-white/40">{subtitle}</span>}
      </div>
    </motion.div>
  );
}
