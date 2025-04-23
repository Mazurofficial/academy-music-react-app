import styles from "./Button.module.scss"

export type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  className?: string
  title?: string
}

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  title = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className}`}
      title={title}
    >
      {children}
    </button>
  )
}
