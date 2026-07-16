import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export default function ProgressChart({ logs }) {
  if (logs.length < 2) {
    return (
      <p className="page-hint">
        Sobald du mindestens zwei Einträge hast, siehst du hier deinen Fortschritt als Diagramm.
      </p>
    )
  }

  const data = [...logs]
    .sort((a, b) => a.logged_date.localeCompare(b.logged_date))
    .map((log) => ({ date: log.logged_date, weight: Number(log.weight_kg) }))

  return (
    <div className="progress-chart">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis unit=" kg" domain={['dataMin - 5', 'dataMax + 5']} />
          <Tooltip formatter={(value) => [`${value} kg`, 'Gewicht']} />
          <Line type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
