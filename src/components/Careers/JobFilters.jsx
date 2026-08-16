import { Search, Building2, MapPin, Briefcase, ArrowUpDown, X } from "lucide-react";
import Dropdown, { DropdownItem } from "../admin/Dropdown";

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "experience", label: "Experience" },
];

export default function JobFilters({
  search,
  onSearchChange,
  department,
  onDepartmentChange,
  departments,
  location,
  onLocationChange,
  locations,
  type,
  onTypeChange,
  types,
  sortBy,
  onSortByChange,
  hasActiveFilters,
  onClearFilters,
}) {
  return (
    <div className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark p-4">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
        <div className="relative flex-1 min-w-0">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary/35 dark:text-white/35" />
          <input
            type="text"
            placeholder="Search jobs by title, skill or keyword"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-bg-light dark:bg-bg-dark border border-secondary/10 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-secondary dark:text-white placeholder:text-secondary/35 dark:placeholder:text-white/30 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-200"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {departments.length > 0 && (
            <Dropdown label={department === "all" ? "Department" : department} icon={Building2}>
              {(close) => (
                <div className="py-1.5">
                  <DropdownItem active={department === "all"} onClick={() => { onDepartmentChange("all"); close(); }}>
                    All Departments
                  </DropdownItem>
                  {departments.map((d) => (
                    <DropdownItem key={d} active={department === d} onClick={() => { onDepartmentChange(d); close(); }}>
                      {d}
                    </DropdownItem>
                  ))}
                </div>
              )}
            </Dropdown>
          )}

          {locations.length > 0 && (
            <Dropdown label={location === "all" ? "Location" : location} icon={MapPin}>
              {(close) => (
                <div className="py-1.5">
                  <DropdownItem active={location === "all"} onClick={() => { onLocationChange("all"); close(); }}>
                    All Locations
                  </DropdownItem>
                  {locations.map((l) => (
                    <DropdownItem key={l} active={location === l} onClick={() => { onLocationChange(l); close(); }}>
                      {l}
                    </DropdownItem>
                  ))}
                </div>
              )}
            </Dropdown>
          )}

          {types.length > 0 && (
            <Dropdown label={type === "all" ? "Type" : type} icon={Briefcase}>
              {(close) => (
                <div className="py-1.5">
                  <DropdownItem active={type === "all"} onClick={() => { onTypeChange("all"); close(); }}>
                    All Types
                  </DropdownItem>
                  {types.map((t) => (
                    <DropdownItem key={t} active={type === t} onClick={() => { onTypeChange(t); close(); }}>
                      {t}
                    </DropdownItem>
                  ))}
                </div>
              )}
            </Dropdown>
          )}

          <Dropdown label={SORT_OPTIONS.find((s) => s.value === sortBy)?.label || "Newest"} icon={ArrowUpDown} align="right">
            {(close) => (
              <div className="py-1.5">
                {SORT_OPTIONS.map((s) => (
                  <DropdownItem key={s.value} active={sortBy === s.value} onClick={() => { onSortByChange(s.value); close(); }}>
                    {s.label}
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
          {department !== "all" && <Chip label={`Department: ${department}`} onClear={() => onDepartmentChange("all")} />}
          {location !== "all" && <Chip label={`Location: ${location}`} onClear={() => onLocationChange("all")} />}
          {type !== "all" && <Chip label={`Type: ${type}`} onClear={() => onTypeChange("all")} />}
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
