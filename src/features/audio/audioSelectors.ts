import type { RootState } from "../../app/store"

export const selectPlayingTrackId = (state: RootState) =>
  state.audio.isPlayingTrackId
