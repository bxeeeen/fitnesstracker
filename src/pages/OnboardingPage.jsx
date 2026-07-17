import { useMemo, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useUserExercises } from '../hooks/useUserExercises'
import { useTrainingDays } from '../hooks/useTrainingDays'
import ExerciseCatalogEditor from '../components/ExerciseCatalogEditor'
import WeekdayPicker from '../components/WeekdayPicker'
import TrainingSplitPicker from '../components/TrainingSplitPicker'
import SliderField from '../components/SliderField'
import Spinner from '../components/Spinner'
import { WEEKDAY_LABELS_FULL } from '../lib/dates'

export default function OnboardingPage() {
  const { profile, profileLoading, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [stepIndex, setStepIndex] = useState(0)
  const [age, setAge] = useState(25)
  const [heightCm, setHeightCm] = useState(170)
  const [weightKg, setWeightKg] = useState(70)
  const [maxWeightKg, setMaxWeightKg] = useState(80)
  const [defaultSets, setDefaultSets] = useState(3)
  const [defaultReps, setDefaultReps] = useState(8)
  const [submitting, setSubmitting] = useState(false)
  const { userExercises, refetch: refetchUserExercises } = useUserExercises()
  const { trainingDays, toggleDay, setSplitLabel } = useTrainingDays()
  const hasSelection = userExercises.length > 0

  const selectedWeekdays = useMemo(() => new Set(trainingDays.map((d) => d.weekday)), [trainingDays])

  const steps = useMemo(
    () => [
      'exercises',
      'trainingDays',
      ...(selectedWeekdays.size > 0 ? ['trainingSplit'] : []),
      'trainingDefaults',
      'info',
    ],
    [selectedWeekdays.size]
  )
  const step = steps[Math.min(stepIndex, steps.length - 1)]
  const goNext = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1))

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
      max_weight_kg: maxWeightKg,
      default_sets: defaultSets,
      default_reps: defaultReps,
    })
  }

  const showConfirmBar = step === 'exercises' ? hasSelection : step !== 'info'

  return (
    <div className="onboarding-page">
      <div className="onboarding-progress">
        <div className="onboarding-progress-fill" style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }} />
      </div>
      <p className="onboarding-progress-label">
        {stepIndex + 1} / {steps.length}
      </p>

      {step === 'exercises' && (
        <div className="page onboarding-step">
          <h1>Willkommen!</h1>
          <p className="page-hint">Wähle die Geräte aus, an denen du trainierst. Du kannst das später jederzeit ändern.</p>
          <ExerciseCatalogEditor onChange={refetchUserExercises} />
        </div>
      )}

      {step === 'trainingDays' && (
        <div className="page onboarding-step">
          <h1>Trainingstage</h1>
          <p className="page-hint">
            Wähle die Wochentage, an denen du trainierst. Optional, du kannst das später im Ich-Bereich anpassen.
          </p>
          <WeekdayPicker selectedWeekdays={selectedWeekdays} onToggle={toggleDay} />
        </div>
      )}

      {step === 'trainingSplit' && (
        <div className="page onboarding-step">
          <h1>Trainingsplan</h1>
          <p className="page-hint">Was trainierst du an diesen Tagen? Wähle einen Vorschlag oder trage einen eigenen Namen ein.</p>
          {[...selectedWeekdays]
            .sort((a, b) => a - b)
            .map((weekday) => (
              <TrainingSplitPicker
                key={weekday}
                weekday={weekday}
                label={WEEKDAY_LABELS_FULL[weekday - 1]}
                value={trainingDays.find((d) => d.weekday === weekday)?.split_label ?? ''}
                onChange={setSplitLabel}
              />
            ))}
        </div>
      )}

      {step === 'trainingDefaults' && (
        <div className="page onboarding-step">
          <h1>Trainingsvorgaben</h1>
          <p className="page-hint">Hilft uns, sinnvolle Vorgaben für deine Einträge vorzuschlagen.</p>
          <SliderField
            label="Kraftwert"
            unit=" kg"
            value={maxWeightKg}
            onChange={setMaxWeightKg}
            min={10}
            max={300}
            step={5}
          />
          <p className="page-hint">Wird für die automatische Anpassung der Slider-Ranges verwendet.</p>
          <SliderField
            label="Standard-Sätze"
            unit=""
            value={defaultSets}
            onChange={setDefaultSets}
            min={1}
            max={10}
            step={1}
          />
          <SliderField
            label="Standard-Wiederholungen"
            unit=""
            value={defaultReps}
            onChange={setDefaultReps}
            min={1}
            max={30}
            step={1}
          />
        </div>
      )}

      {step === 'info' && (
        <form id="onboarding-info-form" className="page onboarding-step" onSubmit={handleFinish}>
          <h1>Über dich</h1>
          <p className="page-hint">Optional, kannst du auch später im Ich-Bereich nachtragen.</p>

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

      {showConfirmBar && (
        <div className="confirm-bar">
          <button type="button" className="btn btn-primary" onClick={goNext}>
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
