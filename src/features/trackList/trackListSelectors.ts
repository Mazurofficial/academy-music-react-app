import type { RootState } from '@/app/store';
import type { TrackIdT } from './schema';

// Select all tracks
export const selectAllTrackList = (state: RootState) => state.tracks.list;

// Select tracklist API status
export const selectTrackListStatus = (state: RootState) => state.tracks.status;

// Select specific track by ID
export const selectTrackById = (state: RootState, id: TrackIdT) =>
   state.tracks.list.byId[id];

// Select track list meta information
export const selectTrackListMeta = (state: RootState) => state.tracks.meta;

// Select bulkdelete mode status
export const selectBulkDeleteMode = (state: RootState) =>
   state.tracks.bulkDeleteMode;

// Select selected track IDs to bulk delete
export const selectSelectedTrackIds = (state: RootState) =>
   state.tracks.selectedTrackIds;
