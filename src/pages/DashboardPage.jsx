import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useUserExercises } from '../hooks/useUserExercises'
import { useLatestLogs } from '../hooks/useLatestLogs'
import { useTrainingDays } from '../hooks/useTrainingDays'
import { getGreeting } from '../lib/greetings'
import { getTodaysSplit, getNextTrainingDay } from '../lib/trainingSchedule'
import { formatDateShort, formatTimeShort, WEEKDAY_LABELS_SHORT } from '../lib/dates'
import EmptyState from '../components/EmptyState'
import Spinner from '../components/Spinner'

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
)

export default function DashboardPage() {
  const { profile } = useAuth()
  const { userExercises, loading, error } = useUserExercises()
  const { latestByExercise, refetch: refetchLatest } = useLatestLogs()
  const { trainingDays } = useTrainingDays()
  const location = useLocation()
  const [now, setNow] = useState(() => new Date())

  // Home bleibt hinter Log-/Fortschritt-Overlays durchgehend gemountet, darum
  // hier neu laden, sobald kein Overlay mehr offen ist (z.B. nach dem Loggen).
  useEffect(() => {
    if (!location.state?.backgroundLocation) {
      refetchLatest()
    }
  }, [location])

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  const todaysSplit = useMemo(() => getTodaysSplit(trainingDays, now), [trainingDays, now])
  const nextTrainingDay = useMemo(() => getNextTrainingDay(trainingDays, now), [trainingDays, now])
  const { greeting, subtitle: fallbackSubtitle } = useMemo(
    () => getGreeting(profile?.name, now),
    [profile?.name, now]
  )
  const subtitle = todaysSplit?.split_label ? `Heute: ${todaysSplit.split_label}` : fallbackSubtitle

  return (
    <div className="page">
      <div className="greeting-card">
        <h1>{greeting}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="home-info-pills">
        <span className="info-pill">{formatTimeShort(now)} Uhr</span>
        <span className="info-pill">{formatDateShort(now.toISOString().slice(0, 10))}</span>
        {nextTrainingDay && (
          <span className="info-pill">
            Nächstes Training: {WEEKDAY_LABELS_SHORT[nextTrainingDay.weekday - 1]}
            {nextTrainingDay.split_label ? ` · ${nextTrainingDay.split_label}` : ''}
          </span>
        )}
      </div>

      {loading && (
        <div className="page-loading">
          <Spinner />
        </div>
      )}
      {error && <p className="form-error">{error}</p>}

      {!loading && !error && userExercises.length === 0 && <EmptyState />}

      <ul className="dashboard-list">
        {userExercises.map(({ exercise_id, exercises: exercise }) => {
          const latest = latestByExercise.get(exercise_id)
          return (
            <li key={exercise_id} className="card dashboard-item">
              <div className="dashboard-item-info">
                <strong>{exercise.name}</strong>
                <span className="dashboard-item-muscle">{exercise.muscle_group}</span>
                {latest ? (
                  <span className="dashboard-item-latest">
                    Letztes Gewicht: {latest.weight_kg} kg ({formatDateShort(latest.logged_date)})
                  </span>
                ) : (
                  <span className="dashboard-item-latest">Noch keine Einträge</span>
                )}
              </div>
              <div className="dashboard-item-actions">
                <Link
                  to={`/log/${exercise_id}`}
                  state={{ backgroundLocation: location }}
                  className="dashboard-log-btn"
                  aria-label={`${exercise.name} loggen`}
                >
                  <PlusIcon />
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
