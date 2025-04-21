import { useAppSelector } from "../../../../app/hooks"
import { selectTrackById } from "../../../../features/trackList/trackListSelectors"
import type { Track } from "../../../../types/track"
import styles from "./Track.module.scss"
import DeleteTrackBtn from "./DeleteTrackBtn/DeleteTrackBtn"
import EditTrackBtn from "../../../EditTrackBtn/EditTrackBtn"

type TrackProps = {
  id: Track["id"]
}

export default function Track({ id }: TrackProps) {
  const track = useAppSelector(state => selectTrackById(state, id))

  return (
    <>
      {track && (
        <li className={styles.track} id={id}>
          <img
            height="50px"
            width="50px"
            src={
              track.coverImage ??
              "https://demo.tutorialzine.com/2015/03/html5-music-player/assets/img/default.png"
            }
          />
          <h4>{track.title}</h4>
          <h5>- {track.artist}</h5>
          {track.album && <h5>- {track.album}</h5>}
          {track.audioFile && (
            <audio
              controls
              src={`http://localhost:3000/api/files/${track.audioFile}`}
            ></audio>
          )}
          <EditTrackBtn id={track.id} />
          <DeleteTrackBtn id={track.id} />
        </li>
      )}
    </>
  )
}
