import { NavLink } from 'react-router-dom'

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ProgressIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19V10M10 19V5M16 19v-7M22 19H2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" end className="bottom-nav-item">
        <HomeIcon />
        <span>Home</span>
      </NavLink>
      <NavLink to="/fortschritt" className="bottom-nav-item">
        <ProgressIcon />
        <span>Fortschritt</span>
      </NavLink>
      <NavLink to="/ich" className="bottom-nav-item">
        <ProfileIcon />
        <span>Ich</span>
      </NavLink>
    </nav>
  )
}
