import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user, profile, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!profile) return
    setName(profile.name ?? '')
    setAge(profile.age ?? '')
    setHeightCm(profile.height_cm ?? '')
    setWeightKg(profile.weight_kg ?? '')
  }, [profile])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  async function handleSave(e) {
    e.preventDefault()
    setSubmitting(true)
    setSaved(false)
    const { error } = await updateProfile({
      name: name.trim() || null,
      age: age ? parseInt(age, 10) : null,
      height_cm: heightCm ? parseFloat(heightCm) : null,
      weight_kg: weightKg ? parseFloat(weightKg) : null,
    })
    setSubmitting(false)
    if (!error) setSaved(true)
  }

  return (
    <div className="page">
      <div className="page-hero profile-hero">
        <h1>{profile?.name || 'Ich'}</h1>
        <p>{user?.email}</p>
      </div>

      <form className="card profile-form" onSubmit={handleSave}>
        <label>
          Name
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Alter
          <input type="number" min="1" max="129" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <label>
          Größe (cm)
          <input
            type="number"
            min="1"
            step="0.1"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
          />
        </label>
        <label>
          Gewicht (kg)
          <input
            type="number"
            min="1"
            step="0.1"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
          />
        </label>
        {saved && <p className="form-success">Gespeichert.</p>}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Speichern…' : 'Speichern'}
        </button>
      </form>

      <button type="button" className="btn btn-secondary" onClick={handleLogout}>
        Abmelden
      </button>
    </div>
  )
}
