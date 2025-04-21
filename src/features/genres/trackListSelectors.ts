import type { RootState } from "../../app/store"

export const selectAllGenres = (state: RootState) => state.genres.genres
