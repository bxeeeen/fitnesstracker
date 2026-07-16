import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useWorkoutLogs } from '../hooks/useWorkoutLogs'
import ProgressChart from '../components/ProgressChart'
import ProgressStats from '../components/ProgressStats'
import LogHistoryTable from '../components/LogHistoryTable'
import Modal from '../components/Modal'

export default function ExerciseProgressPage() {
  const { exerciseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const backgroundLocation = location.state?.backgroundLocation
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

  function handleClose() {
    if (backgroundLocation) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  return (
    <Modal onClose={handleClose}>
      <div className="page">
        <h1>{exercise ? `Fortschritt: ${exercise.name}` : 'Fortschritt'}</h1>
        <Link
          to={`/log/${exerciseId}`}
          state={backgroundLocation ? { backgroundLocation } : undefined}
          className="btn btn-primary"
        >
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
    </Modal>
  )
}
