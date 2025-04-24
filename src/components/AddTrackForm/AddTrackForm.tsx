import styles from "./AddTrackForm.module.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { closeModal } from "../../features/modalWindow/modalWindowSlice"
import { addTrack } from "../../features/trackList/trackListApiSlice"
import type { CreateTrackDto } from "../../types/track"
import Input from "../ui/Input/Input"
import Button from "../ui/Button/Button"
import { useState } from "react"
import { selectAllGenres } from "../../features/genres/trackListSelectors"
import GenreSelect from "../GenreSelect/GenreSelect"

export default function AddTrackForm() {
  const initialFormState: CreateTrackDto = {
    title: "",
    artist: "",
    album: "",
    genres: [],
    coverImage: "",
  }

  const dispatch = useAppDispatch()
  const genres = useAppSelector(selectAllGenres)
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Form validation function
  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.length > 30) {
      newErrors.title = "Title must be less than 30 characters"
    }

    if (!formData.artist.trim()) {
      newErrors.artist = "Artist is required"
    } else if (formData.artist.length > 30) {
      newErrors.artist = "Artist must be less than 30 characters"
    }

    if (formData.album && formData.album.length > 30) {
      newErrors.album = "Album must be less than 30 characters"
    }

    if (formData.coverImage?.trim()) {
      const urlRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i
      if (!urlRegex.test(formData.coverImage)) {
        newErrors.coverImage = "Invalid image URL format"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // onChange for text inputs
  const handleChange =
    (field: keyof CreateTrackDto) =>
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
    const resultAction = await dispatch(addTrack(formData))
    if (addTrack.fulfilled.match(resultAction)) {
      setFormData(initialFormState)
      dispatch(closeModal())
      console.log("Track added successfully")
    } else {
      console.error("Adding failed:", resultAction.payload)
    }
  }

  return (
    <form
      onSubmit={e => void handleSubmit(e)}
      className={styles.addTrackForm}
      data-testid="track-form"
    >
      <Input
        type="text"
        label="Title"
        value={formData.title}
        onChange={handleChange("title")}
        name="title"
        placeholder="Track title"
        error={errors.title}
        data-testid="input-title"
      />
      <Input
        type="text"
        label="Artist"
        value={formData.artist}
        onChange={handleChange("artist")}
        name="artist"
        placeholder="Artist name"
        error={errors.artist}
        data-testid="input-artist"
      />
      <Input
        type="text"
        label="Album"
        value={formData.album ?? ""}
        onChange={handleChange("album")}
        name="album"
        placeholder="Album title"
        error={errors.album}
        data-testid="input-album"
      />
      <GenreSelect
        availableGenres={genres}
        selectedGenres={formData.genres}
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
        data-testid="input-cover-image"
      />
      <Button type="submit" data-testid="submit-button">
        Save
      </Button>
    </form>
  )
}
