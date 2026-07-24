import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-panel border border-border rounded-xl px-3 py-2.5 shadow-xl text-xs font-mono">
      <p className="text-dim mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.stroke }}>
          {p.name}: <span className="font-semibold">{p.value?.toFixed(2)}%</span>
        </p>
      ))}
    </div>
  )
}

export default function UsageChart({ data }) {
  if (!data || data.length < 2) {
    return (
      <div className="h-52 flex items-center justify-center text-dim text-sm">
        Collecting data…
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={210}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
        <defs>
          <linearGradient id="gradCpu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}    />
          </linearGradient>
          <linearGradient id="gradRam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#22d3ee" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}    />
          </linearGradient>
        </defs>

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

        <Legend
          wrapperStyle={{ fontSize: '11px', paddingTop: '8px', color: '#94a3b8' }}
          formatter={(val) => val.toUpperCase()}
        />

        <Area type="monotone" dataKey="cpu" name="CPU"
          stroke="#3b82f6" strokeWidth={2}
          fill="url(#gradCpu)" dot={false} activeDot={{ r: 4, fill: '#3b82f6' }}
        />
        <Area type="monotone" dataKey="ram" name="RAM"
          stroke="#22d3ee" strokeWidth={2}
          fill="url(#gradRam)" dot={false} activeDot={{ r: 4, fill: '#22d3ee' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
