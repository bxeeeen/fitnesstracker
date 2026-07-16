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
          <button className="link-button" onClick={() => onDelete(log.id)}>
            Löschen
          </button>
        </li>
      ))}
    </ul>
  )
}
