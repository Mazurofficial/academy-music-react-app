import type { Status } from "../../../../types/status"
import Select from "../../../UI/Select/Select"
import styles from "./PageLimitSelect.module.scss"

type PageLimitSelectProps = {
  limit: number
  onLimitChange: (limit: number) => void
  status: Status
  totalPages: number
}

export default function PageLimitSelect({
  limit,
  onLimitChange,
  status,
  totalPages,
}: PageLimitSelectProps) {
  const options = [5, 10, 15, 20, totalPages].map(val => ({
    label: val.toString(),
    value: val.toString(),
  }))

  return (
    <div className={styles.pageLimitSelect}>
      <Select
        label="Tracks per page:"
        name="page-limit"
        value={limit.toString()}
        onChange={value => {
          onLimitChange(parseInt(value, 10))
        }}
        disabled={status === "loading"}
        options={options}
      />
    </div>
  )
}
