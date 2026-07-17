const TrashIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m3 0-.87 12.14A2 2 0 0 1 15.14 21H8.86a2 2 0 0 1-1.99-1.86L6 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function LogHistoryTable({ logs, onDelete }) {
  if (logs.length === 0) {
    return <p className="page-hint">Noch keine Einträge für dieses Gerät.</p>
  }

  return (
    <ul className="log-card-list">
      {logs.map((log) => (
        <li key={log.id} className="card log-card">
          <div className="log-card-main">
            <span className="log-card-weight">{log.weight_kg} kg</span>
            <span className="log-card-date">{log.logged_date}</span>
          </div>
          <div className="log-card-details">
            {log.reps != null && log.sets != null && (
              <span>
                {log.sets} × {log.reps} Wdh.
              </span>
            )}
            {log.notes && <span>{log.notes}</span>}
          </div>
          <button
            type="button"
            className="log-card-delete"
            onClick={() => onDelete(log.id)}
            aria-label="Eintrag löschen"
          >
            <TrashIcon />
          </button>
        </li>
      ))}
    </ul>
  )
}
