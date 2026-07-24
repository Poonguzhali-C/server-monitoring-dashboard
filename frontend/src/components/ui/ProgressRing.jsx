import clsx from 'clsx'

/**
 * SVG animated radial progress ring.
 * Props: value (0-100), size, strokeWidth, color ('blue'|'cyan'|'emerald'|'amber'|'rose'), label
 */
const STROKE_COLOR = {
  blue:    '#3b82f6',
  cyan:    '#22d3ee',
  emerald: '#10b981',
  amber:   '#f59e0b',
  rose:    '#f43f5e',
}
const GLOW_CLASS = {
  blue:    'ring-glow-blue',
  cyan:    'ring-glow-cyan',
  emerald: 'ring-glow-green',
  amber:   'ring-glow-green',
  rose:    'ring-glow-red',
}
const TEXT_COLOR = {
  blue:    'text-accent',
  cyan:    'text-cyan',
  emerald: 'text-emerald',
  amber:   'text-amber',
  rose:    'text-rose',
}

export default function ProgressRing({
  value = 0,
  size  = 160,
  strokeWidth = 10,
  color = 'blue',
  label = '',
  subLabel = '',
}) {
  const radius = (size - strokeWidth) / 2
  const circ   = 2 * Math.PI * radius
  const offset = circ - (value / 100) * circ

  // derive color by value if not forced
  const resolvedColor = value >= 85 ? 'rose'
                      : value >= 65 ? 'amber'
                      : color

  return (
    <div className="flex flex-col items-center gap-2 animate-in">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Track */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke="#1e2d45"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke={STROKE_COLOR[resolvedColor]}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            className={clsx(GLOW_CLASS[resolvedColor], 'transition-all duration-700 ease-out')}
          />
        </svg>

        {/* Centre text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={clsx('font-mono font-semibold text-2xl tabular-nums', TEXT_COLOR[resolvedColor])}>
            {value.toFixed(1)}
          </span>
          <span className="text-dim text-xs mt-0.5">%</span>
        </div>
      </div>
      {label    && <p className="text-sm font-medium text-light">{label}</p>}
      {subLabel && <p className="text-xs text-dim">{subLabel}</p>}
    </div>
  )
}
