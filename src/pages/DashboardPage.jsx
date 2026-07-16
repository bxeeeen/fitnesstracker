import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useUserExercises } from '../hooks/useUserExercises'
import { useLatestLogs } from '../hooks/useLatestLogs'
import { getGreeting } from '../lib/greetings'

export default function DashboardPage() {
  const { profile } = useAuth()
  const { userExercises, loading, error } = useUserExercises()
  const { latestByExercise } = useLatestLogs()

  const { greeting, subtitle } = useMemo(() => getGreeting(profile?.name), [profile?.name])

  return (
    <div className="page">
      <div className="greeting-header">
        <h1>{greeting}</h1>
        <p>{subtitle}</p>
      </div>

      {loading && <p>Lade…</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && !error && userExercises.length === 0 && (
        <p className="page-hint">
          Du hast noch keine Geräte ausgewählt. <Link to="/ich/geraete">Jetzt Geräte auswählen</Link>
        </p>
      )}

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
                    Letztes Gewicht: {latest.weight_kg} kg ({latest.logged_date})
                  </span>
                ) : (
                  <span className="dashboard-item-latest">Noch keine Einträge</span>
                )}
              </div>
              <div className="dashboard-item-actions">
                <Link to={`/log/${exercise_id}`} className="btn btn-primary">
                  Loggen
                </Link>
                <Link to={`/fortschritt/${exercise_id}`} className="btn btn-secondary">
                  Fortschritt
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
