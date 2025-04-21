import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { loadTracks } from "../../features/trackList/trackListApiSlice"
import {
  selectTrackListMeta,
  selectTrackListQuery,
  selectTrackListStatus,
} from "../../features/trackList/trackListSelectors"
import Button from "../Button/Button"
import PageLimitSelect from "../PageLimitSelect/PageLimitSelect"
import styles from "./Pagination.module.scss"

export default function Pagination() {
  const dispatch = useAppDispatch()
  const { total, page, limit, totalPages } = useAppSelector(selectTrackListMeta)
  const trackListQuery = useAppSelector(selectTrackListQuery)
  const status = useAppSelector(selectTrackListStatus)

  const handlePageChange = (newPage: number) => {
    void dispatch(
      loadTracks({ ...trackListQuery, page: newPage, limit: limit }),
    )
  }

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value, 10)
    void dispatch(loadTracks({ page: 1, limit: newLimit, ...trackListQuery }))
  }

  return (
    <div className={styles.pagination}>
      <div>
        <Button
          onClick={() => {
            handlePageChange(page - 1)
          }}
          disabled={page === 1 || status === "loading"}
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages}
        </span>
        <Button
          onClick={() => {
            handlePageChange(page + 1)
          }}
          disabled={page === totalPages || status === "loading"}
        >
          Next
        </Button>
      </div>
      <PageLimitSelect
        totalPages={total}
        limit={limit}
        onChange={handleLimitChange}
        status={status}
      />
    </div>
  )
}
