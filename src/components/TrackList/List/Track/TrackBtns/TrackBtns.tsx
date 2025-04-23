import type { Track } from "../../../../../types/track"
import DeleteTrackBtn from "./DeleteTrackBtn/DeleteTrackBtn"
import EditTrackBtn from "./EditTrackBtn/EditTrackBtn"
import styles from "./TrackBtns.module.scss"
import UploadAudioFileBtn from "./UploadAudioFileBtn/UploadAudioFileBtn"

type TrackBtnsProps = {
  id: Track["id"]
}

export default function TrackBtns({ id }: TrackBtnsProps) {
  return (
    <div className={styles.buttonsContainer}>
      <EditTrackBtn id={id} />
      <UploadAudioFileBtn id={id} />
      <DeleteTrackBtn id={id} />
    </div>
  )
}
