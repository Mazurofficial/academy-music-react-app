import type { PayloadAction } from '@reduxjs/toolkit';
import type { Status } from '@/types/status';
import type { LoadTracksT } from './schema';
import {
   type MetaT,
   type TrackListNormalizedT,
   type TrackT,
   type TrackIdT,
   type DeleteTracksBulkReturnT,
} from './schema';
import { createAppSlice } from '@/app/createAppSlice';
import normalizeTrackList from '@/utils/normalizeTrackList';

export type UploadTrackFileParams = {
   id: string;
   file: File;
};

type TrackListSlice = {
   status: Status;
   error: string | null;
   list: TrackListNormalizedT;
   meta: MetaT;
   bulkDeleteMode: boolean;
   selectedTrackIds: TrackIdT[];
};

const initialState: TrackListSlice = {
   status: 'idle',
   error: null,
   list: {
      byId: {},
      ids: [],
   },
   meta: {
      total: 0,
      page: 0,
      limit: 0,
      totalPages: 0,
   },
   bulkDeleteMode: false,
   selectedTrackIds: [],
};

export const trackListSlice = createAppSlice({
   name: 'tracks',
   initialState,
   reducers: (create) => ({
      setTracks: create.reducer((state, action: PayloadAction<LoadTracksT>) => {
         state.list = normalizeTrackList(action.payload.data);
         state.meta = action.payload.meta;
      }),
      addNewTrack: create.reducer((state, action: PayloadAction<TrackT>) => {
         state.list.byId[action.payload.id] = action.payload;
         state.list.ids.unshift(action.payload.id);
      }),
      updateExTrack: create.reducer((state, action: PayloadAction<TrackT>) => {
         state.list.byId[action.payload.id] = action.payload;
      }),
      deleteExTrack: create.reducer(
         (state, action: PayloadAction<TrackIdT>) => {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete state.list.byId[action.payload];
            state.list.ids = state.list.ids.filter(
               (id) => id !== action.payload
            );
         }
      ),
      deleteExTracksBulk: create.reducer(
         (state, action: PayloadAction<DeleteTracksBulkReturnT>) => {
            const deletedIds = action.payload.success;
            deletedIds.forEach((id) => {
               // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
               delete state.list.byId[id];
            });
            state.list.ids = state.list.ids.filter(
               (id) => !deletedIds.includes(id)
            );
         }
      ),
      uploadExTrackFile: create.reducer(
         (state, action: PayloadAction<TrackT>) => {
            state.list.byId[action.payload.id] = action.payload;
         }
      ),
      deleteExTrackFile: create.reducer(
         (state, action: PayloadAction<TrackT>) => {
            state.list.byId[action.payload.id] = action.payload;
         }
      ),
      toggleBulkDeleteMode: create.reducer((state) => {
         state.bulkDeleteMode = !state.bulkDeleteMode;
         state.selectedTrackIds = [];
      }),
      toggleTrack: create.reducer((state, action: PayloadAction<string>) => {
         if (state.selectedTrackIds.includes(action.payload)) {
            state.selectedTrackIds = state.selectedTrackIds.filter(
               (id) => id !== action.payload
            );
         } else {
            state.selectedTrackIds.push(action.payload);
         }
      }),
      selectAllTracks: create.reducer((state) => {
         state.list.ids.forEach((id) => {
            if (!state.selectedTrackIds.includes(id)) {
               state.selectedTrackIds.push(id);
            }
         });
      }),
      clearSelectedTracks: create.reducer((state) => {
         state.selectedTrackIds = [];
      }),
   }),
});

export const {
   setTracks,
   addNewTrack,
   updateExTrack,
   deleteExTrack,
   deleteExTracksBulk,
   uploadExTrackFile,
   deleteExTrackFile,
   toggleBulkDeleteMode,
   selectAllTracks,
   toggleTrack,
   clearSelectedTracks,
} = trackListSlice.actions;
