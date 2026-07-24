import { Cpu, MemoryStick, Clock, MonitorDot, Activity, TrendingUp } from 'lucide-react'
import MetricCard   from '../components/ui/MetricCard'
import ProgressRing from '../components/ui/ProgressRing'
import GaugeBar     from '../components/ui/GaugeBar'
import HealthBadge  from '../components/ui/HealthBadge'
import UsageChart   from '../components/charts/UsageChart'
import CpuBarChart  from '../components/charts/CpuBarChart'
import RamLineChart from '../components/charts/RamLineChart'
import { SkeletonCard, SkeletonChart, SkeletonRing } from '../components/ui/SkeletonCard'
import { format } from 'date-fns'

export default function Dashboard({ metrics, history, status, loading, lastUpdated }) {
  // ── Overview cards ────────────────────────────────────────────────────────
  const prevCpu = history.length >= 2 ? history[history.length - 2]?.cpu : null
  const prevRam = history.length >= 2 ? history[history.length - 2]?.ram : null
  const cpuDelta = prevCpu != null ? (metrics?.cpu - prevCpu).toFixed(1) : null
  const ramDelta = prevRam != null ? (metrics?.ram - prevRam).toFixed(1) : null

  return (
    <main className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-8">

      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <p className="text-xs text-dim uppercase tracking-widest mb-1">Dashboard</p>
          <h1 className="text-2xl font-semibold text-bright">Overview</h1>
          {lastUpdated && (
            <p className="text-xs text-dim mt-1 font-mono">
              Last updated: {format(lastUpdated, 'PPpp')}
            </p>
          )}
        </div>
        {loading ? (
          <div className="skeleton h-9 w-48 rounded-xl" />
        ) : (
          <HealthBadge status={status} />
        )}
      </div>

      {/* ── KPI strip ───────────────────────────────────────────────────── */}
      <section>
        <SectionLabel icon={Activity} label="Live Metrics" />
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-3">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            <>
              <MetricCard
                label="CPU Usage" value={metrics?.cpu?.toFixed(1)} unit="%"
                icon={Cpu} color="blue"
                trend={cpuDelta != null ? `${Math.abs(cpuDelta)}%` : undefined}
                trendUp={cpuDelta < 0}
              />
              <MetricCard
                label="RAM Usage" value={metrics?.ram?.toFixed(1)} unit="%"
                icon={MemoryStick} color="cyan"
                trend={ramDelta != null ? `${Math.abs(ramDelta)}%` : undefined}
                trendUp={ramDelta < 0}
              />
              <MetricCard
                label="Uptime" value={metrics?.uptime} unit=""
                icon={Clock} color="emerald"
                subtext="Since last reboot"
              />
              <MetricCard
                label="Operating System" value={metrics?.os ?? '—'} unit=""
                icon={MonitorDot} color="indigo"
                subtext="Host platform"
              />
            </>
          )}
        </div>
      </section>

      {/* ── Radial rings + combined area chart ──────────────────────────── */}
      <section>
        <SectionLabel icon={TrendingUp} label="System Health" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-3">

          {/* Rings */}
          <div className="glass-card p-6 flex flex-col sm:flex-row lg:flex-col xl:flex-row
                          items-center justify-around gap-6 animate-in">
            {loading ? (
              <><SkeletonRing /><SkeletonRing /></>
            ) : (
              <>
                <div className="flex flex-col items-center gap-3">
                  <ProgressRing value={metrics?.cpu ?? 0} color="blue" label="CPU" />
                  <GaugeBar value={metrics?.cpu ?? 0} color="blue" className="w-40" />
                </div>
                <div className="w-px h-24 bg-border/50 hidden sm:block lg:hidden xl:block" />
                <div className="flex flex-col items-center gap-3">
                  <ProgressRing value={metrics?.ram ?? 0} color="cyan" label="RAM" />
                  <GaugeBar value={metrics?.ram ?? 0} color="cyan" className="w-40" />
                </div>
              </>
            )}
          </div>

          {/* Combined area chart */}
          <div className="lg:col-span-2 glass-card p-5 animate-in">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-light">CPU & RAM — Live</h3>
              <span className="text-[10px] font-mono text-dim">Last {history.length} polls</span>
            </div>
            {loading ? <div className="skeleton h-52 rounded-lg" /> : <UsageChart data={history} />}
          </div>
        </div>
      </section>

      {/* ── Historical detail charts ─────────────────────────────────────── */}
      <section>
        <SectionLabel icon={Activity} label="Historical Detail" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">

          <div className="glass-card p-5 animate-in">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-light">CPU Usage History</h3>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-accent">
                <span className="w-2 h-2 rounded-full bg-accent" />Bar chart
              </span>
            </div>
            {loading ? <div className="skeleton h-44 rounded-lg" /> : <CpuBarChart data={history} />}
          </div>

          <div className="glass-card p-5 animate-in">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-light">RAM Usage Trend</h3>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-cyan">
                <span className="w-2 h-2 rounded-full bg-cyan" />Line chart
              </span>
            </div>
            {loading ? <div className="skeleton h-44 rounded-lg" /> : <RamLineChart data={history} />}
          </div>
        </div>
      </section>

      {/* ── System info table ────────────────────────────────────────────── */}
      <section>
        <SectionLabel icon={MonitorDot} label="System Information" />
        <div className="glass-card mt-3 overflow-hidden animate-in">
          {loading ? (
            <div className="p-5 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton h-5 rounded" style={{ width: `${60 + i * 10}%` }} />
              ))}
            </div>
          ) : (
            <table className="w-full text-sm">
              <tbody>
                {[
                  ['Operating System', metrics?.os ?? '—'],
                  ['System Uptime',    metrics?.uptime ?? '—'],
                  ['CPU Utilisation',  `${metrics?.cpu?.toFixed(2) ?? '—'}%`],
                  ['RAM Utilisation',  `${metrics?.ram?.toFixed(2) ?? '—'}%`],
                  ['Health Status',    <HealthChip status={status} />],
                  ['Polling Interval', '5 seconds'],
                  ['Data Points',      `${history.length} / 30`],
                  ['API Endpoint',     <span className="font-mono text-accent text-xs">GET /api/metrics</span>],
                ].map(([key, val], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-surface/30' : ''}>
                    <td className="px-5 py-3 text-dim font-medium w-48 border-r border-border/30">{key}</td>
                    <td className="px-5 py-3 text-light font-mono text-xs">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  )
}

function SectionLabel({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} className="text-accent" />
      <span className="text-xs font-semibold uppercase tracking-widest text-dim">{label}</span>
    </div>
  )
}

function HealthChip({ status }) {
  const map = {
    healthy:  'text-emerald bg-emerald/10 border-emerald/20',
    warning:  'text-amber   bg-amber/10   border-amber/20',
    critical: 'text-rose    bg-rose/10    border-rose/20',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full
                      text-xs font-semibold border ${map[status] ?? map.healthy}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
