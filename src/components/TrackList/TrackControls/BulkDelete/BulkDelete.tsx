import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import {
  clearSelectedTracks,
  deleteTracksBulk,
  toggleBulkDeleteMode,
} from "../../../../features/trackList/trackListApiSlice"
import {
  selectBulkDeleteMode,
  selectSelectedTrackIds,
} from "../../../../features/trackList/trackListSelectors"
import Button from "../../../ui/Button/Button"

export default function BulkDeleteButton() {
  const dispatch = useAppDispatch()

  const bulkDeleteMode = useAppSelector(selectBulkDeleteMode)
  const selectedTrackIds = useAppSelector(selectSelectedTrackIds)

  const handleToggle = () => dispatch(toggleBulkDeleteMode())

  const handleBulkDelete = () => {
    if (selectedTrackIds.length > 0) {
      void dispatch(deleteTracksBulk({ ids: selectedTrackIds }))
      dispatch(clearSelectedTracks())
    }
  }

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Button onClick={handleToggle}>
        {bulkDeleteMode ? "Cancel" : "Bulk Delete"}
      </Button>
      {bulkDeleteMode && selectedTrackIds.length > 0 && (
        <Button onClick={handleBulkDelete}>
          Delete Selected ({selectedTrackIds.length})
        </Button>
      )}
    </div>
  )
}
