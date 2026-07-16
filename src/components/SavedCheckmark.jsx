export default function SavedCheckmark() {
  return (
    <div className="saved-checkmark">
      <svg viewBox="0 0 52 52" width="64" height="64">
        <circle className="saved-checkmark-circle" cx="26" cy="26" r="24" fill="none" />
        <path className="saved-checkmark-check" fill="none" d="M14 27l7 7 17-17" />
      </svg>
      <p>Gespeichert</p>
    </div>
  )
}
