import styles from "./Input.module.scss"

export type InputProps = {
  label?: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

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
  ...rest
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
        {...rest}
      />
      {error && (
        <span data-testid={`error-${name ?? ""}`} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  )
}
