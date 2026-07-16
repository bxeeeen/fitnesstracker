import { useMemo } from 'react'
import { useExercises } from '../hooks/useExercises'
import { useUserExercises } from '../hooks/useUserExercises'
import ExercisePicker from './ExercisePicker'
import CustomExerciseForm from './CustomExerciseForm'

export default function ExerciseCatalogEditor() {
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
    <div className="exercise-catalog-editor">
      <CustomExerciseForm onCreated={handleCreated} />

      {loading && <p>Lade…</p>}
      {error && <p className="form-error">{error}</p>}

      {!loading && !error && (
        <ExercisePicker exercises={exercises} selectedIds={selectedIds} onToggle={handleToggle} />
      )}
    </div>
  )
}
