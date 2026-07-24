import Header    from './components/layout/Header'
import Sidebar   from './components/layout/Sidebar'
import Footer    from './components/layout/Footer'
import Dashboard from './pages/Dashboard'
import ErrorBanner from './components/ui/ErrorBanner'
import { useMetrics } from './hooks/useMetrics'

export default function App() {
  const { metrics, history, status, loading, error, lastUpdated, refresh } = useMetrics()

  return (
    <div className="flex h-screen overflow-hidden bg-void text-bright">
      {/* Sidebar */}
      <Sidebar status={status} />

      {/* Main column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Header */}
        <Header
          status={status}
          lastUpdated={lastUpdated}
          loading={loading}
          onRefresh={refresh}
          error={error}
        />

        {/* Error banner (non-blocking) */}
        {error && <ErrorBanner message={error} onRetry={refresh} />}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <Dashboard
            metrics={metrics}
            history={history}
            status={status}
            loading={loading && !metrics}
            lastUpdated={lastUpdated}
          />
          <Footer />
        </div>
      </div>
    </div>
  )
}
