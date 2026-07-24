import { RefreshCw, Bell, Settings, Wifi, WifiOff } from 'lucide-react'
import { format } from 'date-fns'
import clsx from 'clsx'

const STATUS_CONFIG = {
  healthy:  { label: 'Healthy',  dot: 'bg-emerald animate-pulse', text: 'text-emerald' },
  warning:  { label: 'Warning',  dot: 'bg-amber  animate-pulse', text: 'text-amber'   },
  critical: { label: 'Critical', dot: 'bg-rose   animate-ping-slow', text: 'text-rose' },
}

export default function Header({ status, lastUpdated, loading, onRefresh, error }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.healthy

  return (
    <header className="sticky top-0 z-40 h-14 flex items-center gap-4 px-4 md:px-6
                       bg-abyss/80 backdrop-blur-md border-b border-border/50">
      {/* Logo — mobile only (desktop shown in sidebar) */}
      <div className="flex items-center gap-2 md:hidden">
        <PulseLogo />
        <span className="font-semibold text-bright text-sm tracking-tight">ServerPulse</span>
      </div>

      <div className="flex-1" />

      {/* Status pill */}
      <div className={clsx('status-pill hidden sm:inline-flex',
        status === 'healthy'  && 'bg-emerald/10 text-emerald border border-emerald/20',
        status === 'warning'  && 'bg-amber/10   text-amber   border border-amber/20',
        status === 'critical' && 'bg-rose/10    text-rose    border border-rose/20',
      )}>
        <span className={clsx('w-1.5 h-1.5 rounded-full', cfg.dot)} />
        {cfg.label}
      </div>

      {/* Last updated */}
      <div className="hidden md:flex items-center gap-1.5 text-xs text-dim font-mono">
        {error ? (
          <><WifiOff size={12} className="text-rose" /> Connection lost</>
        ) : (
          <><Wifi size={12} className="text-emerald" />
            {lastUpdated ? `Updated ${format(lastUpdated, 'HH:mm:ss')}` : 'Connecting…'}</>
        )}
      </div>

      {/* Refresh */}
      <button
        onClick={onRefresh}
        className="p-2 rounded-lg text-dim hover:text-bright hover:bg-surface
                   transition-all duration-200 active:scale-95"
        title="Refresh now"
      >
        <RefreshCw size={15} className={clsx(loading && 'animate-spin')} />
      </button>

      {/* Notifications */}
      <button className="p-2 rounded-lg text-dim hover:text-bright hover:bg-surface transition-all duration-200 relative">
        <Bell size={15} />
        {status !== 'healthy' && (
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose rounded-full" />
        )}
      </button>

      {/* Settings */}
      <button className="p-2 rounded-lg text-dim hover:text-bright hover:bg-surface transition-all duration-200">
        <Settings size={15} />
      </button>
    </header>
  )
}

function PulseLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4"  fill="#22d3ee"   className="animate-pulse-slow" />
    </svg>
  )
}
