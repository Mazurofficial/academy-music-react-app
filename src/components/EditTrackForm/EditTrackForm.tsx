import { useAppSelector } from "../../app/hooks"
import { selectTrackById } from "../../features/trackList/trackListSelectors"
import type { UpdateTrackDto } from "../../types/track"
import Form from "../ui/Form/Form"

export type EditTrackFormProps = {
  id: UpdateTrackDto["id"]
}

export default function EditTrackForm({ id }: EditTrackFormProps) {
  const track = useAppSelector(state => selectTrackById(state, id))
  const initialFormState = {
    title: track?.title ?? "",
    artist: track?.artist ?? "",
    album: track?.album ?? "",
    genres: track?.genres ?? [],
    coverImage: track?.coverImage ?? "",
    audioFile: track?.coverImage ?? "",
  }

  return <Form id={id} initialState={initialFormState} onSubmitAction="EDIT" />
}
