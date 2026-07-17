import { useEffect, useRef, useState } from 'react'
import SliderField from './SliderField'

function today() {
  return new Date().toISOString().slice(0, 10)
}

export default function LogEntryForm({ onSubmit, lastLog }) {
  const [loggedDate, setLoggedDate] = useState(today())
  const [weightKg, setWeightKg] = useState(lastLog?.weight_kg ?? 20)
  const [reps, setReps] = useState(lastLog?.reps ?? 8)
  const [sets, setSets] = useState(lastLog?.sets ?? 3)
  const [notes, setNotes] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const appliedLastLog = useRef(false)

  useEffect(() => {
    if (lastLog && !appliedLastLog.current) {
      appliedLastLog.current = true
      setWeightKg(lastLog.weight_kg)
      if (lastLog.reps != null) setReps(lastLog.reps)
      if (lastLog.sets != null) setSets(lastLog.sets)
    }
  }, [lastLog])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const { error } = await onSubmit({
      loggedDate,
      weightKg,
      reps,
      sets,
      notes,
    })
    setSubmitting(false)

    if (error) {
      setError('Eintrag konnte nicht gespeichert werden: ' + error)
      return
    }

    setNotes('')
  }

  return (
    <form className="card log-entry-form" onSubmit={handleSubmit}>
      <label>
        Datum
        <input
          type="date"
          value={loggedDate}
          onChange={(e) => setLoggedDate(e.target.value)}
          required
        />
      </label>

      <SliderField
        label="Gewicht"
        unit=" kg"
        value={weightKg}
        onChange={setWeightKg}
        min={0}
        max={300}
        step={1}
      />
      <SliderField
        label="Wiederholungen"
        unit=""
        value={reps}
        onChange={setReps}
        min={1}
        max={30}
        step={1}
      />
      <SliderField label="Sätze" unit="" value={sets} onChange={setSets} min={1} max={10} step={1} />

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
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Speichern…' : 'Eintrag speichern'}
      </button>
    </form>
  )
}
