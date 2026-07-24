const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

/**
 * Fetch current server metrics.
 * Returns a normalised object with numeric cpu/ram and raw uptime/os strings.
 */
export async function fetchMetrics() {
  const res = await fetch(`${BASE_URL}/api/metrics`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(8000),
  })

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  }

  const data = await res.json()

  // Normalise: strip '%' and convert to float
  const parsePercent = (val) =>
    typeof val === 'string' ? parseFloat(val.replace('%', '')) : Number(val)

  return {
    cpu:    parsePercent(data.cpu),
    ram:    parsePercent(data.ram),
    uptime: data.uptime ?? '—',
    os:     data.os     ?? 'Unknown',
    raw:    data,
  }
}
