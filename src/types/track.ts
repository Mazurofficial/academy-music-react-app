export type Track = {
  /** Unique identifier for the track */
  id: string
  /** Title of the track */
  title: string
  /** Artist who created the track */
  artist: string
  /** Optional album the track belongs to */
  album?: string
  /** List of genres associated with the track */
  genres: string[]
  /** URL-friendly version of the title (kebab-case) */
  slug: string
  /** Optional URL to the track's cover image */
  coverImage?: string
  /** Optional filename of the uploaded audio file */
  audioFile?: string
  /** ISO timestamp of when the track was created */
  createdAt: string
  /** ISO timestamp of when the track was last updated */
  updatedAt: string
}

/**
 * DTOs (Data Transfer Objects)
 */

/**
 * Data required to create a new track
 */
export type CreateTrackDto = {
  /** Title of the track */
  title: string
  /** Artist who created the track */
  artist: string
  /** Optional album the track belongs to */
  album?: string
  /** List of genres associated with the track */
  genres: string[]
  /** Optional URL to the track's cover image */
  coverImage?: string
}

/**
 * Data for updating an existing track (all fields optional)
 */
export type UpdateTrackDto = {
  id: string
  /** New title for the track */
  title: string
  /** New artist for the track */
  artist: string
  /** New album for the track */
  album?: string
  /** New genres for the track */
  genres: string[]
  /** New cover image URL for the track */
  coverImage?: string
  /** New audio file for the track */
  audioFile?: string
}

export type TrackList = Track[]

export type Meta = {
  total: number
  page: number
  limit: number
  totalPages: number
}

export type TrackQuery = {
  page?: number
  limit?: number
  sort?: "title" | "artist" | "album" | "createdAt"
  order?: "asc" | "desc"
  search?: string
  genre?: string
  artist?: string
}
