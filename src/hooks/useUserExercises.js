import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

// Verwaltet "Meine Geräte" — die vom Nutzer ausgewählten Übungen (inkl. Details via Join).
export function useUserExercises() {
  const { user } = useAuth()
  const [userExercises, setUserExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data, error } = await supabase
      .from('user_exercises')
      .select('id, exercise_id, added_at, exercises (id, name, muscle_group, is_custom)')
      .eq('user_id', user.id)
      .order('added_at', { ascending: true })

    if (error) {
      setError(error.message)
    } else {
      setUserExercises(data)
      setError(null)
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    refetch()
  }, [refetch])

  async function addExercise(exerciseId) {
    if (!user) return { error: 'Nicht angemeldet' }
    const { error } = await supabase
      .from('user_exercises')
      .insert({ user_id: user.id, exercise_id: exerciseId })
    if (!error) await refetch()
    return { error: error?.message ?? null }
  }

  async function removeExercise(exerciseId) {
    if (!user) return { error: 'Nicht angemeldet' }
    const { error } = await supabase
      .from('user_exercises')
      .delete()
      .eq('user_id', user.id)
      .eq('exercise_id', exerciseId)
    if (!error) await refetch()
    return { error: error?.message ?? null }
  }

  return { userExercises, loading, error, refetch, addExercise, removeExercise }
}
