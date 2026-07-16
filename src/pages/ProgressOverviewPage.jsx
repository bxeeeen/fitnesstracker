import { Link } from 'react-router-dom'
import { useUserExercises } from '../hooks/useUserExercises'
import { useLatestLogs } from '../hooks/useLatestLogs'

export default function ProgressOverviewPage() {
  const { userExercises, loading, error } = useUserExercises()
  const { latestByExercise } = useLatestLogs()

  return (
    <div className="page">
      <h1>Fortschritt</h1>

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
            <li key={exercise_id}>
              <Link to={`/fortschritt/${exercise_id}`} className="card dashboard-item">
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
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
