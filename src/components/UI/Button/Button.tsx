import styles from "./Button.module.scss"

export type ButtonProps = {
  type?: "button" | "submit" | "reset"
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  title = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className}`}
      title={title}
      {...rest}
    >
      {children}
    </button>
  )
}
