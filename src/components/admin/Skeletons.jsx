function Shimmer({ className = "" }) {
  return <div className={`animate-pulse bg-secondary/[0.06] dark:bg-white/[0.06] rounded-lg ${className}`} />;
}

export function KpiCardSkeleton() {
  return (
    <div className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark p-5">
      <div className="flex items-start justify-between">
        <Shimmer className="h-4 w-20" />
        <Shimmer className="h-9 w-9 rounded-xl" />
      </div>
      <Shimmer className="h-8 w-16 mt-4" />
      <Shimmer className="h-3 w-24 mt-3" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-2xl border border-secondary/10 dark:border-white/10 bg-card-light dark:bg-card-dark p-6">
      <Shimmer className="h-4 w-32 mb-2" />
      <Shimmer className="h-3 w-20 mb-6" />
      <Shimmer className="h-40 w-full" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-secondary/5 dark:border-white/5">
      <Shimmer className="h-4 w-8" />
      <Shimmer className="h-9 w-9 rounded-full" />
      <Shimmer className="h-4 w-32" />
      <Shimmer className="h-4 w-40 ml-auto" />
      <Shimmer className="h-4 w-20" />
      <Shimmer className="h-4 w-16" />
    </div>
  );
}
