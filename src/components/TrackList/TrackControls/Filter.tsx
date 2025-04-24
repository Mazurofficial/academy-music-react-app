import styles from "./TrackControls.module.scss"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { selectAllGenres } from "../../../features/genres/trackListSelectors"
import { loadGenres } from "../../../features/genres/genresSlice"
import {
  loadTracks,
  setFilter,
} from "../../../features/trackList/trackListApiSlice"
import {
  selectTrackListMeta,
  selectTrackListQuery,
} from "../../../features/trackList/trackListSelectors"
import Select from "../../ui/Select/Select" // імпортуємо наш компонент

export default function Filter() {
  const dispatch = useAppDispatch()
  const genres = useAppSelector(selectAllGenres)
  const { limit } = useAppSelector(selectTrackListMeta)
  const trackListQuery = useAppSelector(selectTrackListQuery)
  const [selectedGenre, setSelectedGenre] = useState("")

  // Load list of available genres
  useEffect(() => {
    void dispatch(loadGenres())
  }, [dispatch])

  // Send request to load tracks of selected genres
  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre)
    dispatch(setFilter(genre || undefined))
    void dispatch(
      loadTracks({
        ...trackListQuery,
        genre: genre || undefined,
        page: 1,
        limit,
      }),
    )
  }

  // Map genres to Option view
  const genreOptions = [
    { label: "All", value: "" },
    ...genres.map(genre => ({ label: genre, value: genre })),
  ]

  return (
    <div className={styles.filter}>
      <Select
        name="genre"
        label="Genre:"
        value={selectedGenre}
        onChange={handleGenreChange}
        options={genreOptions}
        data-testid="filter-genre"
      />
    </div>
  )
}
