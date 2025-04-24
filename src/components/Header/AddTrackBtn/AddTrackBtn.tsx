import { useAppDispatch } from "../../../app/hooks"
import {
  openModal,
  setModalAdd,
} from "../../../features/modalWindow/modalWindowSlice"
import Button from "../../ui/Button/Button"
import styles from "./AddTrackBtn.module.scss"

export default function AddTrackBtn() {
  const dispatch = useAppDispatch()

  // open modalwindow with AddTrackForm
  const handleAddTrack = () => {
    dispatch(openModal())
    dispatch(setModalAdd())
  }

  return (
    <Button
      className={styles.button}
      onClick={handleAddTrack}
      data-testid="create-track-button"
    >
      <i className="fa fa-plus" />
      <span className={styles.buttonText}> Add track</span>
    </Button>
  )
}
