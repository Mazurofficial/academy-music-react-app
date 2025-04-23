import styles from "./AddTrackForm.module.scss"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { closeModal } from "../../features/modalWindow/modalWindowSlice"
import { addTrack } from "../../features/trackList/trackListApiSlice"
import type { CreateTrackDto } from "../../types/track"
import Input from "../UI/Input/Input"
import Button from "../UI/Button/Button"
import { useState } from "react"
import { selectAllGenres } from "../../features/genres/trackListSelectors"
import MultiSelect from "../UI/MultiSelect/MultiSelect"

export default function AddTrackForm() {
  const dispatch = useAppDispatch()
  const genres = useAppSelector(selectAllGenres)

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
        [field]: value,
      }))
    }

  const handleGenreChange = (value: string[]) => {
    setFormData(prev => ({
      ...prev,
      genres: [...value],
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
    <form onSubmit={e => void handleSubmit(e)} className={styles.addTrackForm}>
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
      <MultiSelect
        label="Genres"
        name="genres"
        options={genres.map(genre => ({ label: genre, value: genre }))}
        value={formData.genres}
        onChange={handleGenreChange}
      />
      <Input
        type="text"
        label="Cover Image URL"
        value={formData.coverImage ?? ""}
        onChange={handleChange("coverImage")}
        name="coverImage"
        placeholder="https://..."
      />
      <Button type="submit">Save</Button>
    </form>
  )
}
