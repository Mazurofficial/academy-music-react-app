import type React from "react"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { loadTracks } from "../../features/trackList/trackListApiSlice"
import { selectTrackListMeta } from "../../features/trackList/trackListSelectors"

const sortOptions = [
  { label: "Title", value: "title" },
  { label: "Artist", value: "artist" },
  { label: "Album", value: "album" },
  { label: "Created At", value: "createdAt" },
]

const orderOptions = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
]

export const Sorting = () => {
  const dispatch = useAppDispatch()
  const { page, limit } = useAppSelector(selectTrackListMeta)
  const [sort, setSort] = useState<string | undefined>()
  const [order, setOrder] = useState<"asc" | "desc">("asc")

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value || undefined
    setSort(newSort)
    void dispatch(loadTracks({ sort: newSort, order, page, limit }))
  }

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = e.target.value as "asc" | "desc"
    setOrder(newOrder)
    void dispatch(loadTracks({ sort, order: newOrder, page, limit }))
  }

  return (
    <div className="flex gap-4 items-center">
      <label className="flex flex-col">
        Sort by:
        <select
          value={sort ?? ""}
          onChange={handleSortChange}
          className="p-1 border rounded"
        >
          <option value="">--</option>
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col">
        Order:
        <select
          value={order}
          onChange={handleOrderChange}
          className="p-1 border rounded"
        >
          {orderOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
