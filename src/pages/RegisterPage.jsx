import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  if (session) {
    return <Navigate to="/" replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (password.length < 6) {
      setError('Das Passwort muss mindestens 6 Zeichen lang sein.')
      return
    }

    setSubmitting(true)
    const { data, error } = await supabase.auth.signUp({ email, password })
    setSubmitting(false)

    if (error) {
      setError('Registrierung fehlgeschlagen: ' + error.message)
      return
    }

    if (data.session) {
      navigate('/')
    } else {
      setError('Registrierung erfolgreich. Bitte bestätige deine E-Mail, um dich anzumelden.')
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Registrieren</h1>
        <label>
          E-Mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </label>
        <label>
          Passwort
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            minLength={6}
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? 'Registrieren…' : 'Registrieren'}
        </button>
        <p className="auth-switch">
          Bereits registriert? <Link to="/login">Zum Login</Link>
        </p>
      </form>
    </div>
  )
}
