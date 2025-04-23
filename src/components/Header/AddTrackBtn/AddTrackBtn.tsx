import { useAppDispatch } from "../../../app/hooks"
import {
  openModal,
  setModalAdd,
} from "../../../features/modalWindow/modalWindowSlice"
import Button from "../../UI/Button/Button"
import styles from "./AddTrackBtn.module.scss"

export default function AddTrackBtn() {
  const dispatch = useAppDispatch()

  const handleAddTrack = () => {
    dispatch(openModal())
    dispatch(setModalAdd())
  }

  return (
    <Button className={styles.button} onClick={handleAddTrack}>
      <i>+</i>
      <span className={styles.buttonText}>Add track</span>
    </Button>
  )
}
