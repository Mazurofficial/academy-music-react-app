import { useAppSelector } from "../../app/hooks"
import AddTrackForm from "../../components/AddTrackForm/AddTrackForm"
import EditTrackForm from "../../components/EditTrackForm/EditTrackForm"
import Header from "../../components/Header/Header"
import { Modal } from "../../components/Modal/Modal"
import TrackList from "../../components/TrackList/TrackList"
import {
  selectModalType,
  selectTrackToEdit,
} from "../../features/modalWindow/modalWindowSelector"
import styles from "./TracksPage.module.scss"

export default function TracksPage() {
  const modalWindowType = useAppSelector(selectModalType)
  const trackToEdit = useAppSelector(selectTrackToEdit)

  return (
    <div className={styles.tracksPage}>
      <Header />
      <TrackList />
      <Modal>
        {modalWindowType === "add" ? (
          <AddTrackForm />
        ) : (
          <EditTrackForm id={trackToEdit ?? ""} />
        )}
      </Modal>
    </div>
  )
}
