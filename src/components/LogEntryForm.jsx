import { useState } from 'react'

function today() {
  return new Date().toISOString().slice(0, 10)
}

export default function LogEntryForm({ onSubmit }) {
  const [loggedDate, setLoggedDate] = useState(today())
  const [weightKg, setWeightKg] = useState('')
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    const weight = parseFloat(weightKg)
    if (!weight || weight <= 0) {
      setError('Bitte ein gültiges Gewicht angeben.')
      return
    }

    setSubmitting(true)
    const { error } = await onSubmit({
      loggedDate,
      weightKg: weight,
      reps: reps ? parseInt(reps, 10) : null,
      sets: sets ? parseInt(sets, 10) : null,
      notes,
    })
    setSubmitting(false)

    if (error) {
      setError('Eintrag konnte nicht gespeichert werden: ' + error)
      return
    }

    setWeightKg('')
    setReps('')
    setSets('')
    setNotes('')
  }

  return (
    <form className="log-entry-form" onSubmit={handleSubmit}>
      <label>
        Datum
        <input
          type="date"
          value={loggedDate}
          onChange={(e) => setLoggedDate(e.target.value)}
          required
        />
      </label>
      <label>
        Gewicht (kg)
        <input
          type="number"
          step="0.5"
          min="0"
          value={weightKg}
          onChange={(e) => setWeightKg(e.target.value)}
          required
        />
      </label>
      <label>
        Wiederholungen
        <input
          type="number"
          min="1"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
      </label>
      <label>
        Sätze
        <input
          type="number"
          min="1"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
      </label>
      <label>
        Notizen
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="optional"
        />
      </label>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? 'Speichern…' : 'Eintrag speichern'}
      </button>
    </form>
  )
}
