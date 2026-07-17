export default function SliderField({ label, value, onChange, min, max, step, unit }) {
  return (
    <label className="slider-field">
      <span className="slider-field-header">
        <span>{label}</span>
        <span className="slider-field-value">
          {value}
          {unit}
        </span>
      </span>
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}
