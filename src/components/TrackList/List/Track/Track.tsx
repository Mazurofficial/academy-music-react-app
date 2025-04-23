import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import {
  selectBulkDeleteMode,
  selectSelectedTrackIds,
  selectTrackById,
} from "../../../../features/trackList/trackListSelectors"
import type { Track } from "../../../../types/track"
import styles from "./Track.module.scss"
import CoverImage from "./CoverImage/CoverImage"
import TrackInfo from "./TrackInfo/TrackInfo"
import Audio from "./Audio/Audio"
import TrackBtns from "./TrackBtns/TrackBtns"
import {
  selectTrack,
  unselectTrack,
} from "../../../../features/trackList/trackListApiSlice"

type TrackProps = {
  id: Track["id"]
}

export default function Track({ id }: TrackProps) {
  const dispatch = useAppDispatch()
  const track = useAppSelector(state => selectTrackById(state, id))
  const bulkDeleteMode = useAppSelector(selectBulkDeleteMode)
  const selectedTrackIds = useAppSelector(selectSelectedTrackIds)
  const isSelected = selectedTrackIds.includes(id)

  const handleSelect = () => {
    if (isSelected) {
      dispatch(unselectTrack(id))
    } else {
      dispatch(selectTrack(id))
    }
  }

  return (
    <>
      {track && (
        <li className={styles.track} id={id}>
          {bulkDeleteMode && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleSelect}
            />
          )}
          <CoverImage id={id} />
          <TrackInfo id={id} />
          <Audio id={id} />
          <TrackBtns id={id} />
        </li>
      )}
    </>
  )
}
