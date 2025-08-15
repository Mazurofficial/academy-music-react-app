import type { RootState } from '@/app/store';

// Select tracklist query items
export const selectTrackListQuery = (state: RootState) => state.query;
