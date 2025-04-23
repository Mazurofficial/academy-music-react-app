const BASE_URL = "http://localhost:8000"

export const ALL_GENRES = BASE_URL + "/api/genres"
export const ALL_TRACKS = BASE_URL + "/api/tracks"
export const getAllTracks = ALL_TRACKS
export const getTracks = (pageLimit?: number, currentPage?: number) => {
  if (pageLimit && currentPage) {
    return `${ALL_TRACKS}?page=${currentPage.toString()}&limit=${pageLimit.toString()}`
  } else if (pageLimit) {
    return `${ALL_TRACKS}?limit=${pageLimit.toString()}`
  } else if (currentPage) {
    return `${ALL_TRACKS}?page=${currentPage.toString()}`
  } else {
    return ALL_TRACKS
  }
}
export const getAudioFile = (fileName: string) =>
  BASE_URL + "/api/files/" + fileName
export const createNewTrack = ALL_TRACKS
export const getTrackBySlug = (slug: string) => ALL_TRACKS + "/" + slug
export const updateTrackById = (id: string) => ALL_TRACKS + "/" + id
export const deleteTrackById = (id: string) => ALL_TRACKS + "/" + id
export const deleteMultipleTracks = ALL_TRACKS + "/delete"
export const uploadAudioToTrackById = (id: string) =>
  ALL_TRACKS + "/" + id + "/upload"
export const deleteAudioToTrackById = (id: string) =>
  ALL_TRACKS + "/" + id + "/file"
