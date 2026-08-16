import { getStatusMeta } from "../../static-data/applicationStatus";

export default function StatusBadge({ status, size = "md" }) {
  const meta = getStatusMeta(status);
  const sizeClass = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-semibold whitespace-nowrap ${meta.badge} ${sizeClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${meta.dot}`} />
      {status || "New"}
    </span>
  );
}
