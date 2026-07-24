export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-4 px-6 flex flex-col sm:flex-row
                       items-center justify-between gap-2 text-xs text-dim">
      <span className="font-mono">
        ServerPulse <span className="text-accent">v1.0.0</span>
      </span>
      <span>
        Polling every <span className="text-subtle font-mono">5s</span> · Data via{' '}
        <span className="text-subtle font-mono">localhost:5000</span>
      </span>
      <span>
        © {new Date().getFullYear()} ServerPulse · MIT License
      </span>
    </footer>
  )
}
