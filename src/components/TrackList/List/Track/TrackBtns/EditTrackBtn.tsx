import { useAppDispatch } from "../../../../../app/hooks"
import {
  openModal,
  setModalEdit,
} from "../../../../../features/modalWindow/modalWindowSlice"
import type { Track } from "../../../../../types/track"
import Button from "../../../../ui/Button/Button"
import styles from "./TrackBtns.module.scss"

type EditTrackBtnProps = {
  id: Track["id"]
}

export default function EditTrackBtn({ id }: EditTrackBtnProps) {
  const dispatch = useAppDispatch()

  // Open modal window with editting track form
  const handleEditTrack = () => {
    dispatch(setModalEdit(id))
    dispatch(openModal())
  }

  return (
    <Button
      className={styles.iconButton}
      onClick={handleEditTrack}
      title="Edit meta"
      data-testid={`edit-track-${id}`}
    >
      <i className="fa-solid fa-pen"></i>
    </Button>
  )
}
