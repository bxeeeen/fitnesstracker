import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/onboarding" element={<OnboardingPage />} />

            <Route element={<OnboardingGate />}>
              <Route element={<AppLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/fortschritt" element={<ProgressOverviewPage />} />
                <Route path="/fortschritt/:exerciseId" element={<ExerciseProgressPage />} />
                <Route path="/log/:exerciseId" element={<LogEntryPage />} />
                <Route path="/ich" element={<ProfilePage />} />
                <Route path="/ich/geraete" element={<ExerciseSetupPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
