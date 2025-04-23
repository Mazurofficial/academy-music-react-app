import { useAppDispatch } from "../../../../../../app/hooks"
import {
  openModal,
  setModalEdit,
} from "../../../../../../features/modalWindow/modalWindowSlice"
import type { Track } from "../../../../../../types/track"
import Button from "../../../../../ui/Button/Button"
import styles from "./EditTrackBtn.module.scss"

type EditTrackBtnProps = {
  id: Track["id"]
}

export default function EditTrackBtn({ id }: EditTrackBtnProps) {
  const dispatch = useAppDispatch()

  const handleEditTrack = () => {
    dispatch(setModalEdit(id))
    dispatch(openModal())
  }

  return (
    <Button
      className={styles.button}
      onClick={handleEditTrack}
      title="Edit meta"
    >
      <i className="fa-solid fa-pen"></i>
    </Button>
  )
}
