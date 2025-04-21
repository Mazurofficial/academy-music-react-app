import { useAppDispatch } from "../../../app/hooks"
import { addTrack } from "../../../features/trackList/trackListApiSlice"
import type { CreateTrackDto } from "../../../types/track"
import styles from "./AddTrackBtn.module.scss"

export default function AddTrackBtn() {
  const newTrack: CreateTrackDto = {
    title: "Bohemian russss",
    artist: "Justin FORKIN",
    album: "SOSAAdr",
    genres: ["Rock"],
    coverImage: "https://picsum.photos/seed/Bohemian%20Rhapsody/300/300",
  }

  const dispatch = useAppDispatch()

  const handleAddTrack = async (track: CreateTrackDto) => {
    const resultAction = await dispatch(addTrack(track))
    if (addTrack.fulfilled.match(resultAction)) {
      console.log("Track added successfully")
    } else {
      console.error("Error:", resultAction.payload)
    }
  }

  return (
    <button
      className={styles.button}
      onClick={() => void handleAddTrack(newTrack)}
    >
      <i>+</i>
      <span className={styles.buttonText}>Add track</span>
    </button>
  )
}
