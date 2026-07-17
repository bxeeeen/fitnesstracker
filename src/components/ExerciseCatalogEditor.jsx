import { useMemo } from 'react'
import { useExercises } from '../hooks/useExercises'
import { useUserExercises } from '../hooks/useUserExercises'
import ExercisePicker from './ExercisePicker'
import CustomExerciseForm from './CustomExerciseForm'
import Spinner from './Spinner'

export default function ExerciseCatalogEditor({ onChange }) {
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
    const result = isSelected ? await removeExercise(exercise.id) : await addExercise(exercise.id)
    if (!result.error) onChange?.()
  }

  async function handleCreated() {
    await refetchExercises()
    onChange?.()
  }

  const error = exercisesError || userExercisesError
  // Nur beim allerersten Laden eine Ladeanzeige zeigen — nicht bei jedem
  // Refetch nach einem Toggle, sonst hängt/springt das Grid (unmount/remount).
  const initialLoading = (exercisesLoading || userExercisesLoading) && exercises.length === 0

  return (
    <div className="exercise-catalog-editor">
      {initialLoading && (
        <div className="page-loading">
          <Spinner />
        </div>
      )}
      {error && <p className="form-error">{error}</p>}

      {!error && exercises.length > 0 && (
        <ExercisePicker exercises={exercises} selectedIds={selectedIds} onToggle={handleToggle} />
      )}

      <CustomExerciseForm onCreated={handleCreated} />
    </div>
  )
}
