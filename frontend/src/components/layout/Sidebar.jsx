import { useState } from 'react'
import {
  LayoutDashboard, Activity, Server, Cpu, HardDrive,
  BarChart2, Bell, Settings, ChevronLeft, ChevronRight,
} from 'lucide-react'
import clsx from 'clsx'

const NAV = [
  { icon: LayoutDashboard, label: 'Overview',   id: 'overview',   active: true  },
  { icon: Activity,         label: 'Live Metrics', id: 'metrics'  },
  { icon: Cpu,              label: 'CPU',          id: 'cpu'       },
  { icon: HardDrive,        label: 'Memory',       id: 'memory'    },
  { icon: Server,           label: 'System',       id: 'system'    },
  { icon: BarChart2,        label: 'History',      id: 'history'   },
]

const BOTTOM_NAV = [
  { icon: Bell,     label: 'Alerts',   id: 'alerts'   },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

export default function Sidebar({ status }) {
  const [collapsed, setCollapsed] = useState(false)
  const [active, setActive]       = useState('overview')

  return (
    <aside className={clsx(
      'hidden md:flex flex-col shrink-0 h-screen sticky top-0',
      'bg-abyss border-r border-border/50 transition-all duration-300 ease-in-out',
      collapsed ? 'w-16' : 'w-56',
    )}>
      {/* Brand */}
      <div className={clsx(
        'flex items-center gap-3 h-14 px-4 border-b border-border/50',
        collapsed && 'justify-center px-0',
      )}>
        <LogoIcon />
        {!collapsed && (
          <div>
            <span className="font-semibold text-bright text-sm tracking-tight">ServerPulse</span>
            <div className="text-[10px] text-dim font-mono uppercase tracking-widest">Monitor</div>
          </div>
        )}
      </div>

      {/* Environment badge */}
      {!collapsed && (
        <div className="mx-3 mt-3 px-3 py-2 rounded-lg bg-surface border border-border/50">
          <div className="text-[10px] text-dim uppercase tracking-widest mb-0.5">Environment</div>
          <div className="flex items-center gap-2">
            <span className={clsx('w-1.5 h-1.5 rounded-full',
              status === 'healthy'  && 'bg-emerald',
              status === 'warning'  && 'bg-amber',
              status === 'critical' && 'bg-rose',
            )} />
            <span className="text-xs text-light font-mono">production-01</span>
          </div>
        </div>
      )}

      {/* Nav section */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        {!collapsed && (
          <p className="px-3 mb-2 text-[10px] uppercase tracking-widest text-dim">Main</p>
        )}
        {NAV.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={clsx('nav-item w-full', active === id && 'active', collapsed && 'justify-center px-0')}
            title={collapsed ? label : undefined}
          >
            <Icon size={16} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="px-2 pb-4 space-y-0.5 border-t border-border/50 pt-3">
        {BOTTOM_NAV.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={clsx('nav-item w-full', active === id && 'active', collapsed && 'justify-center px-0')}
            title={collapsed ? label : undefined}
          >
            <Icon size={16} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(c => !c)}
          className={clsx('nav-item w-full mt-1', collapsed && 'justify-center px-0')}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight size={16} />
            : <><ChevronLeft size={16} /><span>Collapse</span></>}
        </button>
      </div>
    </aside>
  )
}

function LogoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="shrink-0">
      <rect width="28" height="28" rx="7" fill="#0d1320" />
      <circle cx="14" cy="14" r="9" stroke="#3b82f6" strokeWidth="1.5" />
      <circle cx="14" cy="14" r="4" fill="#22d3ee" className="animate-pulse-slow" />
    </svg>
  )
}
