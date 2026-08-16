import { useState } from "react";
import { Eye, Download, Loader2, FileX } from "lucide-react";
import { getResumeViewUrl, getResumeDownloadUrl } from "../../../utils/resume";
import { useToast } from "../../../utils/toast.jsx";

export default function ResumeActions({ path, filename, size = "sm" }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(null); // 'view' | 'download' | null

  if (!path) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-secondary/35 dark:text-white/35">
        <FileX size={13} /> No resume
      </span>
    );
  }

  const iconSize = size === "sm" ? 13 : 15;
  const btnClass =
    size === "sm"
      ? "w-7 h-7 rounded-lg"
      : "w-9 h-9 rounded-xl";

  const view = async () => {
    setLoading("view");
    try {
      const url = await getResumeViewUrl(path);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error(err.message || "Failed to open resume");
      toast(err?.message ? `Couldn't open resume: ${err.message}` : "Couldn't open resume", "error");
    } finally {
      setLoading(null);
    }
  };

  const download = async () => {
    setLoading("download");
    try {
      const url = await getResumeDownloadUrl(path, filename);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || "resume";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error(err.message || "Failed to download resume");
      toast(err?.message ? `Couldn't download resume: ${err.message}` : "Couldn't download resume", "error");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={view}
        disabled={loading !== null}
        title="View resume"
        aria-label="View resume"
        className={`${btnClass} flex items-center justify-center text-secondary/50 dark:text-white/50 hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-50`}
      >
        {loading === "view" ? <Loader2 size={iconSize} className="animate-spin" /> : <Eye size={iconSize} />}
      </button>
      <button
        type="button"
        onClick={download}
        disabled={loading !== null}
        title="Download resume"
        aria-label="Download resume"
        className={`${btnClass} flex items-center justify-center text-secondary/50 dark:text-white/50 hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-50`}
      >
        {loading === "download" ? <Loader2 size={iconSize} className="animate-spin" /> : <Download size={iconSize} />}
      </button>
    </div>
  );
}
