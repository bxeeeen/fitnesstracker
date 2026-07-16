import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useWorkoutLogs } from '../hooks/useWorkoutLogs'
import ProgressChart from '../components/ProgressChart'
import LogHistoryTable from '../components/LogHistoryTable'

export default function ExerciseProgressPage() {
  const { exerciseId } = useParams()
  const [exercise, setExercise] = useState(null)
  const { logs, loading, error, deleteLog } = useWorkoutLogs(exerciseId)

  useEffect(() => {
    supabase
      .from('exercises')
      .select('id, name')
      .eq('id', exerciseId)
      .single()
      .then(({ data }) => setExercise(data))
  }, [exerciseId])

  return (
    <div className="page">
      <p>
        <Link to="/">&larr; Zurück zum Dashboard</Link>
      </p>
      <h1>{exercise ? `Fortschritt: ${exercise.name}` : 'Fortschritt'}</h1>
      <p>
        <Link to={`/log/${exerciseId}`}>Neuen Eintrag loggen</Link>
      </p>

      {loading && <p>Lade…</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && !error && (
        <>
          <ProgressChart logs={logs} />
          <LogHistoryTable logs={logs} onDelete={deleteLog} />
        </>
      )}
    </div>
  )
}
