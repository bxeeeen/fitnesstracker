import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

// Lädt den gesamten für den Nutzer sichtbaren Übungskatalog (global + eigene).
export function useExercises() {
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('muscle_group', { ascending: true })
      .order('name', { ascending: true })

    if (error) {
      setError(error.message)
    } else {
      setExercises(data)
      setError(null)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return { exercises, loading, error, refetch }
}
