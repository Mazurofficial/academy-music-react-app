import styles from "./EditTrackForm.module.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { editTrack } from "../../features/trackList/trackListApiSlice"
import type { UpdateTrackDto } from "../../types/track"
import Input from "../ui/Input/Input"
import { selectTrackById } from "../../features/trackList/trackListSelectors"
import { useState } from "react"
import { closeModal } from "../../features/modalWindow/modalWindowSlice"
import Button from "../ui/Button/Button"
import { selectAllGenres } from "../../features/genres/trackListSelectors"
import GenreSelect from "../GenreSelect/GenreSelect"

export type EditTrackFormProps = {
  id: UpdateTrackDto["id"]
}

export default function EditTrackForm({ id }: EditTrackFormProps) {
  const dispatch = useAppDispatch()
  const track = useAppSelector(state => selectTrackById(state, id))
  const genres = useAppSelector(selectAllGenres)

  const [formData, setFormData] = useState<UpdateTrackDto>({
    id: track?.id ?? "",
    title: track?.title ?? "",
    artist: track?.artist ?? "",
    album: track?.album ?? "",
    genres: track?.genres ?? [],
    coverImage: track?.coverImage ?? "",
    audioFile: track?.audioFile ?? "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Form validation function
  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title?.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.length > 30) {
      newErrors.title = "Title must be less than 30 characters"
    }

    if (!formData.artist?.trim()) {
      newErrors.artist = "Artist is required"
    } else if (formData.artist.length > 30) {
      newErrors.artist = "Artist must be less than 30 characters"
    }

    if (formData.album && formData.album.length > 30) {
      newErrors.album = "Album must be less than 30 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // onChange for text inputs
  const handleChange =
    (field: keyof UpdateTrackDto) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }))
    }

  // onSelect for genre select field
  const handleGenreChange = (value: string[]) => {
    setFormData(prev => ({
      ...prev,
      genres: [...value],
    }))
  }

  // onSubmit for form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const resultAction = await dispatch(editTrack(formData))
    if (editTrack.fulfilled.match(resultAction)) {
      dispatch(closeModal())
      console.log("Track updated successfully")
    } else {
      console.error("Update failed:", resultAction.payload)
    }
  }

  return (
    <>
      {track ? (
        <form
          className={styles.editTrackForm}
          onSubmit={e => void handleSubmit(e)}
        >
          <Input
            type="text"
            label="Title"
            value={formData.title ?? ""}
            onChange={handleChange("title")}
            name="title"
            placeholder="Track title"
            error={errors.title}
          />
          <Input
            type="text"
            label="Artist"
            value={formData.artist ?? ""}
            onChange={handleChange("artist")}
            name="artist"
            placeholder="Artist name"
            error={errors.artist}
          />
          <Input
            type="text"
            label="Album"
            value={formData.album ?? ""}
            onChange={handleChange("album")}
            name="album"
            placeholder="Album title"
            error={errors.album}
          />
          <GenreSelect
            availableGenres={genres}
            selectedGenres={formData.genres ?? []}
            onChange={handleGenreChange}
          />
          <Input
            type="text"
            label="Cover Image URL"
            value={formData.coverImage ?? ""}
            onChange={handleChange("coverImage")}
            name="coverImage"
            placeholder="https://..."
            error={errors.coverImage}
          />
          <Button type="submit">Save</Button>
        </form>
      ) : (
        <p>Track not found</p>
      )}
    </>
  )
}
