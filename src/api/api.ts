const BASE_URL = "http://localhost:3000"

export const ALL_GENRES = BASE_URL + "/api/genres"
export const ALL_TRACKS = BASE_URL + "/api/tracks"
export const getAllTracks = ALL_TRACKS
export const createNewTrack = ALL_TRACKS
export const getTrackBySlug = (slug: string) => ALL_TRACKS + "/" + slug
export const updateTrackById = (id: string) => ALL_TRACKS + "/" + id
export const deleteTrackById = (id: string) => ALL_TRACKS + "/" + id
export const deleteMultipleTracks = ALL_TRACKS + "/delete"
export const uploadAudioToTrackById = (id: string) =>
  ALL_TRACKS + "/" + id + "/upload"
export const deleteAudioToTrackById = (id: string) =>
  ALL_TRACKS + "/" + id + "/file"
