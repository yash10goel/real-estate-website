import { Inbox } from "lucide-react";

export default function EmptyState({ hasFilters, onClearFilters }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-16 h-16 rounded-2xl bg-secondary/5 dark:bg-white/5 flex items-center justify-center mb-5">
        <Inbox size={26} className="text-secondary/30 dark:text-white/30" />
      </div>
      <h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-1.5">
        No leads found
      </h3>
      <p className="text-sm text-secondary/50 dark:text-white/50 max-w-xs">
        {hasFilters
          ? "Try adjusting your search or filters."
          : "New website enquiries will show up here as they come in."}
      </p>
      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="mt-5 text-sm font-semibold text-primary hover:underline underline-offset-4"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
