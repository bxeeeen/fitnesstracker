import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

// Lädt für jede Übung des Nutzers den zuletzt geloggten Eintrag.
export function useLatestLogs() {
  const { user } = useAuth()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    supabase
      .from('workout_logs')
      .select('exercise_id, weight_kg, logged_date')
      .eq('user_id', user.id)
      .order('logged_date', { ascending: false })
      .then(({ data }) => {
        setLogs(data ?? [])
        setLoading(false)
      })
  }, [user])

  const latestByExercise = useMemo(() => {
    const map = new Map()
    for (const log of logs) {
      if (!map.has(log.exercise_id)) {
        map.set(log.exercise_id, log)
      }
    }
    return map
  }, [logs])

  return { latestByExercise, loading }
}
