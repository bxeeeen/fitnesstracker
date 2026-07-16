import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useWorkoutLogs } from '../hooks/useWorkoutLogs'
import LogEntryForm from '../components/LogEntryForm'
import Modal from '../components/Modal'
import SavedCheckmark from '../components/SavedCheckmark'

export default function LogEntryPage() {
  const { exerciseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const backgroundLocation = location.state?.backgroundLocation
  const [exercise, setExercise] = useState(null)
  const [saved, setSaved] = useState(false)
  const { logs, addLog } = useWorkoutLogs(exerciseId)

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

  async function handleSubmit(entry) {
    const result = await addLog(entry)
    if (!result.error) {
      setSaved(true)
      setTimeout(() => {
        navigate(`/fortschritt/${exerciseId}`, {
          replace: true,
          state: backgroundLocation ? { backgroundLocation } : undefined,
        })
      }, 700)
    }
    return result
  }

  return (
    <Modal onClose={handleClose}>
      {saved ? (
        <SavedCheckmark />
      ) : (
        <div className="page">
          <h1>{exercise ? `Eintrag: ${exercise.name}` : 'Eintrag loggen'}</h1>
          <LogEntryForm onSubmit={handleSubmit} lastLog={logs[0]} />
        </div>
      )}
    </Modal>
  )
}
