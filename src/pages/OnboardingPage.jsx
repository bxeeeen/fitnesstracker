import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useUserExercises } from '../hooks/useUserExercises'
import ExerciseCatalogEditor from '../components/ExerciseCatalogEditor'
import SliderField from '../components/SliderField'
import Spinner from '../components/Spinner'

export default function OnboardingPage() {
  const { profile, profileLoading, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState('exercises')
  const [age, setAge] = useState(25)
  const [heightCm, setHeightCm] = useState(170)
  const [weightKg, setWeightKg] = useState(70)
  const [submitting, setSubmitting] = useState(false)
  const { userExercises, refetch: refetchUserExercises } = useUserExercises()
  const hasSelection = userExercises.length > 0

  if (profileLoading) {
    return (
      <div className="page-loading">
        <Spinner />
      </div>
    )
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
      age,
      height_cm: heightCm,
      weight_kg: weightKg,
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
          <ExerciseCatalogEditor onChange={refetchUserExercises} />
        </div>
      )}

      {step === 'info' && (
        <form id="onboarding-info-form" className="page onboarding-step" onSubmit={handleFinish}>
          <h1>Über dich</h1>
          <p className="page-hint">Optional — kannst du auch später im Ich-Bereich nachtragen.</p>

          <SliderField label="Alter" unit=" Jahre" value={age} onChange={setAge} min={10} max={100} step={1} />
          <SliderField
            label="Größe"
            unit=" cm"
            value={heightCm}
            onChange={setHeightCm}
            min={100}
            max={220}
            step={1}
          />
          <SliderField
            label="Gewicht"
            unit=" kg"
            value={weightKg}
            onChange={setWeightKg}
            min={30}
            max={200}
            step={1}
          />
        </form>
      )}

      {step === 'exercises' && hasSelection && (
        <div className="confirm-bar">
          <button type="button" className="btn btn-primary" onClick={() => setStep('info')}>
            Weiter
          </button>
        </div>
      )}

      {step === 'info' && (
        <div className="confirm-bar">
          <div className="confirm-bar-actions">
            <button type="button" className="btn btn-secondary" onClick={handleSkip} disabled={submitting}>
              Überspringen
            </button>
            <button type="submit" form="onboarding-info-form" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Speichern…' : 'Fertig'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
