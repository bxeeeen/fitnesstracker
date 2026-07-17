import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatDateShort } from '../lib/dates'

const GRADIENT_FROM = '#5A7684'
const GRADIENT_TO = '#395B50'

function shiftDateByDays(isoDate, days) {
  const d = new Date(isoDate)
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export default function ProgressChart({ logs }) {
  if (logs.length === 0) {
    return (
      <p className="page-hint">
        Sobald du mindestens einen Eintrag hast, siehst du hier deinen Fortschritt als Diagramm.
      </p>
    )
  }

  const sorted = [...logs].sort((a, b) => a.logged_date.localeCompare(b.logged_date))
  const data =
    sorted.length === 1
      ? [
          { date: shiftDateByDays(sorted[0].logged_date, -1), weight: Number(sorted[0].weight_kg) },
          { date: sorted[0].logged_date, weight: Number(sorted[0].weight_kg) },
        ]
      : sorted.map((log) => ({ date: log.logged_date, weight: Number(log.weight_kg) }))

  return (
    <div className="card progress-chart">
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="progressStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={GRADIENT_FROM} />
              <stop offset="100%" stopColor={GRADIENT_TO} />
            </linearGradient>
            <linearGradient id="progressFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={GRADIENT_FROM} stopOpacity={0.35} />
              <stop offset="100%" stopColor={GRADIENT_TO} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" tickFormatter={formatDateShort} tick={{ fontSize: 10 }} />
          <YAxis unit=" kg" domain={['dataMin - 5', 'dataMax + 5']} tick={{ fontSize: 10 }} width={48} />
          <Tooltip
            formatter={(value) => [`${value} kg`, 'Gewicht']}
            labelFormatter={formatDateShort}
          />
          <Area
            type="monotone"
            dataKey="weight"
            stroke="url(#progressStroke)"
            strokeWidth={3}
            fill="url(#progressFill)"
            dot={{ stroke: GRADIENT_FROM, strokeWidth: 2, fill: '#fff', r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
