import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchMetrics } from '../services/api'
import { format } from 'date-fns'

const HISTORY_LIMIT = 30   // keep last 30 data points
const POLL_INTERVAL = 5000 // ms

function getHealthStatus(cpu, ram) {
  const max = Math.max(cpu, ram)
  if (max >= 85) return 'critical'
  if (max >= 65) return 'warning'
  return 'healthy'
}

export function useMetrics() {
  const [metrics,   setMetrics]   = useState(null)
  const [history,   setHistory]   = useState([])
  const [status,    setStatus]    = useState('healthy')
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const timerRef = useRef(null)

  const poll = useCallback(async () => {
    try {
      const data = await fetchMetrics()
      const now  = new Date()
      const point = {
        time: format(now, 'HH:mm:ss'),
        cpu:  data.cpu,
        ram:  data.ram,
      }

      setMetrics(data)
      setHistory(prev => [...prev.slice(-(HISTORY_LIMIT - 1)), point])
      setStatus(getHealthStatus(data.cpu, data.ram))
      setLastUpdated(now)
      setError(null)
    } catch (err) {
      setError(err.message || 'Failed to fetch metrics')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    poll()
    timerRef.current = setInterval(poll, POLL_INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [poll])

  const refresh = useCallback(() => {
    setLoading(true)
    poll()
  }, [poll])

  return { metrics, history, status, loading, error, lastUpdated, refresh }
}
