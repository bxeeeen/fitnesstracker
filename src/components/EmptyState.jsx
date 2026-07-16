import { Link } from 'react-router-dom'

export default function EmptyState({ to = '/geraete', label = 'Übungen hinzufügen' }) {
  return (
    <Link to={to} className="empty-state">
      <span className="empty-state-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </span>
      <span className="empty-state-label">{label}</span>
    </Link>
  )
}
