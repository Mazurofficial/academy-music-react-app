import { useAppDispatch } from "../../../../../app/hooks"
import {
  openModal,
  setModalUpload,
} from "../../../../../features/modalWindow/modalWindowSlice"
import type { Track } from "../../../../../types/track"
import Button from "../../../../ui/Button/Button"
import styles from "./TrackBtns.module.scss"

type UploadAudioFileBtnProps = {
  id: Track["id"]
}

export default function UploadAudioFileBtn({ id }: UploadAudioFileBtnProps) {
  const dispatch = useAppDispatch()

  // Open modal window with uploading audio file functionality
  const handleUploadAudio = () => {
    dispatch(setModalUpload(id))
    dispatch(openModal())
  }

  return (
    <Button
      className={styles.iconButton}
      onClick={handleUploadAudio}
      title="Edit meta"
    >
      <i className="fa-solid fa-upload"></i>
    </Button>
  )
}
