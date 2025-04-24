import styles from "./TrackBtns.module.scss"
import { useAppDispatch } from "../../../../../app/hooks"
import { deleteTrack } from "../../../../../features/trackList/trackListApiSlice"
import type { Track } from "../../../../../types/track"
import Button from "../../../../ui/Button/Button"

type DeleteTrackBtnProps = {
  id: Track["id"]
}

export default function DeleteTrackBtn({ id }: DeleteTrackBtnProps) {
  const dispatch = useAppDispatch()

  // Delete track by id
  const handleDeleteTrack = async (id: string) => {
    const result = await dispatch(deleteTrack(id))
    if (deleteTrack.fulfilled.match(result)) {
      console.log("Track deleted successfully")
    } else {
      console.error("Delete failed:", result.payload)
    }
  }

  // Open dialog window with deleting acceptance
  const handleDeleteClick = (id: string) => {
    if (window.confirm("Are you sure you want to delete this track?")) {
      void handleDeleteTrack(id)
    }
  }

  return (
    <Button
      className={`${styles.iconButton} ${styles.deleteButton}`}
      onClick={() => {
        handleDeleteClick(id)
      }}
      title="Delete track"
      data-testid={`delete-track-${id}`}
    >
      <i className="fa-solid fa-trash"></i>
    </Button>
  )
}
