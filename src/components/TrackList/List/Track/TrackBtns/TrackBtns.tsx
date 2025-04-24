import { useAppDispatch, useAppSelector } from "../../../../../app/hooks"
import {
  selectTrack,
  unselectTrack,
} from "../../../../../features/trackList/trackListApiSlice"
import {
  selectBulkDeleteMode,
  selectSelectedTrackIds,
} from "../../../../../features/trackList/trackListSelectors"
import type { Track } from "../../../../../types/track"
import Checkbox from "../../../../ui/Checkbox/Checkbox"
import DeleteTrackBtn from "./DeleteTrackBtn"
import EditTrackBtn from "./EditTrackBtn"
import styles from "./TrackBtns.module.scss"
import UploadAudioFileBtn from "./UploadAudioFileBtn"

type TrackBtnsProps = {
  id: Track["id"]
}

export default function TrackBtns({ id }: TrackBtnsProps) {
  const dispatch = useAppDispatch()
  const bulkDeleteMode = useAppSelector(selectBulkDeleteMode)
  const selectedTrackIds = useAppSelector(selectSelectedTrackIds)
  const isSelected = selectedTrackIds.includes(id)

  // Select track for deleting
  const handleSelect = () => {
    if (isSelected) {
      dispatch(unselectTrack(id))
    } else {
      dispatch(selectTrack(id))
    }
  }

  return (
    <div className={styles.buttonsContainer}>
      <EditTrackBtn id={id} />
      <UploadAudioFileBtn id={id} />
      {bulkDeleteMode ? (
        <Checkbox
          checked={isSelected}
          onChange={handleSelect}
          data-testid={`track-checkbox-${id}`}
        />
      ) : (
        <DeleteTrackBtn id={id} />
      )}
    </div>
  )
}
