import { AlertTriangle, X, RefreshCw } from 'lucide-react'
import { useState } from 'react'

export default function ErrorBanner({ message, onRetry }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="mx-4 md:mx-6 mt-4 flex items-start gap-3 px-4 py-3 rounded-xl
                    bg-rose/10 border border-rose/25 text-rose animate-in">
      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">Connection error</p>
        <p className="text-xs text-rose/70 mt-0.5 break-all">{message}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onRetry}
          className="flex items-center gap-1 text-xs text-rose/80 hover:text-rose
                     transition-colors px-2 py-1 rounded bg-rose/10 hover:bg-rose/20"
        >
          <RefreshCw size={11} /> Retry
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 hover:text-rose/60 transition-colors"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
