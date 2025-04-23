import { useAppDispatch } from "../../../../../../app/hooks"
import {
  openModal,
  setModalUpload,
} from "../../../../../../features/modalWindow/modalWindowSlice"
import type { Track } from "../../../../../../types/track"
import Button from "../../../../../UI/Button/Button"
import styles from "./UploadAudioFileBtn.module.scss"

type UploadAudioFileBtnProps = {
  id: Track["id"]
}

export default function UploadAudioFileBtn({ id }: UploadAudioFileBtnProps) {
  const dispatch = useAppDispatch()

  const handleUploadAudio = () => {
    dispatch(setModalUpload(id))
    dispatch(openModal())
  }

  return (
    <Button
      className={styles.button}
      onClick={handleUploadAudio}
      title="Edit meta"
    >
      <i className="fa-solid fa-upload"></i>
    </Button>
  )
}
