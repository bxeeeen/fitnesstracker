import { Link } from 'react-router-dom'
import ExerciseCatalogEditor from '../components/ExerciseCatalogEditor'

export default function ExerciseSetupPage() {
  return (
    <div className="page">
      <p>
        <Link to="/ich">&larr; Zurück zu Ich</Link>
      </p>
      <h1>Meine Geräte</h1>
      <p className="page-hint">Wähle die Übungen aus, an denen du trainierst.</p>

      <ExerciseCatalogEditor />
    </div>
  )
}
