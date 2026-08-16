import { motion } from "framer-motion";
import { MapPin, Briefcase, Clock, ArrowRight, Sparkles } from "lucide-react";

function timeAgo(dateStr) {
  if (!dateStr) return null;
  const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}

export default function JobCard({ job, index, onView }) {
  return (
    <motion.button
      type="button"
      onClick={() => onView(job)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
      whileHover={{ y: -4 }}
      className="group relative text-left w-full rounded-[24px] border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark p-6 sm:p-7 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)]"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            {job.isGeneral ? (
              <Sparkles size={18} className="text-primary" />
            ) : (
              <Briefcase size={18} className="text-primary" />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-heading text-lg font-bold text-secondary dark:text-white leading-snug truncate">
              {job.title}
            </h3>
            <p className="text-sm text-secondary/50 dark:text-white/50 mt-0.5">{job.department}</p>
          </div>
        </div>
        {job.postedDate && (
          <span className="hidden sm:block text-xs text-secondary/35 dark:text-white/35 shrink-0 whitespace-nowrap">
            {timeAgo(job.postedDate)}
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-secondary/55 dark:text-white/55 mb-4">
        <span className="flex items-center gap-1.5">
          <MapPin size={13} className="text-primary" /> {job.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Briefcase size={13} className="text-primary" /> {job.type}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={13} className="text-primary" /> {job.experience}
        </span>
      </div>

      {job.skills?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.skills.slice(0, 4).map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-full bg-secondary/5 dark:bg-white/5 text-secondary/60 dark:text-white/60 text-[11px] font-medium"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <p className="text-sm text-secondary/60 dark:text-white/60 leading-relaxed line-clamp-2 mb-5">
        {job.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-secondary/10 dark:border-white/10">
        <span className="text-sm font-semibold text-primary">View Job</span>
        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:translate-x-0.5 transition-transform duration-300">
          <ArrowRight size={14} />
        </span>
      </div>
    </motion.button>
  );
}
