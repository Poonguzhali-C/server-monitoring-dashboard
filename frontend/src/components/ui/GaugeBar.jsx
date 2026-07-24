import clsx from 'clsx'

export default function GaugeBar({ value = 0, color = 'blue', className = '' }) {
  const resolvedColor = value >= 85 ? 'rose' : value >= 65 ? 'amber' : color
  const BG = {
    blue:    'from-accent to-cyan',
    cyan:    'from-cyan to-accent',
    emerald: 'from-emerald to-cyan',
    amber:   'from-amber to-rose',
    rose:    'from-rose to-pink-500',
  }

  return (
    <div className={clsx('w-full h-2 bg-muted rounded-full overflow-hidden', className)}>
      <div
        className={clsx('h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out', BG[resolvedColor])}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  )
}
