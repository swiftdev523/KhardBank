export function SkeletonBlock({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-lg bg-slate/10 ${className}`} />
  );
}

export function SkeletonCard() {
  return (
    <div className="card p-5">
      <SkeletonBlock className="h-4 w-24 mb-4" />
      <SkeletonBlock className="h-8 w-32 mb-2" />
      <SkeletonBlock className="h-3 w-20" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <SkeletonBlock className="h-3 w-16 mb-2" />
        <SkeletonBlock className="h-4 w-40" />
      </div>
      <SkeletonBlock className="h-4 w-16" />
    </div>
  );
}
