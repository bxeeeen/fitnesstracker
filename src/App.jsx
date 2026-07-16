import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import OnboardingGate from './components/OnboardingGate'
import AppLayout from './components/AppLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import OnboardingPage from './pages/OnboardingPage'
import DashboardPage from './pages/DashboardPage'
import ProgressOverviewPage from './pages/ProgressOverviewPage'
import ProfilePage from './pages/ProfilePage'
import ExerciseSetupPage from './pages/ExerciseSetupPage'
import LogEntryPage from './pages/LogEntryPage'
import ExerciseProgressPage from './pages/ExerciseProgressPage'

function AppRoutes() {
  const location = useLocation()
  const backgroundLocation = location.state?.backgroundLocation

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/onboarding" element={<OnboardingPage />} />

          <Route element={<OnboardingGate />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/fortschritt" element={<ProgressOverviewPage />} />
              <Route path="/ich" element={<ProfilePage />} />
              <Route path="/geraete" element={<ExerciseSetupPage />} />
            </Route>

            {/* Full-page fallback for direct navigation/refresh; normally opened as overlays below */}
            <Route path="/log/:exerciseId" element={<LogEntryPage />} />
            <Route path="/fortschritt/:exerciseId" element={<ExerciseProgressPage />} />
          </Route>
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/log/:exerciseId" element={<LogEntryPage />} />
          <Route path="/fortschritt/:exerciseId" element={<ExerciseProgressPage />} />
        </Routes>
      )}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
