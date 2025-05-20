import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectAllGenres } from "../../../features/genres/trackListSelectors"
import type {
  CreateTrackDto,
  Track,
  UpdateTrackDto,
} from "../../../types/track"
import styles from "./Form.module.scss"
import Input from "../Input/Input"
import GenreSelect from "../../GenreSelect/GenreSelect"
import Button from "../Button/Button"
import {
  addTrack,
  editTrack,
} from "../../../features/trackList/trackListApiSlice"
import { closeModal } from "../../../features/modalWindow/modalWindowSlice"

export type FormProps = {
  id?: Track["id"]
  initialState: CreateTrackDto | UpdateTrackDto
  onSubmitAction: "ADD" | "EDIT"
}

export default function Form({ id, initialState, onSubmitAction }: FormProps) {
  const dispatch = useAppDispatch()
  const genres = useAppSelector(selectAllGenres)
  const [formData, setFormData] = useState(initialState)
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
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value,
      }))
    }

  // onSelect for genre select field
  const handleGenreChange = (value: string[]) => {
    setFormData(prev => ({
      ...prev,
      genres: [...value],
    }))
  }

  //   onSubmit for form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const resultAction = await dispatch(
      onSubmitAction === "EDIT" && id
        ? editTrack({ id, ...formData })
        : addTrack(formData),
    )
    if (
      addTrack.fulfilled.match(resultAction) ||
      editTrack.fulfilled.match(resultAction)
    ) {
      setFormData(initialState)
      dispatch(closeModal())
      console.log(
        onSubmitAction === "ADD"
          ? "Track added successfully"
          : "Track updated successfully",
      )
    } else {
      console.error("Adding/Updating failed")
    }
  }

  return (
    <form
      onSubmit={e => void handleSubmit(e)}
      className={styles.Form}
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
