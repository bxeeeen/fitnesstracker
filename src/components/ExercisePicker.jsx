const MUSCLE_GROUP_ORDER = ['Brust', 'Rücken', 'Beine', 'Schultern', 'Arme', 'Bauch', 'Ganzkörper']

export default function ExercisePicker({ exercises, selectedIds, onToggle }) {
  const grouped = MUSCLE_GROUP_ORDER.map((group) => ({
    group,
    items: exercises.filter((ex) => ex.muscle_group === group),
  })).filter((g) => g.items.length > 0)

  return (
    <div className="exercise-picker">
      {grouped.map(({ group, items }) => (
        <div key={group} className="exercise-picker-group">
          <h3>{group}</h3>
          <div className="tile-grid">
            {items.map((exercise) => {
              const isSelected = selectedIds.has(exercise.id)
              return (
                <button
                  key={exercise.id}
                  type="button"
                  className={`tile${isSelected ? ' selected' : ''}`}
                  onClick={() => onToggle(exercise, isSelected)}
                  aria-pressed={isSelected}
                >
                  <span className="tile-label">{exercise.name}</span>
                  {exercise.is_custom && <span className="tile-badge">eigene</span>}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
