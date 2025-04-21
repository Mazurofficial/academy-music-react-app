import styles from "./EditTrackForm.module.scss"
import { useAppDispatch } from "../../app/hooks"
import { editTrack } from "../../features/trackList/trackListApiSlice"
import type { UpdateTrackDto } from "../../types/track"
import Input from "../Input/Input"

export type EditTrackFormProps = {
  id: UpdateTrackDto["id"]
}

export default function EditTrackForm({ id }: EditTrackFormProps) {
  const dispatch = useAppDispatch()

  const handleEditTrack = async (track: UpdateTrackDto) => {
    const result = await dispatch(editTrack(track))
    if (editTrack.fulfilled.match(result)) {
      console.log("Track updated!")
    } else {
      console.error("Update failed:", result.payload)
    }
  }

  return (
    <form className={styles.form}>
      <Input name="title" type="text" />
      <Input name="artist" type="text" />
      <Input name="album" type="text" />
      <Input name="coverImage" type="text" placeholder="Image link" />
    </form>
  )
}
