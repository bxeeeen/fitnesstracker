import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

// Verwaltet die Trainingstage (Wochentag + optionaler Split-Label wie "Legday").
export function useTrainingDays() {
  const { user } = useAuth()
  const [trainingDays, setTrainingDays] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data, error } = await supabase
      .from('training_days')
      .select('id, weekday, split_label')
      .eq('user_id', user.id)
      .order('weekday', { ascending: true })

    if (error) {
      setError(error.message)
    } else {
      setTrainingDays(data)
      setError(null)
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    refetch()
  }, [refetch])

  async function toggleDay(weekday) {
    if (!user) return { error: 'Nicht angemeldet' }
    const isSelected = trainingDays.some((d) => d.weekday === weekday)
    const { error } = isSelected
      ? await supabase.from('training_days').delete().eq('user_id', user.id).eq('weekday', weekday)
      : await supabase.from('training_days').insert({ user_id: user.id, weekday })
    if (!error) await refetch()
    return { error: error?.message ?? null }
  }

  async function setSplitLabel(weekday, label) {
    if (!user) return { error: 'Nicht angemeldet' }
    const { error } = await supabase
      .from('training_days')
      .update({ split_label: label || null })
      .eq('user_id', user.id)
      .eq('weekday', weekday)
    if (!error) await refetch()
    return { error: error?.message ?? null }
  }

  return { trainingDays, loading, error, refetch, toggleDay, setSplitLabel }
}
