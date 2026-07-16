import { useMemo } from 'react'
import { useExercises } from '../hooks/useExercises'
import { useUserExercises } from '../hooks/useUserExercises'
import ExercisePicker from '../components/ExercisePicker'
import CustomExerciseForm from '../components/CustomExerciseForm'

export default function ExerciseSetupPage() {
  const { exercises, loading: exercisesLoading, error: exercisesError, refetch: refetchExercises } =
    useExercises()
  const {
    userExercises,
    loading: userExercisesLoading,
    error: userExercisesError,
    addExercise,
    removeExercise,
  } = useUserExercises()

  const selectedIds = useMemo(
    () => new Set(userExercises.map((ue) => ue.exercise_id)),
    [userExercises]
  )

  async function handleToggle(exercise, isSelected) {
    if (isSelected) {
      await removeExercise(exercise.id)
    } else {
      await addExercise(exercise.id)
    }
  }

  async function handleCreated() {
    await refetchExercises()
  }

  const loading = exercisesLoading || userExercisesLoading
  const error = exercisesError || userExercisesError

  return (
    <div className="page">
      <h1>Meine Geräte</h1>
      <p className="page-hint">Wähle die Übungen aus, an denen du trainierst.</p>

      {loading && <p>Lade…</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && !error && (
        <ExercisePicker exercises={exercises} selectedIds={selectedIds} onToggle={handleToggle} />
      )}

      <CustomExerciseForm onCreated={handleCreated} />
    </div>
  )
}
