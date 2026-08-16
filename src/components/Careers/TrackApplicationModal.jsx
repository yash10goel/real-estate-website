import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Search, Loader2, AlertCircle, CheckCircle2, CalendarDays, Briefcase } from "lucide-react";
import { supabase } from "../../configs/supabase";
import Button from "../ui/Button";
import StatusBadge from "../admin/StatusBadge";
import { formatLeadDate } from "../../utils/formatDate";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STATUS_NOTES = {
  New: "Your application has been received and is in the queue for review.",
  "Under Review": "Our team is currently reviewing your application.",
  Shortlisted: "You've been shortlisted — we'll be in touch about next steps.",
  "Interview Scheduled": "An interview has been scheduled. Check your email/phone for details.",
  Interviewed: "Thanks for interviewing with us — we're finalizing our decision.",
  Selected: "Congratulations — you've been selected! Our team will reach out with next steps.",
  Rejected: "We've decided to move forward with other candidates for this role.",
};

export default function TrackApplicationModal({ open, onClose }) {
  const [appId, setAppId] = useState("");
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [timeline, setTimeline] = useState([]);

  const errors = {
    appId: !appId.trim()
      ? "Enter your Application ID"
      : !/^\d+$/.test(appId.trim())
      ? "Application ID should be a number"
      : undefined,
    email: !email.trim() ? "Enter the email you applied with" : !EMAIL_RE.test(email) ? "Enter a valid email address" : undefined,
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const reset = () => {
    setAppId("");
    setEmail("");
    setTouched({});
    setError("");
    setResult(null);
    setTimeline([]);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (hasErrors) {
      setTouched({ appId: true, email: true });
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    setTimeline([]);
    try {
      const { data, error: queryError } = await supabase
        .from("job_applications")
        .select("id, job_title, department, status, created_at, updated_at")
        .eq("id", Number(appId.trim()))
        .eq("email", email.trim().toLowerCase())
        .maybeSingle();

      if (queryError) throw queryError;

      if (!data) {
        setError("We couldn't find an application with that ID and email. Please double-check and try again.");
        return;
      }

      setResult(data);

      const { data: activity } = await supabase
        .from("application_activity")
        .select("status, created_at")
        .eq("application_id", data.id)
        .eq("type", "status_change")
        .order("created_at", { ascending: true });

      setTimeline(activity || []);
    } catch (err) {
      console.error(err.message || "Application lookup failed");
      setError("Something went wrong looking up your application. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[9998] bg-black/60"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Track your application"
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-[28px] bg-card-light dark:bg-card-dark shadow-[0_30px_80px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between px-6 py-5 border-b border-secondary/10 dark:border-white/10">
                <h2 className="font-heading text-lg font-bold text-secondary dark:text-white">Track Your Application</h2>
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary/50 dark:text-white/50 hover:bg-secondary/5 dark:hover:bg-white/5"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="px-6 py-6">
                {!result && (
                  <>
                    <p className="text-sm text-secondary/60 dark:text-white/60 mb-5 leading-relaxed">
                      Enter the Application ID from your confirmation screen along with the email you applied with.
                    </p>
                    <form onSubmit={handleSearch} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-secondary/70 dark:text-white/70 mb-1.5">Application ID</label>
                        <input
                          value={appId}
                          onChange={(e) => setAppId(e.target.value)}
                          onBlur={() => setTouched((t) => ({ ...t, appId: true }))}
                          placeholder="e.g. 1024"
                          inputMode="numeric"
                          className={`w-full h-12 px-4 rounded-xl border bg-bg-light dark:bg-bg-dark text-secondary dark:text-white text-sm outline-none transition-all duration-200 ${
                            touched.appId && errors.appId
                              ? "border-red-400 focus:ring-4 focus:ring-red-400/15"
                              : "border-secondary/15 dark:border-white/15 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/15"
                          }`}
                        />
                        {touched.appId && errors.appId && (
                          <p role="alert" className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                            <AlertCircle size={12} /> {errors.appId}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-secondary/70 dark:text-white/70 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                          placeholder="you@example.com"
                          className={`w-full h-12 px-4 rounded-xl border bg-bg-light dark:bg-bg-dark text-secondary dark:text-white text-sm outline-none transition-all duration-200 ${
                            touched.email && errors.email
                              ? "border-red-400 focus:ring-4 focus:ring-red-400/15"
                              : "border-secondary/15 dark:border-white/15 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/15"
                          }`}
                        />
                        {touched.email && errors.email && (
                          <p role="alert" className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                            <AlertCircle size={12} /> {errors.email}
                          </p>
                        )}
                      </div>

                      {error && (
                        <p role="alert" className="flex items-start gap-1.5 text-xs text-red-500 bg-red-500/5 border border-red-500/15 rounded-xl px-3.5 py-2.5">
                          <AlertCircle size={13} className="mt-0.5 shrink-0" /> {error}
                        </p>
                      )}

                      <Button type="submit" variant="primary" disabled={loading} className="w-full justify-center disabled:opacity-60">
                        {loading ? (
                          <>
                            <Loader2 size={15} className="animate-spin" /> Searching...
                          </>
                        ) : (
                          <>
                            <Search size={15} /> Check Status
                          </>
                        )}
                      </Button>
                    </form>
                  </>
                )}

                {result && (
                  <div>
                    <div className="rounded-2xl border border-secondary/10 dark:border-white/10 p-5 mb-5">
                      <p className="text-xs text-secondary/40 dark:text-white/40 font-mono mb-1">Application #{result.id}</p>
                      <p className="font-heading text-lg font-bold text-secondary dark:text-white flex items-center gap-2">
                        <Briefcase size={16} className="text-primary shrink-0" /> {result.job_title}
                      </p>
                      {result.department && <p className="text-sm text-secondary/50 dark:text-white/50 mt-0.5">{result.department}</p>}

                      <div className="flex items-center gap-3 mt-4">
                        <StatusBadge status={result.status} />
                        <span className="flex items-center gap-1.5 text-xs text-secondary/40 dark:text-white/40">
                          <CalendarDays size={12} /> Applied {formatLeadDate(result.created_at).date}
                        </span>
                      </div>

                      {STATUS_NOTES[result.status] && (
                        <p className="text-sm text-secondary/60 dark:text-white/60 leading-relaxed mt-4 pt-4 border-t border-secondary/10 dark:border-white/10">
                          {STATUS_NOTES[result.status]}
                        </p>
                      )}
                    </div>

                    {timeline.length > 0 && (
                      <div className="mb-5">
                        <p className="text-xs font-semibold uppercase tracking-wide text-secondary/40 dark:text-white/40 mb-3">Progress</p>
                        <div className="space-y-3">
                          <TimelineDot label="Application Submitted" date={result.created_at} filled />
                          {timeline.map((t, i) => (
                            <TimelineDot key={i} label={`Status changed to "${t.status}"`} date={t.created_at} filled />
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={reset}
                      className="text-sm font-semibold text-primary hover:underline underline-offset-4"
                    >
                      Check another application
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function TimelineDot({ label, date, filled }) {
  const { date: d, time } = formatLeadDate(date);
  return (
    <div className="flex items-start gap-3">
      <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${filled ? "bg-primary/15" : "bg-secondary/5 dark:bg-white/5"}`}>
        <CheckCircle2 size={11} className="text-primary" />
      </span>
      <div>
        <p className="text-sm text-secondary dark:text-white">{label}</p>
        <p className="text-[11px] text-secondary/35 dark:text-white/35">{d} · {time}</p>
      </div>
    </div>
  );
}
