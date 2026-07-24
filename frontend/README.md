# ServerPulse — Server Monitoring Dashboard

A production-quality, cloud-style server monitoring dashboard built with **React + Vite + Tailwind CSS + Recharts**.

![Stack](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite) ![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss) ![Recharts](https://img.shields.io/badge/Recharts-2-8884d8)

---

## Features

| Feature | Detail |
|---------|--------|
| Dark mode | Default, void-black palette |
| Glassmorphism | Frosted-glass cards with `backdrop-blur` |
| Live polling | Fetches `/api/metrics` every **5 seconds** |
| Animated rings | SVG radial progress for CPU & RAM |
| Historical charts | Area, Bar, and Line charts (last 30 polls) |
| Health status | Healthy / Warning / Critical thresholds |
| Loading skeletons | Shimmer placeholders on first load |
| Error handling | Non-blocking banner with retry |
| Collapsible sidebar | Responsive on all screen sizes |
| Mobile-first | Works at 320 px and up |

---

## Prerequisites

- Node.js ≥ 18
- Your backend running at `http://localhost:5000`

---

## Quick Start

```bash
# 1 — Install dependencies
npm install

# 2 — Start the dev server (opens at http://localhost:3000)
npm run dev

# 3 — Build for production
npm run build

# 4 — Preview production build
npm run preview
```

---

## Environment Variables

Create a `.env` file in the project root to override the API URL:

```env
VITE_API_URL=http://localhost:5000
```

The Vite proxy (`/api → http://localhost:5000`) is already configured, so CORS is handled automatically in development.

---

## Project Structure

```
server-monitor/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── CpuBarChart.jsx      # Bar chart — CPU history
│   │   │   ├── RamLineChart.jsx     # Line chart — RAM trend
│   │   │   └── UsageChart.jsx       # Area chart — combined live view
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   └── ui/
│   │       ├── ErrorBanner.jsx      # Non-blocking error UI
│   │       ├── GaugeBar.jsx         # Horizontal progress bar
│   │       ├── HealthBadge.jsx      # Status pill
│   │       ├── MetricCard.jsx       # KPI stat card
│   │       ├── ProgressRing.jsx     # SVG radial ring
│   │       └── SkeletonCard.jsx     # Loading skeletons
│   ├── hooks/
│   │   └── useMetrics.js            # Polling logic + history state
│   ├── pages/
│   │   └── Dashboard.jsx            # Main page layout
│   ├── services/
│   │   └── api.js                   # fetch wrapper + normaliser
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## Health Thresholds

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| CPU    | < 65%   | 65–84%  | ≥ 85%    |
| RAM    | < 65%   | 65–84%  | ≥ 85%    |

The worst of CPU / RAM determines the overall status shown in the header and sidebar.

---

## Backend API Contract

```
GET http://localhost:5000/api/metrics
Content-Type: application/json

{
  "cpu":    "23.45%",
  "ram":    "67.12%",
  "uptime": "120 hours",
  "os":     "Ubuntu 22.04"
}
```

The frontend strips `%` and converts values to floats automatically.

---

## Deployment

```bash
npm run build
# Serve the dist/ folder with any static host (Nginx, Vercel, Netlify, S3+CloudFront)
```

For production, set `VITE_API_URL` to your backend's public URL.

---

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool & dev server
- **Tailwind CSS 3** — Utility-first styling
- **Recharts 2** — Chart library
- **Lucide React** — Icon set
- **date-fns** — Lightweight date formatting

---

MIT License © 2024 ServerPulse
