import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Linkedin,
  Globe,
  Github,
  FileText,
  Eye,
  Download,
  Trash2,
  Send,
  CheckCircle2,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { supabase } from "../../../configs/supabase";
import { formatLeadDate } from "../../../utils/formatDate";
import { getResumeViewUrl, getResumeDownloadUrl, formatFileSize, fileExtension } from "../../../utils/resume";
import { useToast } from "../../../utils/toast.jsx";
import { STATUSES } from "../../../static-data/applicationStatus";
import StatusBadge from "../StatusBadge";
import Dropdown, { DropdownItem } from "../Dropdown";

function InfoRow({ icon: Icon, label, value, href }) {
  if (!value) return null;
  const content = (
    <div className="flex items-start gap-3 py-2">
      <Icon size={14} className="text-primary mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-[11px] text-secondary/40 dark:text-white/40">{label}</p>
        <p className="text-sm text-secondary dark:text-white break-words">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block hover:bg-secondary/[0.03] dark:hover:bg-white/[0.03] rounded-lg -mx-2 px-2 transition-colors">
      {content}
    </a>
  ) : (
    content
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-secondary/40 dark:text-white/40 mb-2">{title}</p>
      {children}
    </div>
  );
}

export default function ApplicationDetailsDrawer({ app, onClose, onDeleted, onUpdated, onRequestDelete }) {
  const { toast } = useToast();
  const [activity, setActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [note, setNote] = useState("");
  const [addingNote, setAddingNote] = useState(false);

  useEffect(() => {
    if (!app) return;
    loadActivity(app.id);
  }, [app?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadActivity = async (applicationId) => {
    setLoadingActivity(true);
    try {
      const { data, error } = await supabase
        .from("application_activity")
        .select("*")
        .eq("application_id", applicationId)
        .order("created_at", { ascending: true });
      if (error) throw error;
      setActivity(data || []);
    } catch (err) {
      console.error(err.message || "Failed to load activity");
      setActivity([]);
    } finally {
      setLoadingActivity(false);
    }
  };

  const changeStatus = async (newStatus) => {
    if (!app || newStatus === app.status) return;
    setStatusUpdating(true);
    try {
      const updatedAt = new Date().toISOString();
      const { error: updateError } = await supabase
        .from("job_applications")
        .update({ status: newStatus, updated_at: updatedAt })
        .eq("id", app.id);
      if (updateError) throw updateError;

      const { error: activityError } = await supabase
        .from("application_activity")
        .insert([{ application_id: app.id, type: "status_change", status: newStatus }]);
      if (activityError) throw activityError;

      toast(`Status updated to "${newStatus}"`, "success");
      onUpdated?.({ ...app, status: newStatus, updated_at: updatedAt });
      loadActivity(app.id);
    } catch (err) {
      console.error(err.message || "Failed to update status");
      toast(err?.message ? `Couldn't update status: ${err.message}` : "Couldn't update status", "error");
    } finally {
      setStatusUpdating(false);
    }
  };

  const addNote = async () => {
    if (!note.trim() || !app) return;
    setAddingNote(true);
    try {
      const { error } = await supabase
        .from("application_activity")
        .insert([{ application_id: app.id, type: "note", note: note.trim() }]);
      if (error) throw error;
      setNote("");
      toast("Note added", "success");
      loadActivity(app.id);
    } catch (err) {
      console.error(err.message || "Failed to add note");
      toast(err?.message ? `Couldn't add note: ${err.message}` : "Couldn't add note", "error");
    } finally {
      setAddingNote(false);
    }
  };

  const viewResume = async () => {
    try {
      const url = await getResumeViewUrl(app.resume_path);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      toast(err?.message ? `Couldn't open resume: ${err.message}` : "Couldn't open resume", "error");
    }
  };
  const downloadResume = async () => {
    try {
      const url = await getResumeDownloadUrl(app.resume_path, app.resume_filename);
      const a = document.createElement("a");
      a.href = url;
      a.download = app.resume_filename || "resume";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      toast(err?.message ? `Couldn't download resume: ${err.message}` : "Couldn't download resume", "error");
    }
  };

  if (!app) return null;

  const submittedDate = formatLeadDate(app.created_at);
  const timelineEvents = [
    { type: "submitted", label: "Application Submitted", created_at: app.created_at },
    ...activity,
  ];

  return (
    <AnimatePresence>
      {app && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[10000] bg-black/50" />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Application details"
            className="fixed inset-y-0 right-0 z-[10001] w-full sm:w-[480px] bg-card-light dark:bg-card-dark shadow-[-20px_0_60px_rgba(0,0,0,0.15)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-secondary/10 dark:border-white/10 shrink-0">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Application Details</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onRequestDelete(app)}
                  title="Delete application"
                  aria-label="Delete application"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary/40 dark:text-white/40 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
                <button onClick={onClose} aria-label="Close details" className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary/50 dark:text-white/50 hover:bg-secondary/5 dark:hover:bg-white/5">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {/* Identity + status */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-secondary dark:text-white">{app.first_name} {app.last_name}</h2>
                  <p className="text-sm text-secondary/50 dark:text-white/50 mt-0.5">Applied for {app.job_title}</p>
                </div>
              </div>

              <Section title="Application Status">
                <Dropdown label={statusUpdating ? "Updating..." : app.status || "New"} icon={statusUpdating ? Loader2 : undefined}>
                  {(close) => (
                    <div className="py-1.5">
                      {STATUSES.map((s) => (
                        <DropdownItem key={s.value} active={app.status === s.value} onClick={() => { changeStatus(s.value); close(); }}>
                          <span className="flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                            {s.value}
                          </span>
                        </DropdownItem>
                      ))}
                    </div>
                  )}
                </Dropdown>
              </Section>

              <Section title="Candidate Information">
                <div className="rounded-2xl border border-secondary/10 dark:border-white/10 px-3 divide-y divide-secondary/5 dark:divide-white/5">
                  <InfoRow icon={Mail} label="Email" value={app.email} href={`mailto:${app.email}`} />
                  <InfoRow icon={Phone} label="Phone" value={app.phone} href={`tel:${app.phone}`} />
                  <InfoRow icon={MapPin} label="Location" value={[app.city, app.state, app.country].filter(Boolean).join(", ")} />
                  <InfoRow icon={Briefcase} label="Current Role" value={app.current_title && app.current_company ? `${app.current_title} at ${app.current_company}` : app.current_title} />
                  <InfoRow icon={Linkedin} label="LinkedIn" value={app.linkedin_url} href={app.linkedin_url} />
                  <InfoRow icon={Globe} label="Portfolio" value={app.portfolio_url} href={app.portfolio_url} />
                  <InfoRow icon={Github} label="GitHub" value={app.github_url} href={app.github_url} />
                </div>
                {app.primary_skills?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {app.primary_skills.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-full bg-secondary/5 dark:bg-white/5 text-secondary/70 dark:text-white/70 text-xs font-medium">{s}</span>
                    ))}
                  </div>
                )}
              </Section>

              <Section title="Job Information">
                <div className="grid grid-cols-2 gap-3">
                  <MiniStat label="Position" value={app.job_title} />
                  <MiniStat label="Department" value={app.department || "—"} />
                  <MiniStat label="Experience" value={app.total_experience || "—"} />
                  <MiniStat label="Work Mode" value={app.work_mode || "—"} />
                  <MiniStat label="Notice Period" value={app.notice_period || "—"} />
                  <MiniStat label="Applied On" value={submittedDate.date} />
                </div>
              </Section>

              {(app.cover_letter || app.why_join || app.why_fit) && (
                <Section title="Application Answers">
                  {app.cover_letter && <AnswerBlock label="Cover Letter" text={app.cover_letter} />}
                  {app.why_join && <AnswerBlock label="Why join us?" text={app.why_join} />}
                  {app.why_fit && <AnswerBlock label="Why a good fit?" text={app.why_fit} />}
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-secondary/50 dark:text-white/50">
                    {app.relocation && <span>Relocation: <strong className="text-secondary dark:text-white">{app.relocation}</strong></span>}
                    {app.source && <span>Source: <strong className="text-secondary dark:text-white">{app.source}</strong></span>}
                  </div>
                </Section>
              )}

              {app.previous_experience?.length > 0 && (
                <Section title="Previous Experience">
                  <div className="space-y-2">
                    {app.previous_experience.map((exp, i) => (
                      <div key={i} className="rounded-xl border border-secondary/10 dark:border-white/10 p-3">
                        <p className="text-sm font-semibold text-secondary dark:text-white">{exp.title} · {exp.company}</p>
                        <p className="text-xs text-secondary/45 dark:text-white/45 mt-0.5">
                          {exp.startDate || "—"} – {exp.current ? "Present" : exp.endDate || "—"}
                        </p>
                        {exp.description && <p className="text-xs text-secondary/60 dark:text-white/60 mt-1.5">{exp.description}</p>}
                      </div>
                    ))}
                  </div>
                </Section>
              )}

              <Section title="Resume">
                {app.resume_path ? (
                  <div className="rounded-2xl border border-secondary/10 dark:border-white/10 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText size={18} className="text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-secondary dark:text-white truncate">{app.resume_filename}</p>
                        <p className="text-xs text-secondary/45 dark:text-white/45 mt-0.5">
                          {fileExtension(app.resume_filename)} · {formatFileSize(app.resume_size)} · Uploaded {submittedDate.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={viewResume} className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                        <Eye size={13} /> Preview
                      </button>
                      <button onClick={downloadResume} className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-secondary/5 dark:bg-white/5 text-secondary dark:text-white hover:bg-secondary/10 dark:hover:bg-white/10 transition-colors">
                        <Download size={13} /> Download
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-secondary/40 dark:text-white/40 italic">No resume was attached to this application.</p>
                )}
              </Section>

              <Section title="Timeline">
                <div className="space-y-4">
                  {loadingActivity && <p className="text-xs text-secondary/40 dark:text-white/40">Loading activity...</p>}
                  {timelineEvents.map((event, i) => (
                    <TimelineItem key={event.id || `submitted-${i}`} event={event} isLast={i === timelineEvents.length - 1} />
                  ))}
                </div>

                <div className="flex items-start gap-2 mt-4">
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add an internal note..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-secondary/15 dark:border-white/15 bg-bg-light dark:bg-bg-dark text-sm text-secondary dark:text-white outline-none resize-none focus:border-primary/50 focus:ring-4 focus:ring-primary/15 transition-all duration-200"
                  />
                  <button
                    onClick={addNote}
                    disabled={!note.trim() || addingNote}
                    aria-label="Add note"
                    className="w-10 h-10 rounded-xl bg-primary text-secondary flex items-center justify-center shrink-0 disabled:opacity-50 hover:shadow-glow transition-shadow"
                  >
                    {addingNote ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                  </button>
                </div>
              </Section>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-xl bg-bg-light dark:bg-bg-dark border border-secondary/10 dark:border-white/10 p-3">
      <p className="text-[11px] text-secondary/40 dark:text-white/40">{label}</p>
      <p className="text-sm font-semibold text-secondary dark:text-white mt-0.5 truncate">{value}</p>
    </div>
  );
}

function AnswerBlock({ label, text }) {
  return (
    <div className="mb-3 last:mb-0">
      <p className="text-xs font-semibold text-secondary/50 dark:text-white/50 mb-1">{label}</p>
      <p className="text-sm text-secondary/70 dark:text-white/70 leading-relaxed rounded-xl bg-bg-light dark:bg-bg-dark border border-secondary/10 dark:border-white/10 p-3">{text}</p>
    </div>
  );
}

function TimelineItem({ event, isLast }) {
  const { date, time } = formatLeadDate(event.created_at);
  const isSubmitted = event.type === "submitted";
  const isNote = event.type === "note";
  const Icon = isSubmitted ? CheckCircle2 : isNote ? MessageSquare : CheckCircle2;

  return (
    <div className="relative pl-8">
      {!isLast && <span className="absolute left-[11px] top-6 bottom-[-16px] w-px bg-secondary/10 dark:bg-white/10" />}
      <span className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon size={12} className="text-primary" />
      </span>
      <p className="text-sm text-secondary dark:text-white font-medium">
        {isSubmitted ? "Application Submitted" : isNote ? "Internal Note" : `Status changed to "${event.status}"`}
      </p>
      {isNote && <p className="text-sm text-secondary/60 dark:text-white/60 mt-1">{event.note}</p>}
      {!isNote && !isSubmitted && event.status && <StatusBadge status={event.status} size="sm" />}
      <p className="text-[11px] text-secondary/35 dark:text-white/35 mt-1">{date} · {time}</p>
    </div>
  );
}
