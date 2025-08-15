import type { RootState } from '@/app/store';
import type { TrackIdT } from '../trackList/schema';

// Current playing track ID
export const selectPlayingTrackId = (state: RootState) =>
   state.audio.isPlayingTrackId;

// Array with track progress information
export const selectTrackProgress = (id: TrackIdT) => (state: RootState) =>
   state.audio.trackProgressById.find((track) => track.id === id)?.progress ??
   0;
