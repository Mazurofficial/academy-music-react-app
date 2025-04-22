// store.ts або audioSlice.ts
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { Track } from "../../types/track"

type AudioState = {
  isPlayingTrackId: Track["id"] | null
}

const initialState: AudioState = {
  isPlayingTrackId: null,
}

export const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    playTrack(state, action: PayloadAction<Track["id"]>) {
      state.isPlayingTrackId = action.payload
    },
    stopTrack(state) {
      state.isPlayingTrackId = null
    },
  },
})

export const { playTrack, stopTrack } = audioSlice.actions
