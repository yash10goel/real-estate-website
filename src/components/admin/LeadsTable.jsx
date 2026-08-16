import { motion } from "framer-motion";
import { Eye, Phone, Mail } from "lucide-react";
import { formatLeadDate, initials } from "../../utils/formatDate";

const AVATAR_COLORS = [
  "from-primary to-accent",
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-rose-500 to-orange-500",
  "from-purple-500 to-pink-500",
];

function avatarColor(id) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length];
}

export default function LeadsTable({ leads, onView }) {
  return (
    <div className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-secondary/10 dark:border-white/10">
              {["ID", "Lead", "Contact", "Subject", "Date", ""].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-secondary/40 dark:text-white/40"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, i) => {
              const { date, time } = formatLeadDate(lead.created_at);
              return (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: i * 0.02 }}
                  onClick={() => onView(lead)}
                  className="cursor-pointer border-b border-secondary/5 dark:border-white/5 last:border-b-0 hover:bg-secondary/[0.02] dark:hover:bg-white/[0.02] transition-colors group"
                >
                  <td className="px-5 py-4 text-sm text-secondary/40 dark:text-white/40 font-mono">
                    #{lead.id}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-full bg-gradient-to-br ${avatarColor(lead.id)} flex items-center justify-center text-white text-xs font-bold shrink-0`}
                      >
                        {initials(lead.full_name)}
                      </div>
                      <span className="text-sm font-medium text-secondary dark:text-white truncate">
                        {lead.full_name || "—"}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1 text-xs">
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-secondary/60 dark:text-white/60 hover:text-primary transition-colors truncate max-w-[220px]"
                        >
                          <Mail size={11} className="shrink-0" />
                          <span className="truncate">{lead.email}</span>
                        </a>
                      )}
                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-secondary/60 dark:text-white/60 hover:text-primary transition-colors"
                        >
                          <Phone size={11} className="shrink-0" />
                          {lead.phone}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {lead.subject ? (
                      <span className="inline-flex px-2.5 py-1 rounded-full bg-secondary/5 dark:bg-white/5 text-secondary/70 dark:text-white/70 text-xs font-medium truncate max-w-[160px]">
                        {lead.subject}
                      </span>
                    ) : (
                      <span className="text-secondary/30 dark:text-white/30 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-xs">
                    <p className="text-secondary/70 dark:text-white/70 font-medium">{date}</p>
                    <p className="text-secondary/40 dark:text-white/40 mt-0.5">{time}</p>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => onView(lead)}
                      title="View message"
                      aria-label={`View message from ${lead.full_name}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                      <Eye size={13} />
                      View
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-secondary/10 dark:divide-white/10">
        {leads.map((lead, i) => {
          const { date, time } = formatLeadDate(lead.created_at);
          return (
            <motion.button
              key={lead.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              onClick={() => onView(lead)}
              className="w-full text-left p-4 flex items-start gap-3 active:bg-secondary/[0.02] dark:active:bg-white/[0.02]"
            >
              <div
                className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor(lead.id)} flex items-center justify-center text-white text-xs font-bold shrink-0`}
              >
                {initials(lead.full_name)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-secondary dark:text-white truncate">
                    {lead.full_name || "—"}
                  </p>
                  <span className="text-[10px] text-secondary/35 dark:text-white/35 shrink-0 font-mono">
                    #{lead.id}
                  </span>
                </div>
                {lead.subject && (
                  <span className="inline-flex mt-1.5 px-2 py-0.5 rounded-full bg-secondary/5 dark:bg-white/5 text-secondary/60 dark:text-white/60 text-[11px] font-medium">
                    {lead.subject}
                  </span>
                )}
                <p className="text-xs text-secondary/45 dark:text-white/45 mt-1.5 truncate flex items-center gap-1">
                  <Mail size={10} className="shrink-0" /> {lead.email}
                </p>
                <p className="text-[11px] text-secondary/35 dark:text-white/35 mt-1">
                  {date} · {time}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
