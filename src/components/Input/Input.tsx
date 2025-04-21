import { useState } from "react"
import styles from "./Input.module.scss"

export type InputProps = {
  label?: string
  name: string
  placeholder?: string
  type: string
  className?: string
  disabled?: boolean
}

export default function Input({
  label,
  name,
  placeholder = "",
  type = "text",
  className = "",
  disabled = false,
}: InputProps) {
  const [value, setValue] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

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
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.input}
        disabled={disabled}
      />
    </div>
  )
}
