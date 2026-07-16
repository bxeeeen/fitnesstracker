import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function OnboardingGate() {
  const { profile, profileLoading } = useAuth()

  if (profileLoading) {
    return <div className="page-loading">Lade…</div>
  }

  if (profile && !profile.onboarding_completed) {
    return <Navigate to="/onboarding" replace />
  }

  return <Outlet />
}
