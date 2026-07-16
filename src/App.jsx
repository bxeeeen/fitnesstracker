import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AppLayout from './components/AppLayout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
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
            <Route element={<AppLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/geraete" element={<ExerciseSetupPage />} />
              <Route path="/log/:exerciseId" element={<LogEntryPage />} />
              <Route path="/fortschritt/:exerciseId" element={<ExerciseProgressPage />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
