import styles from "./Select.module.scss"

export type SelectOption = {
  label: string
  value: string
}

export type SelectProps = {
  label?: string
  name: string
  placeholder?: string
  className?: string
  disabled?: boolean
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
}

export default function Select({
  label,
  name,
  placeholder = "Select...",
  className = "",
  disabled = false,
  options,
  value,
  onChange,
  ...rest
}: SelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
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
        multiple={false}
        onChange={handleChange}
        disabled={disabled}
        className={styles.select}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
