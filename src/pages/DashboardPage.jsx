import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useUserExercises } from '../hooks/useUserExercises'

export default function DashboardPage() {
  const { user } = useAuth()
  const { userExercises, loading, error } = useUserExercises()
  const [latestLogs, setLatestLogs] = useState([])

  useEffect(() => {
    if (!user) return
    supabase
      .from('workout_logs')
      .select('exercise_id, weight_kg, logged_date')
      .eq('user_id', user.id)
      .order('logged_date', { ascending: false })
      .then(({ data }) => setLatestLogs(data ?? []))
  }, [user])

  const latestByExercise = useMemo(() => {
    const map = new Map()
    for (const log of latestLogs) {
      if (!map.has(log.exercise_id)) {
        map.set(log.exercise_id, log)
      }
    }
    return map
  }, [latestLogs])

  return (
    <div className="page">
      <h1>Dashboard</h1>

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
          return (
            <li key={exercise_id} className="dashboard-item">
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
                <Link to={`/log/${exercise_id}`}>Loggen</Link>
                <Link to={`/fortschritt/${exercise_id}`}>Fortschritt</Link>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
