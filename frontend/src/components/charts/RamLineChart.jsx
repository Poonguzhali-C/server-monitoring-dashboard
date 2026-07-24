import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-panel border border-border rounded-xl px-3 py-2 shadow-xl text-xs font-mono">
      <p className="text-dim mb-1">{label}</p>
      <p className="text-cyan font-semibold">RAM: {payload[0]?.value?.toFixed(2)}%</p>
    </div>
  )
}

export default function RamLineChart({ data }) {
  if (!data || data.length < 2) {
    return (
      <div className="h-44 flex items-center justify-center text-dim text-sm">
        Collecting data…
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={176}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
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
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={85} stroke="#f43f5e" strokeDasharray="4 4" strokeWidth={1}
          label={{ value: 'Critical', fill: '#f43f5e', fontSize: 9 }} />
        <ReferenceLine y={65} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth={1}
          label={{ value: 'Warning', fill: '#f59e0b', fontSize: 9 }} />
        <Line
          type="monotone" dataKey="ram"
          stroke="#22d3ee" strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: '#22d3ee', stroke: '#0d1320' }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
