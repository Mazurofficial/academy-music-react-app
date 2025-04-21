import type { Status } from "../../types/status"
import styles from "./PageLimitSelect.module.scss"

type PageLimitSelectProps = {
  limit: number
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  status: Status
  totalPages: number
}

export default function PageLimitSelect({
  limit,
  onChange,
  status,
  totalPages,
}: PageLimitSelectProps) {
  return (
    <div className={styles.pageLimitSelect}>
      <label htmlFor="page-limit">Tracks per page: </label>
      <select
        id="page-limit"
        value={limit}
        onChange={onChange}
        disabled={status === "loading"}
      >
        {[5, 10, 15, 20, totalPages].map(limit => (
          <option key={limit} value={limit}>
            {limit}
          </option>
        ))}
      </select>
    </div>
  )
}
