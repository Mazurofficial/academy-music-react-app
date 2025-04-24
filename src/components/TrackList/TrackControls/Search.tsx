import styles from "./TrackControls.module.scss"
import type { ChangeEvent } from "react"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  selectTrackListMeta,
  selectTrackListQuery,
} from "../../../features/trackList/trackListSelectors"
import {
  loadTracks,
  setSearch,
} from "../../../features/trackList/trackListApiSlice"
import Input from "../../ui/Input/Input"

export default function Search() {
  const dispatch = useAppDispatch()
  const { limit } = useAppSelector(selectTrackListMeta)
  const trackListQuery = useAppSelector(selectTrackListQuery)
  const isFirstRender = useRef(true)

  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    // Skip first render
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const timeoutId = setTimeout(() => {
      dispatch(setSearch(searchInput || undefined))

      // avoid duplicating `search` in trackListQuery
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { search, ...queryWithoutSearch } = trackListQuery

      // Load searching results from server
      void dispatch(
        loadTracks({
          ...queryWithoutSearch,
          search: searchInput || undefined,
          page: 1,
          limit,
        }),
      )
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  // Handle search input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  return (
    <Input
      label="Search:"
      name="search"
      placeholder="Search by title, artist, album..."
      type="text"
      value={searchInput}
      onChange={handleChange}
      className={styles.search}
      data-testid="search-input"
    />
  )
}
