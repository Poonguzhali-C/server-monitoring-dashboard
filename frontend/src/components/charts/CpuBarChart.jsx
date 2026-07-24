import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-panel border border-border rounded-xl px-3 py-2 shadow-xl text-xs font-mono">
      <p className="text-dim mb-1">{label}</p>
      <p className="text-accent font-semibold">CPU: {payload[0]?.value?.toFixed(2)}%</p>
    </div>
  )
}

function barColor(val) {
  if (val >= 85) return '#f43f5e'
  if (val >= 65) return '#f59e0b'
  return '#3b82f6'
}

export default function CpuBarChart({ data }) {
  if (!data || data.length < 2) {
    return (
      <div className="h-44 flex items-center justify-center text-dim text-sm">
        Collecting data…
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={176}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }} barCategoryGap="30%">
        <CartesianGrid stroke="#1e2d45" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="time"
          tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'JetBrains Mono' }}
          tickLine={false} axisLine={false}
          interval={Math.max(1, Math.floor(data.length / 6) - 1)}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'JetBrains Mono' }}
          tickLine={false} axisLine={false}
          tickFormatter={v => `${v}%`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1e2d4533' }} />
        <Bar dataKey="cpu" radius={[3, 3, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={barColor(entry.cpu)} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
