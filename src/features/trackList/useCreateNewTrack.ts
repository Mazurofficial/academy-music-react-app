import { useAppDispatch } from "../../app/hooks"
import type { Track } from "../../types/track"
import { addTrack, loadTrackList } from "./trackListApiSlice"

export const useCreateNewTrack = (track: Track) => {
  const dispatch = useAppDispatch()

  const handleAddTrack = async (track: Track) => {
    const resultAction = await dispatch(addTrack(track))
    await dispatch(loadTrackList())
    if (addTrack.fulfilled.match(resultAction)) {
      console.log("Track added successfully")
    } else {
      console.error("Error:", resultAction.payload)
    }
  }
  void handleAddTrack(track)
}
