import clsx from 'clsx'
import { CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react'

const CONFIG = {
  healthy:  { Icon: CheckCircle2,  label: 'All Systems Healthy',  bg: 'bg-emerald/10', border: 'border-emerald/25', text: 'text-emerald', dot: 'bg-emerald' },
  warning:  { Icon: AlertTriangle, label: 'Performance Warning',  bg: 'bg-amber/10',   border: 'border-amber/25',   text: 'text-amber',   dot: 'bg-amber'   },
  critical: { Icon: AlertOctagon,  label: 'Critical — High Load', bg: 'bg-rose/10',    border: 'border-rose/25',    text: 'text-rose',    dot: 'bg-rose'    },
}

export default function HealthBadge({ status, className = '' }) {
  const c = CONFIG[status] ?? CONFIG.healthy
  const { Icon } = c

  return (
    <div className={clsx(
      'inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border',
      c.bg, c.border, className,
    )}>
      <span className={clsx('w-2 h-2 rounded-full animate-pulse', c.dot)} />
      <Icon size={15} className={c.text} />
      <span className={clsx('text-sm font-semibold', c.text)}>{c.label}</span>
    </div>
  )
}
