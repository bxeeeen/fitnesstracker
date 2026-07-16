import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

// Lädt für jede Übung des Nutzers die komplette Log-Historie (aufsteigend sortiert),
// daraus lassen sich sowohl der letzte Eintrag als auch eine Sparkline ableiten.
export function useLatestLogs() {
  const { user } = useAuth()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  const refetch = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data } = await supabase
      .from('workout_logs')
      .select('exercise_id, weight_kg, logged_date')
      .eq('user_id', user.id)
      .order('logged_date', { ascending: true })
    setLogs(data ?? [])
    setLoading(false)
  }, [user])

  useEffect(() => {
    refetch()
  }, [refetch])

  const logsByExercise = useMemo(() => {
    const map = new Map()
    for (const log of logs) {
      if (!map.has(log.exercise_id)) map.set(log.exercise_id, [])
      map.get(log.exercise_id).push(log)
    }
    return map
  }, [logs])

  const latestByExercise = useMemo(() => {
    const map = new Map()
    for (const [exerciseId, entries] of logsByExercise) {
      map.set(exerciseId, entries[entries.length - 1])
    }
    return map
  }, [logsByExercise])

  return { latestByExercise, logsByExercise, loading, refetch }
}
