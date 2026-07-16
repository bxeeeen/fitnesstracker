import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

const MUSCLE_GROUPS = ['Brust', 'Rücken', 'Beine', 'Schultern', 'Arme', 'Bauch', 'Ganzkörper']

export default function CustomExerciseForm({ onCreated }) {
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [muscleGroup, setMuscleGroup] = useState(MUSCLE_GROUPS[0])
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const trimmedName = name.trim()
    if (!trimmedName) return

    setSubmitting(true)

    const { data: exercise, error: insertError } = await supabase
      .from('exercises')
      .insert({
        name: trimmedName,
        muscle_group: muscleGroup,
        owner_id: user.id,
        is_custom: true,
      })
      .select()
      .single()

    if (insertError) {
      setSubmitting(false)
      setError(
        insertError.code === '23505'
          ? 'Du hast bereits eine Übung mit diesem Namen.'
          : 'Übung konnte nicht angelegt werden: ' + insertError.message
      )
      return
    }

    const { error: linkError } = await supabase
      .from('user_exercises')
      .insert({ user_id: user.id, exercise_id: exercise.id })

    setSubmitting(false)

    if (linkError) {
      setError('Übung angelegt, konnte aber nicht zu "Meine Geräte" hinzugefügt werden.')
      return
    }

    setName('')
    onCreated?.()
  }

  return (
    <form className="card custom-exercise-form" onSubmit={handleSubmit}>
      <h3>Eigene Übung hinzufügen</h3>
      <div className="custom-exercise-fields">
        <input
          type="text"
          placeholder="Name der Übung"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={muscleGroup} onChange={(e) => setMuscleGroup(e.target.value)}>
          {MUSCLE_GROUPS.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Hinzufügen…' : 'Hinzufügen'}
        </button>
      </div>
      {error && <p className="form-error">{error}</p>}
    </form>
  )
}
