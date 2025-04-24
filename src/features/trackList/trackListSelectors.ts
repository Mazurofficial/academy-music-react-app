import type { RootState } from "../../app/store"
import type { Track } from "../../types/track"

// Select all tracks
export const selectAllTrackList = (state: RootState) => state.tracks.list

// Select tracklist API status
export const selectTrackListStatus = (state: RootState) => state.tracks.status

// Select specific track by ID
export const selectTrackById = (state: RootState, id: Track["id"]) => {
  return state.tracks.list.find(track => track.id === id)
}

// Select track list meta information
export const selectTrackListMeta = (state: RootState) => state.tracks.meta

// Select tracklist query items
export const selectTrackListQuery = (state: RootState) => state.tracks.query

// Select bulkdelete mode status
export const selectBulkDeleteMode = (state: RootState) =>
  state.tracks.bulkDeleteMode

// Select selected track IDs to bulk delete
export const selectSelectedTrackIds = (state: RootState) =>
  state.tracks.selectedTrackIds
