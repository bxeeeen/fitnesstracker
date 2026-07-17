export default function ProgressStats({ logs }) {
  if (logs.length === 0) return null

  const sorted = [...logs].sort((a, b) => a.logged_date.localeCompare(b.logged_date))
  const first = sorted[0]
  const max = Math.max(...logs.map((l) => Number(l.weight_kg)))
  const change = Number(sorted[sorted.length - 1].weight_kg) - Number(first.weight_kg)

  return (
    <div className="stat-row">
      <div className="stat-card">
        <span className="stat-value">{max} kg</span>
        <span className="stat-label">Maximalgewicht</span>
      </div>
      <div className="stat-card">
        <span
          className={`stat-value${change > 0 ? ' stat-value-positive' : change < 0 ? ' stat-value-negative' : ''}`}
        >
          {change > 0 ? '+' : ''}
          {change.toFixed(1)} kg
        </span>
        <span className="stat-label">seit erstem Eintrag</span>
      </div>
      <div className="stat-card">
        <span className="stat-value">{logs.length}</span>
        <span className="stat-label">Einträge</span>
      </div>
    </div>
  )
}
