const PRESETS = ['Legday', 'Push', 'Pull', 'Upper Body', 'Lower Body', 'Ganzkörper', 'Cardio', 'Ruhetag']

export default function TrainingSplitPicker({ weekday, label, value, onChange }) {
  const isCustomValue = value && !PRESETS.includes(value)

  return (
    <div className="exercise-picker-group training-split-day">
      <h3>{label}</h3>
      <div className="tile-grid tile-grid-compact">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            className={`tile tile-compact${value === preset ? ' selected' : ''}`}
            onClick={() => onChange(weekday, preset)}
            aria-pressed={value === preset}
          >
            <span className="tile-label">{preset}</span>
          </button>
        ))}
      </div>
      <input
        type="text"
        placeholder="Eigener Split (optional)"
        value={isCustomValue ? value : ''}
        onChange={(e) => onChange(weekday, e.target.value)}
        className="training-split-custom-input"
      />
    </div>
  )
}
