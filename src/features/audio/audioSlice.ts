import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TrackIdT } from '../trackList/schema';

type TrackProgress = {
   id: TrackIdT;
   progress: number;
};

type AudioState = {
   isPlayingTrackId: TrackIdT | null;
   trackProgressById: TrackProgress[];
};

const initialState: AudioState = {
   isPlayingTrackId: null,
   trackProgressById: [],
};

export const audioSlice = createSlice({
   name: 'audio',
   initialState,
   reducers: {
      // play track
      playTrack(state, action: PayloadAction<TrackIdT>) {
         const newTrackId = action.payload;
         const trackIsNew = state.trackProgressById.find(
            (t) => t.id !== newTrackId
         );
         // reset progress on previous audio if new track is played
         if (trackIsNew) {
            state.trackProgressById = [];
         }
         state.isPlayingTrackId = newTrackId;
      },
      // stop track
      stopTrack(state) {
         state.isPlayingTrackId = null;
      },
      // save track progress on pause
      saveTrackProgress(
         state,
         action: PayloadAction<{ id: TrackIdT; progress: number }>
      ) {
         const newTrackId = action.payload.id;
         const trackIsOld = state.trackProgressById.find(
            (t) => t.id === newTrackId
         );
         if (!trackIsOld) {
            state.trackProgressById.push({
               id: action.payload.id,
               progress: action.payload.progress,
            });
         } else {
            trackIsOld.progress = action.payload.progress;
         }
      },
   },
});

export const { playTrack, stopTrack, saveTrackProgress } = audioSlice.actions;
export default audioSlice.reducer;
