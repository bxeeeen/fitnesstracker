import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useWorkoutLogs } from '../hooks/useWorkoutLogs'
import LogEntryForm from '../components/LogEntryForm'

export default function LogEntryPage() {
  const { exerciseId } = useParams()
  const navigate = useNavigate()
  const [exercise, setExercise] = useState(null)
  const { logs, addLog } = useWorkoutLogs(exerciseId)

  useEffect(() => {
    supabase
      .from('exercises')
      .select('id, name')
      .eq('id', exerciseId)
      .single()
      .then(({ data }) => setExercise(data))
  }, [exerciseId])

  async function handleSubmit(entry) {
    const result = await addLog(entry)
    if (!result.error) {
      navigate(`/fortschritt/${exerciseId}`)
    }
    return result
  }

  return (
    <div className="page">
      <p>
        <Link to="/">&larr; Zurück zum Dashboard</Link>
      </p>
      <h1>{exercise ? `Eintrag: ${exercise.name}` : 'Eintrag loggen'}</h1>
      <LogEntryForm onSubmit={handleSubmit} lastLog={logs[0]} />
    </div>
  )
}
