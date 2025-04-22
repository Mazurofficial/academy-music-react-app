import type { SelectOption } from "../Select/Select"
import styles from "./MultiSelect.module.scss"

export type MultiSelectProps = {
  label?: string
  name: string
  className?: string
  disabled?: boolean
  options: SelectOption[]
  value: string | string[]
  onChange: (value: string[]) => void
}

export default function MultiSelect({
  label,
  name,
  className = "",
  disabled = false,
  options,
  value,
  onChange,
}: MultiSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      option => option.value,
    )
    onChange(selectedValues)
  }

  return (
    <div className={`${styles.selectRow} ${className}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        multiple
        onChange={handleChange}
        disabled={disabled}
        className={styles.select}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
