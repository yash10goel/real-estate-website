import { Search, Calendar, ArrowUpDown, Download, X, Tag, Loader2 } from "lucide-react";
import Dropdown, { DropdownItem } from "./Dropdown";

export const DATE_RANGES = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
];

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "id-asc", label: "ID Ascending" },
  { value: "id-desc", label: "ID Descending" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
];

export default function LeadFilters({
  search,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  subject,
  onSubjectChange,
  subjectOptions,
  sortBy,
  onSortByChange,
  onExportExcel,
  exporting,
  hasActiveFilters,
  onClearFilters,
}) {
  const dateLabel = DATE_RANGES.find((d) => d.value === dateRange)?.label || "All Time";
  const sortLabel = SORT_OPTIONS.find((s) => s.value === sortBy)?.label || "Newest First";

  return (
    <div className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark p-4">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/35 dark:text-white/35" />
          <input
            type="text"
            placeholder="Search by name, email, phone or subject..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-bg-light dark:bg-bg-dark border border-secondary/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-secondary dark:text-white placeholder:text-secondary/35 dark:placeholder:text-white/30 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Dropdown label={dateLabel} icon={Calendar}>
            {(close) => (
              <div className="py-1.5">
                {DATE_RANGES.map((d) => (
                  <DropdownItem
                    key={d.value}
                    active={dateRange === d.value}
                    onClick={() => {
                      onDateRangeChange(d.value);
                      close();
                    }}
                  >
                    {d.label}
                  </DropdownItem>
                ))}
              </div>
            )}
          </Dropdown>

          {subjectOptions.length > 0 && (
            <Dropdown label={subject === "all" ? "All Subjects" : subject} icon={Tag}>
              {(close) => (
                <div className="py-1.5 max-h-64 overflow-y-auto">
                  <DropdownItem
                    active={subject === "all"}
                    onClick={() => {
                      onSubjectChange("all");
                      close();
                    }}
                  >
                    All Subjects
                  </DropdownItem>
                  {subjectOptions.map((s) => (
                    <DropdownItem
                      key={s}
                      active={subject === s}
                      onClick={() => {
                        onSubjectChange(s);
                        close();
                      }}
                    >
                      {s}
                    </DropdownItem>
                  ))}
                </div>
              )}
            </Dropdown>
          )}

          <Dropdown label={sortLabel} icon={ArrowUpDown}>
            {(close) => (
              <div className="py-1.5">
                {SORT_OPTIONS.map((s) => (
                  <DropdownItem
                    key={s.value}
                    active={sortBy === s.value}
                    onClick={() => {
                      onSortByChange(s.value);
                      close();
                    }}
                  >
                    {s.label}
                  </DropdownItem>
                ))}
              </div>
            )}
          </Dropdown>

          <Dropdown label="Export" icon={exporting ? Loader2 : Download} align="right">
            {(close) => (
              <div className="py-1.5">
                <DropdownItem
                  onClick={() => {
                    onExportExcel();
                    close();
                  }}
                >
                  Export as Excel (.xlsx)
                </DropdownItem>
              </div>
            )}
          </Dropdown>
        </div>
      </div>

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-secondary/10 dark:border-white/10">
          {dateRange !== "all" && (
            <FilterChip label={`Date: ${dateLabel}`} onClear={() => onDateRangeChange("all")} />
          )}
          {subject !== "all" && <FilterChip label={`Subject: ${subject}`} onClear={() => onSubjectChange("all")} />}
          {search && <FilterChip label={`Search: "${search}"`} onClear={() => onSearchChange("")} />}
          <button
            onClick={onClearFilters}
            className="text-xs font-semibold text-primary hover:underline underline-offset-4 ml-1"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, onClear }) {
  return (
    <span className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
      {label}
      <button
        onClick={onClear}
        aria-label={`Remove filter: ${label}`}
        className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
      >
        <X size={10} />
      </button>
    </span>
  );
}
