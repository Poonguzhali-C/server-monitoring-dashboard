/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand palette
        'void':    '#080c14',
        'abyss':   '#0d1320',
        'panel':   '#111827',
        'surface': '#1a2235',
        'border':  '#1e2d45',
        'muted':   '#2a3a55',
        'accent':  '#3b82f6',
        'accent2': '#6366f1',
        'cyan':    '#22d3ee',
        'emerald': '#10b981',
        'amber':   '#f59e0b',
        'rose':    '#f43f5e',
        'dim':     '#64748b',
        'subtle':  '#94a3b8',
        'light':   '#cbd5e1',
        'bright':  '#e2e8f0',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow':  'spin 3s linear infinite',
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-up':   'slideUp 0.4s ease-out',
        'ping-slow':  'ping 2s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: 0 },              '100%': { opacity: 1 } },
        slideUp: { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        'glow-blue':    '0 0 20px rgba(59,130,246,0.3)',
        'glow-cyan':    '0 0 20px rgba(34,211,238,0.3)',
        'glow-emerald': '0 0 20px rgba(16,185,129,0.3)',
        'glow-rose':    '0 0 20px rgba(244,63,94,0.3)',
        'glass':        '0 8px 32px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
