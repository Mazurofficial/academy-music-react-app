import type { RootState } from "../../app/store"
import type { Track } from "../../types/track"

export const selectAllTrackList = (state: RootState) => state.tracks.list
export const selectTrackListStatus = (state: RootState) => state.tracks.status
export const selectTrackById = (state: RootState, id: Track["id"]) => {
  return state.tracks.list.find(track => track.id === id)
}
export const selectTrackListMeta = (state: RootState) => state.tracks.meta
export const selectTrackListQuery = (state: RootState) => state.tracks.query

export const selectBulkDeleteMode = (state: RootState) =>
  state.tracks.bulkDeleteMode
export const selectSelectedTrackIds = (state: RootState) =>
  state.tracks.selectedTrackIds
