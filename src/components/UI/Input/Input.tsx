import styles from "./Input.module.scss"

export type InputProps = {
  label?: string
  name: string
  placeholder?: string
  type: string
  className?: string
  disabled?: boolean
  value: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  label,
  name,
  placeholder = "",
  type = "text",
  className = "",
  disabled = false,
  value,
  error,
  onChange,
}: InputProps) {
  return (
    <div className={`${styles.inputRow} ${className}`}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        disabled={disabled}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
