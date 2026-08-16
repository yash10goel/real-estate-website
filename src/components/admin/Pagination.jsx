import { ChevronLeft, ChevronRight } from "lucide-react";

const ROWS_PER_PAGE_OPTIONS = [6, 10, 25, 50];

function pageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, 2, total - 1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const withGaps = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) withGaps.push("…");
    withGaps.push(p);
  });
  return withGaps;
}

export default function Pagination({ currentPage, totalPages, totalItems, rowsPerPage, onPageChange, onRowsPerPageChange, itemLabel = "leads" }) {
  const from = totalItems === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const to = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1 py-2">
      <div className="flex items-center gap-3 text-sm text-secondary/50 dark:text-white/50 order-2 sm:order-1">
        <span>
          Showing <span className="font-semibold text-secondary dark:text-white">{from}–{to}</span> of{" "}
          <span className="font-semibold text-secondary dark:text-white">{totalItems}</span> {itemLabel}
        </span>
        <label className="hidden sm:flex items-center gap-1.5">
          <span className="text-secondary/40 dark:text-white/40">Rows:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="bg-transparent border border-secondary/10 dark:border-white/10 rounded-lg px-2 py-1 text-secondary dark:text-white outline-none focus:border-primary/50"
          >
            {ROWS_PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex items-center gap-1 order-1 sm:order-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary/60 dark:text-white/60 hover:bg-secondary/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronLeft size={16} />
        </button>

        {pageList(currentPage, totalPages || 1).map((p, i) =>
          p === "…" ? (
            <span key={`gap-${i}`} className="w-8 h-8 flex items-center justify-center text-secondary/30 dark:text-white/30 text-sm">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              aria-current={p === currentPage ? "page" : undefined}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                p === currentPage
                  ? "bg-primary text-secondary"
                  : "text-secondary/60 dark:text-white/60 hover:bg-secondary/5 dark:hover:bg-white/5"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary/60 dark:text-white/60 hover:bg-secondary/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
