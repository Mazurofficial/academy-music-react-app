import type { RootState } from "../../app/store"
import type { Track } from "../../types/track"

export const selectPlayingTrackId = (state: RootState) =>
  state.audio.isPlayingTrackId
export const selectTrackProgress = (id: Track["id"]) => (state: RootState) =>
  state.audio.trackProgressById.find(track => track.id === id)?.progress ?? 0
