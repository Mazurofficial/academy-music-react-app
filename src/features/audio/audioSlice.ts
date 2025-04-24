import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Track } from "../../types/track"

type TrackProgress = {
  id: Track["id"]
  progress: number
}

type AudioState = {
  isPlayingTrackId: Track["id"] | null
  trackProgressById: TrackProgress[]
}

const initialState: AudioState = {
  isPlayingTrackId: null,
  trackProgressById: [],
}

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    playTrack(state, action: PayloadAction<Track["id"]>) {
      const newTrackId = action.payload
      const trackIsNew = state.trackProgressById.find(t => t.id !== newTrackId)
      if (trackIsNew) {
        state.trackProgressById = []
      }
      state.isPlayingTrackId = newTrackId
    },
    stopTrack(state) {
      state.isPlayingTrackId = null
    },
    saveTrackProgress(
      state,
      action: PayloadAction<{ id: Track["id"]; progress: number }>,
    ) {
      state.trackProgressById.push({
        id: action.payload.id,
        progress: action.payload.progress,
      })
    },
  },
})

export const { playTrack, stopTrack, saveTrackProgress } = audioSlice.actions
export default audioSlice.reducer
