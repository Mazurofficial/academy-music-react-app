import styles from "./Checkbox.module.scss"

type CheckboxProps = {
  checked: boolean
  onChange: () => void
  label?: string
}

export default function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <label className={styles.customCheckbox}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.checkmark}></span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}
