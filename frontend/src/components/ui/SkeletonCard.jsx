export function SkeletonCard({ className = '' }) {
  return (
    <div className={`glass-card p-5 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="skeleton h-4 w-24 rounded" />
        <div className="skeleton h-8 w-8 rounded-lg" />
      </div>
      <div className="skeleton h-9 w-32 rounded mb-2" />
      <div className="skeleton h-2 w-full rounded-full" />
    </div>
  )
}

export function SkeletonChart({ className = '' }) {
  return (
    <div className={`glass-card p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="skeleton h-4 w-36 rounded" />
        <div className="skeleton h-4 w-20 rounded" />
      </div>
      <div className="skeleton h-48 w-full rounded-lg" />
    </div>
  )
}

export function SkeletonRing({ className = '' }) {
  return (
    <div className={`glass-card p-5 flex flex-col items-center gap-3 ${className}`}>
      <div className="skeleton h-4 w-24 rounded" />
      <div className="skeleton w-36 h-36 rounded-full" />
      <div className="skeleton h-4 w-16 rounded" />
    </div>
  )
}
