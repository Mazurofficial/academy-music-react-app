import type { RootState } from "../../app/store"

// Select all genres
export const selectAllGenres = (state: RootState) => state.genres.genres
