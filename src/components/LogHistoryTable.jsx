export default function LogHistoryTable({ logs, onDelete }) {
  if (logs.length === 0) {
    return <p className="page-hint">Noch keine Einträge für dieses Gerät.</p>
  }

  return (
    <table className="log-history-table">
      <thead>
        <tr>
          <th>Datum</th>
          <th>Gewicht (kg)</th>
          <th>Wdh.</th>
          <th>Sätze</th>
          <th>Notizen</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td>{log.logged_date}</td>
            <td>{log.weight_kg}</td>
            <td>{log.reps ?? '–'}</td>
            <td>{log.sets ?? '–'}</td>
            <td>{log.notes ?? '–'}</td>
            <td>
              <button className="link-button" onClick={() => onDelete(log.id)}>
                Löschen
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
