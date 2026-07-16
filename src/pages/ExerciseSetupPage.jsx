import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ExerciseCatalogEditor from '../components/ExerciseCatalogEditor'

export default function ExerciseSetupPage() {
  const navigate = useNavigate()
  const [hasChanges, setHasChanges] = useState(false)

  return (
    <div className="page">
      <div className="page-hero">
        <h1>Meine Übungen</h1>
        <p>Wähle die Übungen aus, an denen du trainierst.</p>
      </div>

      <ExerciseCatalogEditor onChange={() => setHasChanges(true)} />

      <div className="confirm-bar">
        <button
          type="button"
          className="btn btn-primary"
          disabled={!hasChanges}
          onClick={() => navigate('/')}
        >
          Bestätigen
        </button>
      </div>
    </div>
  )
}
