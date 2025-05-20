import type { CreateTrackDto } from "../../types/track"
import Form from "../ui/Form/Form"

const initialFormState: CreateTrackDto = {
  title: "",
  artist: "",
  album: "",
  genres: [],
  coverImage: "",
}

export default function AddTrackForm() {
  return <Form initialState={initialFormState} onSubmitAction="ADD" />
}
