import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

// Lädt und verwaltet die geloggten Trainingseinheiten für eine bestimmte Übung.
export function useWorkoutLogs(exerciseId) {
  const { user } = useAuth()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    if (!user || !exerciseId) return
    setLoading(true)
    const { data, error } = await supabase
      .from('workout_logs')
      .select('*')
      .eq('user_id', user.id)
      .eq('exercise_id', exerciseId)
      .order('logged_date', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setLogs(data)
      setError(null)
    }
    setLoading(false)
  }, [user, exerciseId])

  useEffect(() => {
    refetch()
  }, [refetch])

  async function addLog({ loggedDate, weightKg, reps, sets, notes }) {
    if (!user) return { error: 'Nicht angemeldet' }
    const { error } = await supabase.from('workout_logs').insert({
      user_id: user.id,
      exercise_id: exerciseId,
      logged_date: loggedDate,
      weight_kg: weightKg,
      reps: reps || null,
      sets: sets || null,
      notes: notes || null,
    })
    if (!error) await refetch()
    return { error: error?.message ?? null }
  }

  async function deleteLog(logId) {
    if (!user) return { error: 'Nicht angemeldet' }
    const { error } = await supabase
      .from('workout_logs')
      .delete()
      .eq('id', logId)
      .eq('user_id', user.id)
    if (!error) await refetch()
    return { error: error?.message ?? null }
  }

  return { logs, loading, error, refetch, addLog, deleteLog }
}
