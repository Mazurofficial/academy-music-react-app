import { useAppSelector } from "../../app/hooks"
import AddTrackForm from "../../components/AddTrackForm/AddTrackForm"
import EditTrackForm from "../../components/EditTrackForm/EditTrackForm"
import Header from "../../components/Header/Header"
import TrackList from "../../components/TrackList/TrackList"
import { Modal } from "../../components/ui/Modal/Modal"
import UploadAudioForm from "../../components/UploadAudioForm/UploadAudioForm"
import {
  selectModalType,
  selectTrackToEdit,
} from "../../features/modalWindow/modalWindowSelector"

export default function TracksPage() {
  const modalWindowType = useAppSelector(selectModalType)
  const trackToEditId = useAppSelector(selectTrackToEdit)

  return (
    <>
      <Header />
      <TrackList />
      <Modal>
        {modalWindowType === "add" && <AddTrackForm />}
        {modalWindowType === "edit" && (
          <EditTrackForm id={trackToEditId ?? ""} />
        )}
        {modalWindowType === "upload" && (
          <UploadAudioForm id={trackToEditId ?? ""} />
        )}
      </Modal>
    </>
  )
}
