import styles from "./TrackControls.module.scss"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  clearSelectedTracks,
  deleteTracksBulk,
  selectAllTracks,
  toggleBulkDeleteMode,
} from "../../../features/trackList/trackListApiSlice"
import {
  selectBulkDeleteMode,
  selectSelectedTrackIds,
  selectTrackListQuery,
} from "../../../features/trackList/trackListSelectors"
import Button from "../../ui/Button/Button"

export default function BulkDeleteButton() {
  const dispatch = useAppDispatch()
  const { limit = 10 } = useAppSelector(selectTrackListQuery)
  const bulkDeleteMode = useAppSelector(selectBulkDeleteMode)
  const selectedTrackIds = useAppSelector(selectSelectedTrackIds)

  const handleToggle = () => dispatch(toggleBulkDeleteMode())

  const handleBulkDelete = () => {
    if (
      selectedTrackIds.length > 0 &&
      window.confirm("Are you sure you want to delete this tracks?")
    ) {
      void dispatch(deleteTracksBulk({ ids: selectedTrackIds }))
      dispatch(clearSelectedTracks())
      handleToggle()
    }
  }

  const handleSelectAll = () => {
    dispatch(selectAllTracks())
  }

  return (
    <div className={styles.buttonsContainer}>
      <Button onClick={handleToggle} data-testid="select-mode-toggle">
        {bulkDeleteMode ? (
          "Cancel"
        ) : (
          <span>
            Bulk Delete <i className="fa-solid fa-trash"></i>
          </span>
        )}
      </Button>
      {bulkDeleteMode && selectedTrackIds.length < limit && (
        <Button onClick={handleSelectAll} data-testid="select-all">
          Select all
        </Button>
      )}
      {bulkDeleteMode && selectedTrackIds.length > 0 && (
        <Button
          onClick={handleBulkDelete}
          className={styles.deleteSelected}
          data-testid="bulk-delete-button"
        >
          Delete Selected ({selectedTrackIds.length})
        </Button>
      )}
    </div>
  )
}
