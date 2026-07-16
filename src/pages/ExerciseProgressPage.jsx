import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useWorkoutLogs } from '../hooks/useWorkoutLogs'
import ProgressChart from '../components/ProgressChart'
import ProgressStats from '../components/ProgressStats'
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
        <Link to="/fortschritt">&larr; Zurück zur Übersicht</Link>
      </p>
      <h1>{exercise ? `Fortschritt: ${exercise.name}` : 'Fortschritt'}</h1>
      <Link to={`/log/${exerciseId}`} className="btn btn-primary">
        Neuen Eintrag loggen
      </Link>

      {loading && <p>Lade…</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && !error && (
        <>
          <ProgressStats logs={logs} />
          <ProgressChart logs={logs} />
          <LogHistoryTable logs={logs} onDelete={deleteLog} />
        </>
      )}
    </div>
  )
}
