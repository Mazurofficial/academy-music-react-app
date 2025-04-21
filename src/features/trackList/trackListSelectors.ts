import type { RootState } from "../../app/store"
import type { Track } from "../../types/track"

export const selectAllTrackList = (state: RootState) => state.tracks.list
export const selectTrackListStatus = (state: RootState) => state.tracks.status
export const selectTrackById = (state: RootState, id: Track["id"]) => {
  return state.tracks.list.find(track => track.id === id)
}
