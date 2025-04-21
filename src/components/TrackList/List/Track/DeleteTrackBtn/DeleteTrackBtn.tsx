import { useAppDispatch } from "../../../../../app/hooks"
import { deleteTrack } from "../../../../../features/trackList/trackListApiSlice"
import type { Track } from "../../../../../types/track"
import Button from "../../../../Button/Button"

type DeleteTrackBtnProps = {
  id: Track["id"]
}

export default function DeleteTrackBtn({ id }: DeleteTrackBtnProps) {
  const dispatch = useAppDispatch()

  const handleDeleteTrack = async (id: string) => {
    const result = await dispatch(deleteTrack(id))
    if (deleteTrack.fulfilled.match(result)) {
      console.log("Track deleted successfully")
    } else {
      console.error("Delete failed:", result.payload)
    }
  }

  const handleDeleteClick = (id: string) => {
    if (window.confirm("Are you sure you want to delete this track?")) {
      void handleDeleteTrack(id)
    }
  }

  return (
    <Button
      onClick={() => {
        handleDeleteClick(id)
      }}
    >
      X
    </Button>
  )
}
