const WIDTH = 240
const HEIGHT = 56
const PADDING = 6

export default function Sparkline({ logs }) {
  if (!logs || logs.length === 0) {
    return (
      <div className="sparkline sparkline-empty">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none">
          <line
            x1={PADDING}
            y1={HEIGHT / 2}
            x2={WIDTH - PADDING}
            y2={HEIGHT / 2}
            strokeDasharray="4 5"
          />
        </svg>
        <span>Noch keine Daten geloggt</span>
      </div>
    )
  }

  if (logs.length === 1) {
    return (
      <div className="sparkline">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none">
          <circle cx={WIDTH / 2} cy={HEIGHT / 2} r="4" />
        </svg>
      </div>
    )
  }

  const weights = logs.map((l) => Number(l.weight_kg))
  const min = Math.min(...weights)
  const max = Math.max(...weights)
  const range = max - min || 1

  const points = logs.map((log, i) => {
    const x = PADDING + (i / (logs.length - 1)) * (WIDTH - PADDING * 2)
    const y = HEIGHT - PADDING - ((Number(log.weight_kg) - min) / range) * (HEIGHT - PADDING * 2)
    return `${x},${y}`
  })

  const areaPoints = `${PADDING},${HEIGHT} ${points.join(' ')} ${WIDTH - PADDING},${HEIGHT}`

  return (
    <div className="sparkline">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sparklineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5A7684" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#395B50" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#sparklineFill)" stroke="none" />
        <polyline points={points.join(' ')} fill="none" />
      </svg>
    </div>
  )
}
