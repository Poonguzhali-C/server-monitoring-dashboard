import clsx from 'clsx'

/**
 * Compact stat card used in the overview strip.
 * Props:
 *   label    — string
 *   value    — string | number
 *   unit     — string  (e.g. '%')
 *   icon     — Lucide React component
 *   color    — 'blue' | 'cyan' | 'emerald' | 'amber' | 'rose'
 *   trend    — '+2.1%' style string (optional)
 *   trendUp  — bool (green if true, red if false)
 *   subtext  — string (optional)
 */
const COLOR = {
  blue:    { bg: 'bg-accent/10',   border: 'border-accent/20',   text: 'text-accent',   icon: 'bg-accent/15'   },
  cyan:    { bg: 'bg-cyan/10',     border: 'border-cyan/20',     text: 'text-cyan',     icon: 'bg-cyan/15'     },
  emerald: { bg: 'bg-emerald/10',  border: 'border-emerald/20',  text: 'text-emerald',  icon: 'bg-emerald/15'  },
  amber:   { bg: 'bg-amber/10',    border: 'border-amber/20',    text: 'text-amber',    icon: 'bg-amber/15'    },
  rose:    { bg: 'bg-rose/10',     border: 'border-rose/20',     text: 'text-rose',     icon: 'bg-rose/15'     },
  indigo:  { bg: 'bg-accent2/10',  border: 'border-accent2/20',  text: 'text-accent2',  icon: 'bg-accent2/15'  },
}

export default function MetricCard({
  label, value, unit = '', icon: Icon, color = 'blue',
  trend, trendUp, subtext, className = '',
}) {
  const c = COLOR[color] ?? COLOR.blue

  return (
    <div className={clsx(
      'glass-card p-5 group hover:border-accent/30 transition-all duration-300 animate-in',
      className,
    )}>
      <div className="flex items-start justify-between mb-4">
        <p className="text-xs text-dim uppercase tracking-widest font-medium">{label}</p>
        <div className={clsx('p-2 rounded-lg', c.icon)}>
          {Icon && <Icon size={16} className={c.text} />}
        </div>
      </div>

      <div className="flex items-end gap-1 mb-3">
        <span className={clsx('metric-value', c.text)}>{value}</span>
        {unit && <span className="text-dim text-sm mb-1">{unit}</span>}
      </div>

      {subtext && <p className="text-xs text-dim mb-2 truncate">{subtext}</p>}

      {trend && (
        <p className={clsx(
          'text-xs font-medium',
          trendUp  ? 'text-emerald' : 'text-rose',
        )}>
          {trendUp ? '↑' : '↓'} {trend}{' '}
          <span className="text-dim font-normal">vs last poll</span>
        </p>
      )}
    </div>
  )
}
