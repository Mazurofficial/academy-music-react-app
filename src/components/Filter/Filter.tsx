import type React from "react"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectAllGenres } from "../../features/genres/trackListSelectors"
import { loadGenres } from "../../features/genres/genresSlice"
import {
  loadTracks,
  setFilter,
} from "../../features/trackList/trackListApiSlice"
import {
  selectTrackListMeta,
  selectTrackListQuery,
} from "../../features/trackList/trackListSelectors"

export const Filter = () => {
  const dispatch = useAppDispatch()
  const genres = useAppSelector(selectAllGenres)
  const { page, limit } = useAppSelector(selectTrackListMeta)
  const trackListQuery = useAppSelector(selectTrackListQuery)
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>("All")

  useEffect(() => {
    void dispatch(loadGenres())
  }, [dispatch])

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genre = e.target.value || undefined
    setSelectedGenre(genre)
    console.log(genre)
    dispatch(setFilter({ genre }))
    void dispatch(loadTracks({ ...trackListQuery, genre, page, limit }))
  }

  return (
    <div className="flex gap-4 items-center">
      <label className="flex flex-col">
        Genre:
        <select
          value={selectedGenre ?? ""}
          onChange={handleGenreChange}
          className="p-1 border rounded"
        >
          <option value="">All</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
