import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { loadTracks } from "../../../features/trackList/trackListApiSlice"
import {
  selectTrackListMeta,
  selectTrackListQuery,
  selectTrackListStatus,
} from "../../../features/trackList/trackListSelectors"
import Button from "../../ui/Button/Button"
import styles from "./Pagination.module.scss"

export default function Pagination() {
  const dispatch = useAppDispatch()
  const { page, limit, totalPages } = useAppSelector(selectTrackListMeta)
  const trackListQuery = useAppSelector(selectTrackListQuery)
  const status = useAppSelector(selectTrackListStatus)

  // Send request to server with newPage
  const handlePageChange = (newPage: number) => {
    void dispatch(loadTracks({ ...trackListQuery, page: newPage, limit }))
  }

  return (
    <>
      {totalPages !== 1 && (
        <div className={styles.pagination} data-testid="pagination">
          <Button
            onClick={() => {
              handlePageChange(page - 1)
            }}
            disabled={page === 1 || status === "loading"}
            data-testid="pagination-prev"
          >
            Previous
          </Button>
          <span className={styles.info}>
            Page {page} of {totalPages}
          </span>
          <Button
            onClick={() => {
              handlePageChange(page + 1)
            }}
            disabled={page === totalPages || status === "loading"}
            data-testid="pagination-next"
          >
            Next
          </Button>
        </div>
      )}
    </>
  )
}
