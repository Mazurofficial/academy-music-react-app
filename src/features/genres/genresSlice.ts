import type { Status } from '@/types/status';
import { createAppSlice } from '@/app/createAppSlice';
import type { PayloadAction } from '@reduxjs/toolkit';

type GenresSlice = {
   status: Status;
   error: string | null;
   genres: string[];
};

const initialState: GenresSlice = {
   status: 'idle',
   error: null,
   genres: [],
};

export const genresSlice = createAppSlice({
   name: 'genres',
   initialState,
   reducers: (create) => ({
      setGenres: create.reducer((state, action: PayloadAction<string[]>) => {
         state.genres = action.payload;
      }),
   }),
});

export const { setGenres } = genresSlice.actions;
