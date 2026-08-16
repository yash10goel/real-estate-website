import { AlertTriangle } from "lucide-react";

export default function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-5">
        <AlertTriangle size={26} className="text-red-500" />
      </div>
      <h3 className="font-heading text-lg font-bold text-secondary dark:text-white mb-1.5">
        Unable to load leads
      </h3>
      <p className="text-sm text-secondary/50 dark:text-white/50 max-w-xs">
        Something went wrong while fetching your enquiries.
      </p>
      <button
        onClick={onRetry}
        className="mt-5 px-5 py-2.5 rounded-xl bg-primary text-secondary text-sm font-semibold hover:shadow-glow transition-shadow"
      >
        Try Again
      </button>
    </div>
  );
}
