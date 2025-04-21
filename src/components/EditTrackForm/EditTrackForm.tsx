import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { editTrack } from "../../features/trackList/trackListApiSlice"
import type { UpdateTrackDto } from "../../types/track"
import Input from "../Input/Input"
import { selectTrackById } from "../../features/trackList/trackListSelectors"
import { useState } from "react"

export type EditTrackFormProps = {
  id: UpdateTrackDto["id"]
}

export default function EditTrackForm({ id }: EditTrackFormProps) {
  const dispatch = useAppDispatch()
  const track = useAppSelector(state => selectTrackById(state, id))

  const [formData, setFormData] = useState<UpdateTrackDto>({
    id: track?.id ?? "",
    title: track?.title ?? "",
    artist: track?.artist ?? "",
    album: track?.album ?? "",
    genres: track?.genres ?? [],
    coverImage: track?.coverImage ?? "",
    audioFile: track?.audioFile ?? "",
  })

  const handleChange =
    (field: keyof UpdateTrackDto) =>
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
    const resultAction = await dispatch(editTrack(formData))
    if (editTrack.fulfilled.match(resultAction)) {
      console.log("Track updated successfully")
    } else {
      console.error("Update failed:", resultAction.payload)
    }
  }

  return (
    <>
      {track ? (
        <form onSubmit={e => void handleSubmit(e)}>
          <Input
            type="text"
            label="Title"
            value={formData.title ?? ""}
            onChange={handleChange("title")}
            name="title"
            placeholder="Track title"
          />
          <Input
            type="text"
            label="Artist"
            value={formData.artist ?? ""}
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
            value={formData.genres?.join(", ") ?? ""}
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
          <Input
            type="text"
            label="Audio File URL"
            value={formData.audioFile ?? ""}
            onChange={handleChange("audioFile")}
            name="audioFile"
            placeholder="https://..."
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <p>Track not found</p>
      )}
    </>
  )
}
