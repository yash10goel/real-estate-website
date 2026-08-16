// Matches the existing +5.5h IST offset used by ExcelDownload, so the
// table and the exported spreadsheet always show the same timestamp.
export function toIST(createdAt) {
  return new Date(new Date(createdAt).getTime() + 5.5 * 60 * 60 * 1000);
}

export function formatLeadDate(createdAt) {
  if (!createdAt) return { date: "—", time: "" };
  const d = toIST(createdAt);
  return {
    date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true }),
  };
}

export function initials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase();
}
