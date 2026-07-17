import { WEEKDAY_LABELS_SHORT } from '../lib/dates'

export default function WeekdayPicker({ selectedWeekdays, onToggle }) {
  return (
    <div className="tile-grid weekday-grid">
      {WEEKDAY_LABELS_SHORT.map((label, i) => {
        const weekday = i + 1
        const isSelected = selectedWeekdays.has(weekday)
        return (
          <button
            key={weekday}
            type="button"
            className={`tile tile-weekday${isSelected ? ' selected' : ''}`}
            onClick={() => onToggle(weekday)}
            aria-pressed={isSelected}
          >
            <span className="tile-label">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
