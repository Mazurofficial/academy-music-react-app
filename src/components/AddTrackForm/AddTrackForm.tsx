import { useAppDispatch } from "../../app/hooks"
import { closeModal } from "../../features/modalWindow/modalWindowSlice"
import { addTrack } from "../../features/trackList/trackListApiSlice"
import type { CreateTrackDto } from "../../types/track"
import Input from "../Input/Input"
import { useState } from "react"

export default function AddTrackForm() {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState<CreateTrackDto>({
    title: "",
    artist: "",
    album: "",
    genres: [],
    coverImage: "",
  })

  const handleChange =
    (field: keyof CreateTrackDto) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setFormData(prev => ({
        ...prev,
        [field]:
          field === "genres" ? value.split(",").map(str => str.trim()) : value,
      }))
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(closeModal())
    const resultAction = await dispatch(addTrack(formData))
    if (addTrack.fulfilled.match(resultAction)) {
      console.log("Track added successfully")
    } else {
      console.error("Update failed:", resultAction.payload)
    }
  }

  return (
    <form onSubmit={e => void handleSubmit(e)}>
      <Input
        type="text"
        label="Title"
        value={formData.title}
        onChange={handleChange("title")}
        name="title"
        placeholder="Track title"
      />
      <Input
        type="text"
        label="Artist"
        value={formData.artist}
        onChange={handleChange("artist")}
        name="artist"
        placeholder="Artist name"
      />
      <Input
        type="text"
        label="Album"
        value={formData.album ?? ""}
        onChange={handleChange("album")}
        name="album"
        placeholder="Album title"
      />
      <Input
        type="text"
        label="Genres (comma-separated)"
        value={formData.genres.join(", ")}
        onChange={handleChange("genres")}
        name="genres"
        placeholder="e.g. Rock, Pop"
      />
      <Input
        type="text"
        label="Cover Image URL"
        value={formData.coverImage ?? ""}
        onChange={handleChange("coverImage")}
        name="coverImage"
        placeholder="https://..."
      />
      <button type="submit">Save</button>
    </form>
  )
}
