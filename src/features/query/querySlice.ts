import { createAppSlice } from '@/app/createAppSlice';
import type { TrackQueryT } from '../trackList/schema';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: TrackQueryT = {
   sort: undefined,
   order: 'asc',
   search: undefined,
   genre: undefined,
   limit: 10,
};

export const querySlice = createAppSlice({
   name: 'query',
   initialState,
   reducers: (create) => ({
      setQuery: create.reducer(
         (state, action: PayloadAction<Partial<TrackQueryT>>) => {
            const { search, sort, order, genre, limit } = action.payload;
            state.search = search;
            state.order = order;
            state.genre = genre;
            state.sort = sort;
            state.limit = limit;
         }
      ),
      setSorting: create.reducer(
         (state, action: PayloadAction<Partial<TrackQueryT>>) => {
            const { sort, order } = action.payload;
            state.order = order;
            state.sort = sort;
         }
      ),
      setFilter: create.reducer(
         (state, action: PayloadAction<Partial<TrackQueryT['genre']>>) => {
            state.genre = action.payload;
            state.page = 1;
         }
      ),
      setSearch: create.reducer(
         (state, action: PayloadAction<TrackQueryT['search']>) => {
            state.search = action.payload;
            state.page = 1;
         }
      ),
   }),
});

export const { setFilter, setQuery, setSorting, setSearch } =
   querySlice.actions;
