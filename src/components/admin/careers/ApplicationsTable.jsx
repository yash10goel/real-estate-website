import { motion } from "framer-motion";
import { Mail, Phone, Trash2 } from "lucide-react";
import { formatLeadDate, initials } from "../../../utils/formatDate";
import StatusBadge from "../StatusBadge";
import ResumeActions from "./ResumeActions";

const AVATAR_COLORS = [
  "from-primary to-accent",
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-orange-500",
  "from-purple-500 to-pink-500",
];
const avatarColor = (id) => AVATAR_COLORS[id % AVATAR_COLORS.length];

export default function ApplicationsTable({ applications, onView, onDelete }) {
  return (
    <div className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark overflow-hidden">
      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead>
            <tr className="border-b border-secondary/10 dark:border-white/10">
              {["Candidate", "Contact", "Applied For", "Experience", "Applied", "Status", "Resume", ""].map((h) => (
                <th key={h} className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-secondary/40 dark:text-white/40">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.map((app, i) => {
              const { date } = formatLeadDate(app.created_at);
              return (
                <motion.tr
                  key={app.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.02 }}
                  onClick={() => onView(app)}
                  className="cursor-pointer border-b border-secondary/5 dark:border-white/5 last:border-b-0 hover:bg-secondary/[0.02] dark:hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColor(app.id)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                        {initials(`${app.first_name || ""} ${app.last_name || ""}`)}
                      </div>
                      <span className="text-sm font-medium text-secondary dark:text-white truncate">
                        {app.first_name} {app.last_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1 text-xs">
                      <a href={`mailto:${app.email}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 text-secondary/60 dark:text-white/60 hover:text-primary transition-colors truncate max-w-[200px]">
                        <Mail size={11} className="shrink-0" /> <span className="truncate">{app.email}</span>
                      </a>
                      {app.phone && (
                        <a href={`tel:${app.phone}`} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1.5 text-secondary/60 dark:text-white/60 hover:text-primary transition-colors">
                          <Phone size={11} className="shrink-0" /> {app.phone}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-secondary dark:text-white font-medium truncate max-w-[180px]">{app.job_title}</p>
                    {app.department && <p className="text-xs text-secondary/45 dark:text-white/45 mt-0.5">{app.department}</p>}
                  </td>
                  <td className="px-5 py-4 text-sm text-secondary/60 dark:text-white/60">{app.total_experience || "—"}</td>
                  <td className="px-5 py-4 text-xs text-secondary/60 dark:text-white/60">{date}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td className="px-5 py-4">
                    <ResumeActions path={app.resume_path} filename={app.resume_filename} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={(e) => { e.stopPropagation(); onDelete(app); }}
                      title="Delete application"
                      aria-label={`Delete application from ${app.first_name} ${app.last_name}`}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary/30 dark:text-white/30 hover:text-red-500 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile / tablet cards */}
      <div className="lg:hidden divide-y divide-secondary/10 dark:divide-white/10">
        {applications.map((app, i) => {
          const { date } = formatLeadDate(app.created_at);
          return (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              onClick={() => onView(app)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onView(app); } }}
              className="w-full text-left p-4 flex items-start gap-3 cursor-pointer active:bg-secondary/[0.02] dark:active:bg-white/[0.02]"
            >
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor(app.id)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                {initials(`${app.first_name || ""} ${app.last_name || ""}`)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-secondary dark:text-white truncate">{app.first_name} {app.last_name}</p>
                  <StatusBadge status={app.status} size="sm" />
                </div>
                <p className="text-xs text-secondary/60 dark:text-white/60 mt-1 truncate">{app.job_title}</p>
                <p className="text-xs text-secondary/40 dark:text-white/40 mt-1 truncate">{app.email}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[11px] text-secondary/35 dark:text-white/35">{date}</p>
                  <ResumeActions path={app.resume_path} filename={app.resume_filename} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
