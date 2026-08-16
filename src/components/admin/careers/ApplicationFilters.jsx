import { Search, Briefcase, Tag, Calendar, X } from "lucide-react";
import Dropdown, { DropdownItem } from "../Dropdown";
import { STATUSES } from "../../../static-data/applicationStatus";

export const DATE_RANGES = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
];

export default function ApplicationFilters({
  search,
  onSearchChange,
  job,
  onJobChange,
  jobOptions,
  status,
  onStatusChange,
  dateRange,
  onDateRangeChange,
  hasActiveFilters,
  onClearFilters,
}) {
  const dateLabel = DATE_RANGES.find((d) => d.value === dateRange)?.label || "All Time";

  return (
    <div className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark p-4">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1 min-w-0">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/35 dark:text-white/35" />
          <input
            type="text"
            placeholder="Search by candidate name, email or job title..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-bg-light dark:bg-bg-dark border border-secondary/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-secondary dark:text-white placeholder:text-secondary/35 dark:placeholder:text-white/30 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {jobOptions.length > 0 && (
            <Dropdown label={job === "all" ? "All Jobs" : job} icon={Briefcase}>
              {(close) => (
                <div className="py-1.5 max-h-64 overflow-y-auto">
                  <DropdownItem active={job === "all"} onClick={() => { onJobChange("all"); close(); }}>
                    All Jobs
                  </DropdownItem>
                  {jobOptions.map((j) => (
                    <DropdownItem key={j} active={job === j} onClick={() => { onJobChange(j); close(); }}>
                      {j}
                    </DropdownItem>
                  ))}
                </div>
              )}
            </Dropdown>
          )}

          <Dropdown label={status === "all" ? "All Statuses" : status} icon={Tag}>
            {(close) => (
              <div className="py-1.5">
                <DropdownItem active={status === "all"} onClick={() => { onStatusChange("all"); close(); }}>
                  All Statuses
                </DropdownItem>
                {STATUSES.map((s) => (
                  <DropdownItem key={s.value} active={status === s.value} onClick={() => { onStatusChange(s.value); close(); }}>
                    {s.value}
                  </DropdownItem>
                ))}
              </div>
            )}
          </Dropdown>

          <Dropdown label={dateLabel} icon={Calendar} align="right">
            {(close) => (
              <div className="py-1.5">
                {DATE_RANGES.map((d) => (
                  <DropdownItem key={d.value} active={dateRange === d.value} onClick={() => { onDateRangeChange(d.value); close(); }}>
                    {d.label}
                  </DropdownItem>
                ))}
              </div>
            )}
          </Dropdown>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-secondary/10 dark:border-white/10">
          {search && <Chip label={`Search: "${search}"`} onClear={() => onSearchChange("")} />}
          {job !== "all" && <Chip label={`Job: ${job}`} onClear={() => onJobChange("all")} />}
          {status !== "all" && <Chip label={`Status: ${status}`} onClear={() => onStatusChange("all")} />}
          {dateRange !== "all" && <Chip label={`Date: ${dateLabel}`} onClear={() => onDateRangeChange("all")} />}
          <button onClick={onClearFilters} className="text-xs font-semibold text-primary hover:underline underline-offset-4 ml-1">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

function Chip({ label, onClear }) {
  return (
    <span className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
      {label}
      <button onClick={onClear} aria-label={`Remove filter: ${label}`} className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
        <X size={10} />
      </button>
    </span>
  );
}
