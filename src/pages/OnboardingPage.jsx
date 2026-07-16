import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ExerciseCatalogEditor from '../components/ExerciseCatalogEditor'

export default function OnboardingPage() {
  const { profile, profileLoading, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState('exercises')
  const [age, setAge] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (profileLoading) {
    return <div className="page-loading">Lade…</div>
  }

  if (profile && profile.onboarding_completed) {
    return <Navigate to="/" replace />
  }

  async function finishOnboarding(extra = {}) {
    setSubmitting(true)
    await updateProfile({ onboarding_completed: true, ...extra })
    setSubmitting(false)
    navigate('/')
  }

  async function handleSkip() {
    await finishOnboarding()
  }

  async function handleFinish(e) {
    e.preventDefault()
    await finishOnboarding({
      age: age ? parseInt(age, 10) : null,
      height_cm: heightCm ? parseFloat(heightCm) : null,
      weight_kg: weightKg ? parseFloat(weightKg) : null,
    })
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-steps">
        <span className={step === 'exercises' ? 'active' : ''}>1. Geräte</span>
        <span className={step === 'info' ? 'active' : ''}>2. Über dich</span>
      </div>

      {step === 'exercises' && (
        <div className="page onboarding-step">
          <h1>Willkommen!</h1>
          <p className="page-hint">Wähle die Geräte aus, an denen du trainierst. Du kannst das später jederzeit ändern.</p>
          <ExerciseCatalogEditor />
          <button type="button" className="btn btn-primary" onClick={() => setStep('info')}>
            Weiter
          </button>
        </div>
      )}

      {step === 'info' && (
        <form className="page onboarding-step" onSubmit={handleFinish}>
          <h1>Über dich</h1>
          <p className="page-hint">Optional — kannst du auch später im Ich-Bereich nachtragen.</p>

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

          <div className="onboarding-actions">
            <button type="button" className="btn btn-secondary" onClick={handleSkip} disabled={submitting}>
              Überspringen
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              Fertig
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
