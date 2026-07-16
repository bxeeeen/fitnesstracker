import { NavLink, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function NavBar() {
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <NavLink to="/" end>
        Dashboard
      </NavLink>
      <NavLink to="/geraete">Meine Geräte</NavLink>
      <button className="navbar-logout" onClick={handleLogout}>
        Abmelden
      </button>
    </nav>
  )
}
