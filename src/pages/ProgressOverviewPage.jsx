import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUserExercises } from '../hooks/useUserExercises'
import { useLatestLogs } from '../hooks/useLatestLogs'
import Sparkline from '../components/Sparkline'

export default function ProgressOverviewPage() {
  const { userExercises, loading, error } = useUserExercises()
  const { latestByExercise, logsByExercise, refetch: refetchLatest } = useLatestLogs()
  const location = useLocation()

  useEffect(() => {
    if (!location.state?.backgroundLocation) {
      refetchLatest()
    }
  }, [location])

  return (
    <div className="page">
      <div className="page-hero">
        <h1>Fortschritt</h1>
      </div>

      {loading && <p>Lade…</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && !error && userExercises.length === 0 && (
        <p className="page-hint">
          Du hast noch keine Geräte ausgewählt. <Link to="/geraete">Jetzt Geräte auswählen</Link>
        </p>
      )}

      <ul className="dashboard-list">
        {userExercises.map(({ exercise_id, exercises: exercise }) => {
          const latest = latestByExercise.get(exercise_id)
          const logs = logsByExercise.get(exercise_id) ?? []
          return (
            <li key={exercise_id}>
              <Link
                to={`/fortschritt/${exercise_id}`}
                state={{ backgroundLocation: location }}
                className="card progress-tile"
              >
                <div className="progress-tile-header">
                  <div>
                    <strong>{exercise.name}</strong>
                    <span className="dashboard-item-muscle">{exercise.muscle_group}</span>
                  </div>
                  {latest && <span className="progress-tile-weight">{latest.weight_kg} kg</span>}
                </div>
                <Sparkline logs={logs} />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
