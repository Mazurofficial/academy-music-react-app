import { useAppSelector } from "../../../../app/hooks"
import { selectTrackById } from "../../../../features/trackList/trackListSelectors"
import type { Track } from "../../../../types/track"
import styles from "./Track.module.scss"
import DeleteTrackBtn from "./DeleteTrackBtn/DeleteTrackBtn"
import EditTrackBtn from "../../../EditTrackBtn/EditTrackBtn"

type TrackProps = {
  id: string
}

export default function Track({ id }: TrackProps) {
  const track = useAppSelector(state => selectTrackById(state, id))

  return (
    <>
      {track && (
        <li className={styles.track} id={id}>
          <h4>{track.title}</h4>
          <h5>{track.artist}</h5>
          {track.audioFile && <audio controls src={track.audioFile}></audio>}
          <EditTrackBtn id={track.id} />
          <DeleteTrackBtn id={track.id} />
        </li>
      )}
    </>
  )
}
