import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  RotateCcw,
} from "lucide-react";
import { supabase } from "../../configs/supabase";
import Button from "../ui/Button";
import { useToast } from "../../utils/toast.jsx";

const STEPS = ["Personal", "Professional", "Experience", "Resume", "Additional", "Review"];
const DRAFT_TTL_DAYS = 7;
const MAX_RESUME_MB = 5;
const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const EXPERIENCE_LEVELS = ["Fresher", "< 1 Year", "1–2 Years", "2–5 Years", "5–8 Years", "8+ Years"];
const NOTICE_PERIODS = ["Immediate", "15 Days", "30 Days", "60 Days", "90 Days", "Other"];
const WORK_MODES = ["Remote", "Hybrid", "On-site"];
const SOURCES = ["LinkedIn", "Indeed", "Naukri", "Company Website", "Referral", "Social Media", "Other"];
const RELOCATION = ["Yes", "No", "Maybe"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/.+\..+/;

const emptyForm = {
  firstName: "", lastName: "", email: "", phone: "", dob: "",
  city: "", state: "", country: "India",
  linkedin: "", portfolio: "", github: "",
  currentTitle: "", currentCompany: "", totalExperience: "",
  currentSalary: "", expectedSalary: "", noticePeriod: "", workMode: "",
  skills: [], relevantExperience: "", previousExperience: [],
  resumeFile: null, resumePath: "", resumeFilename: "", resumeSize: 0, resumeState: "idle",
  coverLetter: "", whyJoin: "", whyFit: "", relocation: "", source: "", referral: "",
  consentAccurate: false, consentPrivacy: false,
};

function draftKey(jobId) {
  return `rkgc_application_draft_${jobId}`;
}

// ---------------- Validation ----------------
function validatePersonal(d) {
  const e = {};
  if (!d.firstName.trim()) e.firstName = "First name is required";
  if (!d.lastName.trim()) e.lastName = "Last name is required";
  if (!d.email.trim()) e.email = "Email is required";
  else if (!EMAIL_RE.test(d.email)) e.email = "Enter a valid email address";
  if (!d.phone.trim()) e.phone = "Phone number is required";
  else if (d.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a valid phone number";
  if (!d.city.trim()) e.city = "City is required";
  if (!d.country.trim()) e.country = "Country is required";
  if (d.linkedin && !URL_RE.test(d.linkedin)) e.linkedin = "Enter a valid URL (starting with https://)";
  if (d.portfolio && !URL_RE.test(d.portfolio)) e.portfolio = "Enter a valid URL (starting with https://)";
  if (d.github && !URL_RE.test(d.github)) e.github = "Enter a valid URL (starting with https://)";
  return e;
}
function validateProfessional(d) {
  const e = {};
  if (!d.totalExperience) e.totalExperience = "Select your experience level";
  if (!d.workMode) e.workMode = "Select a preferred work mode";
  return e;
}
function validateSkills(d) {
  const e = {};
  if (d.skills.length === 0) e.skills = "Add at least one skill";
  d.previousExperience.forEach((exp, i) => {
    if (!exp.company.trim()) e[`exp-${i}-company`] = "Company is required";
    if (!exp.title.trim()) e[`exp-${i}-title`] = "Title is required";
  });
  return e;
}
function validateResume(d) {
  const e = {};
  if (!d.resumePath) e.resume = "Please upload your resume to continue";
  return e;
}
function validateAdditional(d) {
  const e = {};
  if (!d.coverLetter.trim()) e.coverLetter = "Tell us a little about your interest";
  return e;
}
function validateConsent(d) {
  const e = {};
  if (!d.consentAccurate) e.consentAccurate = "Please confirm your information is accurate";
  if (!d.consentPrivacy) e.consentPrivacy = "Please accept the privacy policy to continue";
  return e;
}
const VALIDATORS = [validatePersonal, validateProfessional, validateSkills, validateResume, validateAdditional, validateConsent];

// ---------------- Shared field primitives ----------------
function Field({ label, required, error, children, className = "" }) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-secondary/70 dark:text-white/70 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5 overflow-hidden"
          >
            <AlertCircle size={12} className="shrink-0" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass = (hasError) =>
  `w-full h-12 px-4 rounded-xl border bg-bg-light dark:bg-bg-dark text-secondary dark:text-white text-sm outline-none transition-all duration-200 ${
    hasError
      ? "border-red-400 focus:ring-4 focus:ring-red-400/15"
      : "border-secondary/15 dark:border-white/15 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/15"
  }`;

function TextInput({ value, onChange, onBlur, error, ...props }) {
  return <input value={value} onChange={onChange} onBlur={onBlur} className={inputClass(!!error)} {...props} />;
}

function SelectInput({ value, onChange, onBlur, error, options, placeholder }) {
  return (
    <select value={value} onChange={onChange} onBlur={onBlur} className={inputClass(!!error)}>
      <option value="">{placeholder || "Select..."}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

function PillGroup({ value, onChange, options }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
            value === o
              ? "bg-primary border-primary text-secondary"
              : "border-secondary/15 dark:border-white/15 text-secondary/60 dark:text-white/60 hover:border-primary/40"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

// ---------------- Step 1: Personal ----------------
function StepPersonal({ data, update, errors, touched, onBlur }) {
  const err = (k) => (touched[k] ? errors[k] : undefined);
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="First Name" required error={err("firstName")}>
          <TextInput value={data.firstName} onChange={(e) => update({ firstName: e.target.value })} onBlur={() => onBlur("firstName")} error={err("firstName")} placeholder="Yash" />
        </Field>
        <Field label="Last Name" required error={err("lastName")}>
          <TextInput value={data.lastName} onChange={(e) => update({ lastName: e.target.value })} onBlur={() => onBlur("lastName")} error={err("lastName")} placeholder="Goel" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Email Address" required error={err("email")}>
          <TextInput type="email" value={data.email} onChange={(e) => update({ email: e.target.value })} onBlur={() => onBlur("email")} error={err("email")} placeholder="you@example.com" />
        </Field>
        <Field label="Phone Number" required error={err("phone")}>
          <TextInput type="tel" value={data.phone} onChange={(e) => update({ phone: e.target.value })} onBlur={() => onBlur("phone")} error={err("phone")} placeholder="+91 98765 43210" />
        </Field>
      </div>
      <Field label="Date of Birth" error={err("dob")}>
        <TextInput type="date" value={data.dob} onChange={(e) => update({ dob: e.target.value })} onBlur={() => onBlur("dob")} error={err("dob")} className="max-w-xs" />
      </Field>
      <div className="grid sm:grid-cols-3 gap-5">
        <Field label="City" required error={err("city")}>
          <TextInput value={data.city} onChange={(e) => update({ city: e.target.value })} onBlur={() => onBlur("city")} error={err("city")} placeholder="Ghaziabad" />
        </Field>
        <Field label="State" error={err("state")}>
          <TextInput value={data.state} onChange={(e) => update({ state: e.target.value })} onBlur={() => onBlur("state")} error={err("state")} placeholder="Uttar Pradesh" />
        </Field>
        <Field label="Country" required error={err("country")}>
          <TextInput value={data.country} onChange={(e) => update({ country: e.target.value })} onBlur={() => onBlur("country")} error={err("country")} placeholder="India" />
        </Field>
      </div>
      <div className="grid sm:grid-cols-3 gap-5">
        <Field label="LinkedIn Profile" error={err("linkedin")}>
          <TextInput value={data.linkedin} onChange={(e) => update({ linkedin: e.target.value })} onBlur={() => onBlur("linkedin")} error={err("linkedin")} placeholder="https://linkedin.com/in/..." />
        </Field>
        <Field label="Portfolio / Website" error={err("portfolio")}>
          <TextInput value={data.portfolio} onChange={(e) => update({ portfolio: e.target.value })} onBlur={() => onBlur("portfolio")} error={err("portfolio")} placeholder="https://..." />
        </Field>
        <Field label="GitHub Profile" error={err("github")}>
          <TextInput value={data.github} onChange={(e) => update({ github: e.target.value })} onBlur={() => onBlur("github")} error={err("github")} placeholder="https://github.com/..." />
        </Field>
      </div>
    </div>
  );
}

// ---------------- Step 2: Professional ----------------
function StepProfessional({ data, update, errors, touched, onBlur, jobTitle }) {
  const err = (k) => (touched[k] ? errors[k] : undefined);
  return (
    <div className="space-y-5">
      <Field label="Applying For">
        <div className="h-12 px-4 rounded-xl border border-secondary/10 dark:border-white/10 bg-secondary/5 dark:bg-white/5 flex items-center text-sm text-secondary/70 dark:text-white/70">
          {jobTitle}
        </div>
      </Field>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Current Job Title" error={err("currentTitle")}>
          <TextInput value={data.currentTitle} onChange={(e) => update({ currentTitle: e.target.value })} onBlur={() => onBlur("currentTitle")} error={err("currentTitle")} placeholder="e.g. Site Supervisor" />
        </Field>
        <Field label="Current Company" error={err("currentCompany")}>
          <TextInput value={data.currentCompany} onChange={(e) => update({ currentCompany: e.target.value })} onBlur={() => onBlur("currentCompany")} error={err("currentCompany")} placeholder="Company name" />
        </Field>
      </div>
      <Field label="Total Experience" required error={err("totalExperience")}>
        <SelectInput value={data.totalExperience} onChange={(e) => update({ totalExperience: e.target.value })} onBlur={() => onBlur("totalExperience")} error={err("totalExperience")} options={EXPERIENCE_LEVELS} placeholder="Select experience" />
      </Field>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Current Salary (optional)" error={err("currentSalary")}>
          <TextInput value={data.currentSalary} onChange={(e) => update({ currentSalary: e.target.value })} onBlur={() => onBlur("currentSalary")} error={err("currentSalary")} placeholder="e.g. ₹6,00,000 / year" />
        </Field>
        <Field label="Expected Salary (optional)" error={err("expectedSalary")}>
          <TextInput value={data.expectedSalary} onChange={(e) => update({ expectedSalary: e.target.value })} onBlur={() => onBlur("expectedSalary")} error={err("expectedSalary")} placeholder="e.g. ₹8,00,000 / year" />
        </Field>
      </div>
      <Field label="Notice Period" error={err("noticePeriod")}>
        <SelectInput value={data.noticePeriod} onChange={(e) => update({ noticePeriod: e.target.value })} onBlur={() => onBlur("noticePeriod")} error={err("noticePeriod")} options={NOTICE_PERIODS} placeholder="Select notice period" />
      </Field>
      <Field label="Preferred Work Mode" required error={err("workMode")}>
        <PillGroup value={data.workMode} onChange={(v) => update({ workMode: v })} options={WORK_MODES} />
      </Field>
    </div>
  );
}

// ---------------- Step 3: Skills & Experience ----------------
function StepSkills({ data, update, errors, touched, onBlur }) {
  const err = (k) => (touched[k] ? errors[k] : undefined);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const v = skillInput.trim();
    if (v && !data.skills.includes(v)) update({ skills: [...data.skills, v] });
    setSkillInput("");
  };
  const removeSkill = (s) => update({ skills: data.skills.filter((x) => x !== s) });

  const addExperience = () => {
    update({
      previousExperience: [
        ...data.previousExperience,
        { company: "", title: "", startDate: "", endDate: "", current: false, description: "" },
      ],
    });
  };
  const updateExperience = (i, patch) => {
    const next = [...data.previousExperience];
    next[i] = { ...next[i], ...patch };
    update({ previousExperience: next });
  };
  const removeExperience = (i) => update({ previousExperience: data.previousExperience.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-6">
      <Field label="Primary Skills" required error={err("skills")}>
        <div className={`flex flex-wrap gap-2 items-center p-2.5 rounded-xl border ${err("skills") ? "border-red-400" : "border-secondary/15 dark:border-white/15"}`}>
          {data.skills.map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {s}
              <button type="button" onClick={() => removeSkill(s)} aria-label={`Remove ${s}`} className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-primary/20">
                <X size={10} />
              </button>
            </span>
          ))}
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onBlur={() => { addSkill(); onBlur("skills"); }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addSkill(); }
            }}
            placeholder={data.skills.length === 0 ? "Type a skill and press Enter" : "Add another..."}
            className="flex-1 min-w-[140px] h-9 px-2 bg-transparent outline-none text-sm text-secondary dark:text-white placeholder:text-secondary/35 dark:placeholder:text-white/30"
          />
        </div>
      </Field>

      <Field label="Years of Relevant Experience" error={err("relevantExperience")}>
        <TextInput
          type="number"
          min="0"
          step="0.5"
          value={data.relevantExperience}
          onChange={(e) => update({ relevantExperience: e.target.value })}
          onBlur={() => onBlur("relevantExperience")}
          error={err("relevantExperience")}
          placeholder="e.g. 3"
          className="max-w-xs"
        />
      </Field>

      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-secondary/70 dark:text-white/70">Previous Companies</p>
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-4"
          >
            <Plus size={14} /> Add Experience
          </button>
        </div>

        <div className="space-y-4">
          {data.previousExperience.map((exp, i) => (
            <div key={i} className="rounded-2xl border border-secondary/10 dark:border-white/10 p-4 relative">
              <button
                type="button"
                onClick={() => removeExperience(i)}
                aria-label="Remove this experience"
                className="absolute top-3 right-3 w-7 h-7 rounded-lg flex items-center justify-center text-secondary/30 dark:text-white/30 hover:text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 size={13} />
              </button>
              <div className="grid sm:grid-cols-2 gap-4 pr-8">
                <Field label="Company" required error={touched[`exp-${i}-company`] ? errors[`exp-${i}-company`] : undefined}>
                  <TextInput value={exp.company} onChange={(e) => updateExperience(i, { company: e.target.value })} onBlur={() => onBlur(`exp-${i}-company`)} error={touched[`exp-${i}-company`] ? errors[`exp-${i}-company`] : undefined} placeholder="Company name" />
                </Field>
                <Field label="Job Title" required error={touched[`exp-${i}-title`] ? errors[`exp-${i}-title`] : undefined}>
                  <TextInput value={exp.title} onChange={(e) => updateExperience(i, { title: e.target.value })} onBlur={() => onBlur(`exp-${i}-title`)} error={touched[`exp-${i}-title`] ? errors[`exp-${i}-title`] : undefined} placeholder="Your role" />
                </Field>
                <Field label="Start Date">
                  <TextInput type="month" value={exp.startDate} onChange={(e) => updateExperience(i, { startDate: e.target.value })} />
                </Field>
                <Field label="End Date">
                  <TextInput type="month" value={exp.endDate} disabled={exp.current} onChange={(e) => updateExperience(i, { endDate: e.target.value })} className={exp.current ? "opacity-50" : ""} />
                  <label className="flex items-center gap-2 mt-2 text-xs text-secondary/50 dark:text-white/50">
                    <input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(i, { current: e.target.checked, endDate: "" })} className="accent-primary" />
                    I currently work here
                  </label>
                </Field>
                <Field label="Description" className="sm:col-span-2">
                  <textarea
                    rows={2}
                    value={exp.description}
                    onChange={(e) => updateExperience(i, { description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-secondary/15 dark:border-white/15 bg-bg-light dark:bg-bg-dark text-secondary dark:text-white text-sm outline-none resize-none focus:border-primary/50 focus:ring-4 focus:ring-primary/15 transition-all duration-200"
                    placeholder="What did you work on?"
                  />
                </Field>
              </div>
            </div>
          ))}
          {data.previousExperience.length === 0 && (
            <p className="text-sm text-secondary/40 dark:text-white/40 italic">No previous experience added yet — optional.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------- Step 4: Resume ----------------
function StepResume({ data, update, errors, touched }) {
  const { toast } = useToast();
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const inputRef = useRef(null);

  const uploadFile = async (file) => {
    if (!ALLOWED_RESUME_TYPES.includes(file.type)) {
      toast("Please upload a PDF, DOC or DOCX file", "error");
      return;
    }
    if (file.size > MAX_RESUME_MB * 1024 * 1024) {
      toast(`Resume must be smaller than ${MAX_RESUME_MB}MB`, "error");
      return;
    }

    update({ resumeState: "uploading", resumeFile: file, resumeFilename: file.name, resumeSize: file.size });
    setPreviewUrl(URL.createObjectURL(file));

    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("resumes").upload(path, file);
      if (error) throw error;
      update({ resumeState: "success", resumePath: path });
      toast("Resume uploaded successfully", "success");
    } catch (err) {
      console.error(err.message || "Resume upload failed");
      update({ resumeState: "error", resumePath: "" });
      const reason = err?.message ? `Upload failed: ${err.message}` : "Upload failed. Please try again.";
      toast(reason, "error", 6000);
    }
  };

  const handleFiles = (files) => {
    if (files?.[0]) uploadFile(files[0]);
  };

  const removeResume = () => {
    update({ resumeFile: null, resumePath: "", resumeFilename: "", resumeSize: 0, resumeState: "idle" });
    setPreviewUrl(null);
  };

  const err = touched.resume ? errors.resume : undefined;

  return (
    <div className="space-y-5">
      {!data.resumeFilename ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          className={`rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-colors duration-200 ${
            dragOver ? "border-primary bg-primary/5" : err ? "border-red-400" : "border-secondary/20 dark:border-white/20 hover:border-primary/40"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Upload size={22} className="text-primary" />
          </div>
          <p className="font-semibold text-secondary dark:text-white mb-1">Upload Your Resume</p>
          <p className="text-sm text-secondary/50 dark:text-white/50">Drag &amp; drop your resume here, or click to browse</p>
          <p className="text-xs text-secondary/35 dark:text-white/35 mt-3">PDF, DOC or DOCX — up to {MAX_RESUME_MB}MB</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-secondary/10 dark:border-white/10 p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileText size={20} className="text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-secondary dark:text-white truncate">{data.resumeFilename}</p>
              <p className="text-xs text-secondary/45 dark:text-white/45 mt-0.5">
                {(data.resumeSize / (1024 * 1024)).toFixed(2)} MB
              </p>
              {data.resumeState === "uploading" && (
                <p className="flex items-center gap-1.5 text-xs text-primary mt-1.5">
                  <Loader2 size={12} className="animate-spin" /> Uploading...
                </p>
              )}
              {data.resumeState === "success" && (
                <p className="flex items-center gap-1.5 text-xs text-emerald-500 mt-1.5">
                  <CheckCircle2 size={12} /> Uploaded successfully
                </p>
              )}
              {data.resumeState === "error" && (
                <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
                  <AlertCircle size={12} /> Upload failed
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {previewUrl && (
              <button
                type="button"
                onClick={() => setShowPreview((p) => !p)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-secondary/5 dark:bg-white/5 text-secondary dark:text-white hover:bg-secondary/10 dark:hover:bg-white/10 transition-colors"
              >
                <Eye size={13} /> {showPreview ? "Hide Preview" : "Preview"}
              </button>
            )}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-secondary/5 dark:bg-white/5 text-secondary dark:text-white hover:bg-secondary/10 dark:hover:bg-white/10 transition-colors"
            >
              <RotateCcw size={13} /> Replace
            </button>
            <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
            <button
              type="button"
              onClick={removeResume}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
            >
              <Trash2 size={13} /> Remove
            </button>
          </div>

          {showPreview && previewUrl && (
            <iframe title="Resume preview" src={previewUrl} className="w-full h-[420px] rounded-xl border border-secondary/10 dark:border-white/10 mt-4" />
          )}
        </div>
      )}
      {err && (
        <p role="alert" className="flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle size={12} /> {err}
        </p>
      )}
    </div>
  );
}

// ---------------- Step 5: Additional ----------------
function StepAdditional({ data, update, errors, touched, onBlur }) {
  const err = (k) => (touched[k] ? errors[k] : undefined);
  const taClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border resize-none outline-none transition-all duration-200 text-sm text-secondary dark:text-white bg-bg-light dark:bg-bg-dark ${
      hasError ? "border-red-400 focus:ring-4 focus:ring-red-400/15" : "border-secondary/15 dark:border-white/15 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/15"
    }`;

  return (
    <div className="space-y-5">
      <Field label="Cover Letter" required error={err("coverLetter")}>
        <textarea
          rows={5}
          value={data.coverLetter}
          onChange={(e) => update({ coverLetter: e.target.value })}
          onBlur={() => onBlur("coverLetter")}
          className={taClass(!!err("coverLetter"))}
          placeholder="Tell us why you are interested in this position and what makes you a great fit..."
        />
      </Field>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Why do you want to join us?" error={err("whyJoin")}>
          <textarea rows={3} value={data.whyJoin} onChange={(e) => update({ whyJoin: e.target.value })} className={taClass(false)} />
        </Field>
        <Field label="What makes you a good fit?" error={err("whyFit")}>
          <textarea rows={3} value={data.whyFit} onChange={(e) => update({ whyFit: e.target.value })} className={taClass(false)} />
        </Field>
      </div>
      <Field label="Would you be willing to relocate?" error={err("relocation")}>
        <PillGroup value={data.relocation} onChange={(v) => update({ relocation: v })} options={RELOCATION} />
      </Field>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="How did you hear about us?" error={err("source")}>
          <SelectInput value={data.source} onChange={(e) => update({ source: e.target.value })} options={SOURCES} placeholder="Select an option" />
        </Field>
        {data.source === "Referral" && (
          <Field label="Referral (name / email)" error={err("referral")}>
            <TextInput value={data.referral} onChange={(e) => update({ referral: e.target.value })} placeholder="Who referred you?" />
          </Field>
        )}
      </div>
    </div>
  );
}

// ---------------- Step 6: Review ----------------
function ReviewRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4 py-2 text-sm border-b border-secondary/5 dark:border-white/5 last:border-b-0">
      <span className="text-secondary/45 dark:text-white/45 shrink-0">{label}</span>
      <span className="text-secondary dark:text-white text-right">{value}</span>
    </div>
  );
}

function ReviewSection({ title, onEdit, children }) {
  return (
    <div className="rounded-2xl border border-secondary/10 dark:border-white/10 p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-bold text-secondary dark:text-white">{title}</p>
        <button type="button" onClick={onEdit} className="text-xs font-semibold text-primary hover:underline underline-offset-4">
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

function StepReview({ data, update, errors, touched, onBlur, goToStep }) {
  const err = (k) => (touched[k] ? errors[k] : undefined);
  return (
    <div className="space-y-4">
      <ReviewSection title="Personal Information" onEdit={() => goToStep(0)}>
        <ReviewRow label="Name" value={`${data.firstName} ${data.lastName}`} />
        <ReviewRow label="Email" value={data.email} />
        <ReviewRow label="Phone" value={data.phone} />
        <ReviewRow label="Location" value={[data.city, data.state, data.country].filter(Boolean).join(", ")} />
      </ReviewSection>

      <ReviewSection title="Professional Information" onEdit={() => goToStep(1)}>
        <ReviewRow label="Experience" value={data.totalExperience} />
        <ReviewRow label="Current Role" value={data.currentTitle && data.currentCompany ? `${data.currentTitle} at ${data.currentCompany}` : data.currentTitle} />
        <ReviewRow label="Work Mode" value={data.workMode} />
        <ReviewRow label="Notice Period" value={data.noticePeriod} />
      </ReviewSection>

      <ReviewSection title="Skills & Experience" onEdit={() => goToStep(2)}>
        <ReviewRow label="Skills" value={data.skills.join(", ")} />
        <ReviewRow label="Previous Companies" value={data.previousExperience.length ? `${data.previousExperience.length} added` : ""} />
      </ReviewSection>

      <ReviewSection title="Resume" onEdit={() => goToStep(3)}>
        <ReviewRow label="File" value={data.resumeFilename} />
      </ReviewSection>

      <ReviewSection title="Cover Letter" onEdit={() => goToStep(4)}>
        <p className="text-sm text-secondary/70 dark:text-white/70 leading-relaxed line-clamp-3">{data.coverLetter}</p>
      </ReviewSection>

      <div className="space-y-3 pt-2">
        <label className="flex items-start gap-3 text-sm text-secondary/70 dark:text-white/70">
          <input
            type="checkbox"
            checked={data.consentAccurate}
            onChange={(e) => { update({ consentAccurate: e.target.checked }); onBlur("consentAccurate"); }}
            className="mt-0.5 accent-primary shrink-0"
          />
          I confirm that the information provided is accurate.
        </label>
        {err("consentAccurate") && <p className="text-xs text-red-500 pl-7">{err("consentAccurate")}</p>}

        <label className="flex items-start gap-3 text-sm text-secondary/70 dark:text-white/70">
          <input
            type="checkbox"
            checked={data.consentPrivacy}
            onChange={(e) => { update({ consentPrivacy: e.target.checked }); onBlur("consentPrivacy"); }}
            className="mt-0.5 accent-primary shrink-0"
          />
          I agree to RKGC Group&apos;s{" "}
          <a href="/contact" className="text-primary hover:underline underline-offset-2">
            Privacy Policy
          </a>{" "}
          and consent to the processing of my application.
        </label>
        {err("consentPrivacy") && <p className="text-xs text-red-500 pl-7">{err("consentPrivacy")}</p>}
      </div>
    </div>
  );
}

// ---------------- Success screen ----------------
function SuccessScreen({ applicationId, onClose, onViewMore }) {
  return (
    <div className="flex flex-col items-center text-center py-12 px-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
      >
        <CheckCircle2 size={40} className="text-primary" />
      </motion.div>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-3">
        Application Submitted Successfully 🎉
      </h2>
      <p className="text-secondary/60 dark:text-white/60 max-w-md leading-relaxed mb-5">
        Thank you for applying. We&apos;ve received your application and our recruitment team will review it shortly.
      </p>
      {applicationId && (
        <p className="inline-flex px-4 py-2 rounded-full bg-secondary/5 dark:bg-white/5 text-sm font-mono text-secondary/70 dark:text-white/70 mb-8">
          Application ID: #{applicationId}
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="primary" onClick={onClose}>
          Back to Careers
        </Button>
        <Button variant="secondary" onClick={onViewMore}>
          View More Jobs
        </Button>
      </div>
    </div>
  );
}

// ---------------- Main flow ----------------
export default function ApplicationFlow({ job, onClose }) {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [data, setData] = useState(emptyForm);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const [draftAvailable, setDraftAvailable] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey(job.id));
      if (raw) {
        const parsed = JSON.parse(raw);
        const ageDays = (Date.now() - parsed.savedAt) / 86400000;
        if (ageDays <= DRAFT_TTL_DAYS) setDraftAvailable(true);
        else localStorage.removeItem(draftKey(job.id));
      }
    } catch {
      // ignore corrupt drafts
    }
  }, [job.id]);

  const update = (patch) => setData((d) => ({ ...d, ...patch }));
  const onBlur = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const errors = useMemo(() => VALIDATORS[step]?.(data) || {}, [step, data]);

  const restoreDraft = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem(draftKey(job.id)));
      setData((d) => ({ ...d, ...parsed.data, resumeFile: null }));
      toast("Draft restored — please re-attach your resume", "info");
    } catch {
      toast("Couldn't restore your saved draft", "error");
    }
    setDraftAvailable(false);
  };
  const discardDraft = () => {
    localStorage.removeItem(draftKey(job.id));
    setDraftAvailable(false);
  };

  const saveForLater = () => {
    const { resumeFile, ...safeData } = data;
    try {
      localStorage.setItem(draftKey(job.id), JSON.stringify({ savedAt: Date.now(), data: safeData }));
      toast("Progress saved — come back within 7 days to continue", "success");
    } catch {
      toast("Couldn't save your progress", "error");
    }
  };

  const scrollTop = () => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });

  const goNext = () => {
    const stepErrors = VALIDATORS[step](data);
    if (Object.keys(stepErrors).length > 0) {
      const fieldNames = Object.keys(stepErrors);
      setTouched((t) => ({ ...t, ...Object.fromEntries(fieldNames.map((f) => [f, true])) }));
      toast("Please fix the highlighted fields before continuing", "error");
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    scrollTop();
  };
  const goBack = () => { setStep((s) => Math.max(s - 1, 0)); scrollTop(); };
  const goToStep = (i) => { setStep(i); scrollTop(); };

  const handleSubmit = async () => {
    const consentErrors = validateConsent(data);
    if (Object.keys(consentErrors).length > 0) {
      setTouched((t) => ({ ...t, consentAccurate: true, consentPrivacy: true }));
      toast("Please accept both checkboxes to submit", "error");
      return;
    }
    setSubmitting(true);
    try {
      const { data: inserted, error } = await supabase
        .from("job_applications")
        .insert([{
          job_id: job.id,
          job_title: job.title,
          department: job.department,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          city: data.city,
          state: data.state,
          country: data.country,
          linkedin_url: data.linkedin,
          portfolio_url: data.portfolio,
          github_url: data.github,
          current_title: data.currentTitle,
          current_company: data.currentCompany,
          total_experience: data.totalExperience,
          current_salary: data.currentSalary,
          expected_salary: data.expectedSalary,
          notice_period: data.noticePeriod,
          work_mode: data.workMode,
          primary_skills: data.skills,
          years_relevant_experience: data.relevantExperience || null,
          previous_experience: data.previousExperience,
          cover_letter: data.coverLetter,
          why_join: data.whyJoin,
          why_fit: data.whyFit,
          relocation: data.relocation,
          source: data.source,
          referral: data.referral,
          resume_path: data.resumePath,
          resume_filename: data.resumeFilename,
          resume_size: data.resumeSize || null,
          status: "New",
        }])
        .select("id")
        .single();

      if (error) throw error;

      localStorage.removeItem(draftKey(job.id));
      setApplicationId(inserted?.id);
      setStep(STEPS.length); // success screen
    } catch (err) {
      console.error(err.message || "Application submission failed");
      const reason = err?.message ? `Submission failed: ${err.message}` : "Something went wrong submitting your application. Please try again.";
      toast(reason, "error", 6000);
    } finally {
      setSubmitting(false);
    }
  };

  const isSuccess = step === STEPS.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10002] bg-black/60 flex items-center justify-center p-0 sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label="Job application"
        className="w-full sm:max-w-3xl h-full sm:h-auto sm:max-h-[92vh] bg-card-light dark:bg-card-dark sm:rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="shrink-0 px-5 sm:px-8 py-5 border-b border-secondary/10 dark:border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {isSuccess ? "Application Complete" : "Apply Now"}
              </p>
              <h2 className="font-heading text-lg font-bold text-secondary dark:text-white truncate">{job.title}</h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close application form"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary/50 dark:text-white/50 hover:bg-secondary/5 dark:hover:bg-white/5 shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          {!isSuccess && (
            <div className="flex items-center gap-1">
              {STEPS.map((label, i) => (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <button
                    type="button"
                    onClick={() => i < step && goToStep(i)}
                    disabled={i > step}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors ${
                      i < step
                        ? "bg-primary text-secondary cursor-pointer"
                        : i === step
                        ? "bg-primary text-secondary"
                        : "bg-secondary/10 dark:bg-white/10 text-secondary/40 dark:text-white/40 cursor-default"
                    }`}
                    title={label}
                  >
                    {i < step ? <Check size={12} /> : i + 1}
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={`h-[2px] flex-1 mx-1 rounded-full ${i < step ? "bg-primary" : "bg-secondary/10 dark:bg-white/10"}`} />
                  )}
                </div>
              ))}
            </div>
          )}
          {!isSuccess && (
            <p className="text-xs text-secondary/40 dark:text-white/40 mt-2 hidden sm:block">
              Step {step + 1} of {STEPS.length}: {STEPS[step]}
            </p>
          )}
        </div>

        {/* Draft banner */}
        {draftAvailable && !isSuccess && (
          <div className="shrink-0 px-5 sm:px-8 py-3 bg-primary/5 border-b border-primary/10 flex items-center justify-between gap-3 flex-wrap">
            <p className="text-xs text-secondary/70 dark:text-white/70">You have a saved draft for this application.</p>
            <div className="flex gap-2">
              <button onClick={restoreDraft} className="text-xs font-semibold text-primary hover:underline underline-offset-4">Restore</button>
              <button onClick={discardDraft} className="text-xs font-semibold text-secondary/40 dark:text-white/40 hover:underline underline-offset-4">Discard</button>
            </div>
          </div>
        )}

        {/* Body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 sm:px-8 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSuccess ? "success" : step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              {isSuccess ? (
                <SuccessScreen applicationId={applicationId} onClose={onClose} onViewMore={onClose} />
              ) : (
                <>
                  {step === 0 && <StepPersonal data={data} update={update} errors={errors} touched={touched} onBlur={onBlur} />}
                  {step === 1 && <StepProfessional data={data} update={update} errors={errors} touched={touched} onBlur={onBlur} jobTitle={job.title} />}
                  {step === 2 && <StepSkills data={data} update={update} errors={errors} touched={touched} onBlur={onBlur} />}
                  {step === 3 && <StepResume data={data} update={update} errors={errors} touched={touched} />}
                  {step === 4 && <StepAdditional data={data} update={update} errors={errors} touched={touched} onBlur={onBlur} />}
                  {step === 5 && <StepReview data={data} update={update} errors={errors} touched={touched} onBlur={onBlur} goToStep={goToStep} />}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        {!isSuccess && (
          <div className="shrink-0 px-5 sm:px-8 py-4 border-t border-secondary/10 dark:border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-secondary/60 dark:text-white/60 hover:bg-secondary/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft size={15} /> Back
            </button>

            <button
              type="button"
              onClick={saveForLater}
              className="hidden sm:inline text-xs font-semibold text-secondary/40 dark:text-white/40 hover:text-primary transition-colors"
            >
              Save &amp; Continue Later
            </button>

            {step < STEPS.length - 1 ? (
              <Button variant="primary" onClick={goNext} className="!px-6">
                Next <ChevronRight size={15} className="ml-1" />
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit} disabled={submitting} className="!px-6 disabled:opacity-60">
                {submitting ? (
                  <>
                    <Loader2 size={15} className="animate-spin" /> Submitting Application...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
