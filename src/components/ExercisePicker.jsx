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
          <ul>
            {items.map((exercise) => {
              const isSelected = selectedIds.has(exercise.id)
              return (
                <li key={exercise.id}>
                  <label className="exercise-picker-item">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(exercise, isSelected)}
                    />
                    {exercise.name}
                    {exercise.is_custom && <span className="badge">eigene</span>}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}
