import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type {
  Meta,
  TrackList,
  Track,
  UpdateTrackDto,
  CreateTrackDto,
  TrackQuery,
} from "../../types/track"
import type { ExtraType } from "../../types/extra"
import type { Status } from "../../types/status"

export const loadTracks = createAsyncThunk<
  {
    data: {
      data: TrackList
      meta: Meta
    }
  },
  {
    limit?: number
    page?: number
    sort?: string
    order?: "asc" | "desc"
    search?: string
    genre?: string
    artist?: string
  },
  {
    extra: ExtraType
    rejectValue: string
  }
>(
  "tracks/load-tracks",
  async (params, { extra: { client, api }, rejectWithValue }) => {
    const queryParams = new URLSearchParams()

    if (params.limit) queryParams.append("limit", params.limit.toString())
    if (params.page) queryParams.append("page", params.page.toString())
    if (params.sort) queryParams.append("sort", params.sort)
    if (params.order) queryParams.append("order", params.order)
    if (params.search) queryParams.append("search", params.search)
    if (params.genre) queryParams.append("genre", params.genre)
    if (params.artist) queryParams.append("artist", params.artist)

    const queryString = queryParams.toString()
    const url = `${api.ALL_TRACKS}?${queryString}`

    try {
      return await client.get(url)
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message)
      return rejectWithValue("Unknown error")
    }
  },
)

export const addTrack = createAsyncThunk<
  Track, // return type
  CreateTrackDto, // argument type (track to add)
  {
    extra: ExtraType
    rejectValue: string
  }
>(
  "tracks/add-track",
  async (newTrack, { extra: { client, api }, rejectWithValue }) => {
    try {
      const response = await client.post<Track>(api.createNewTrack, newTrack)
      return response.data
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message)
      return rejectWithValue("Unknown error")
    }
  },
)

export const editTrack = createAsyncThunk<
  Track, // returned updated track
  UpdateTrackDto, // input: edited track
  {
    extra: ExtraType
    rejectValue: string
  }
>(
  "tracks/edit-track",
  async (updatedTrack, { extra: { client, api }, rejectWithValue }) => {
    const { id, ...newMeta } = updatedTrack
    try {
      const response = await client.put<Track>(api.updateTrackById(id), newMeta)
      return response.data
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message)
      return rejectWithValue("Unknown error")
    }
  },
)

export const deleteTrack = createAsyncThunk<
  string, // return type: deleted track ID
  string, // input: track ID to delete
  {
    extra: ExtraType
    rejectValue: string
  }
>(
  "tracks/delete-track",
  async (trackId, { extra: { client, api }, rejectWithValue }) => {
    try {
      await client.delete(api.deleteTrackById(trackId))
      return trackId
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message)
      return rejectWithValue("Unknown error")
    }
  },
)

export type UploadTrackFileParams = {
  id: string
  file: File
}

export const uploadTrackFile = createAsyncThunk<
  Track, // returned track
  UploadTrackFileParams, // input { id, file }
  {
    extra: ExtraType
    rejectValue: string
  }
>(
  "tracks/upload-file",
  async ({ id, file }, { extra: { client, api }, rejectWithValue }) => {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await client.post(
        api.uploadAudioToTrackById(id),
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      )

      return response.data as Track
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message)
      return rejectWithValue("Unknown error")
    }
  },
)

type TrackListSlice = {
  status: Status
  error: string | null
  list: TrackList
  meta: Meta
  query: TrackQuery
}

const initialState: TrackListSlice = {
  status: "idle",
  error: null,
  list: [],
  meta: {
    total: 0,
    page: 0,
    limit: 0,
    totalPages: 0,
  },
  query: {
    page: 1,
    limit: 5,
    sort: undefined,
    order: "asc",
    search: undefined,
    genre: undefined,
    artist: undefined,
  },
}

export const trackListSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    // setSorting: (
    //   state,
    //   action: PayloadAction<
    //     Partial<{ sort: TrackQuery["sort"]; order: TrackQuery["order"] }>
    //   >,
    // ) => {
    //   state.query = {
    //     ...state.query,
    //     ...action.payload,
    //     page: 1, // Reset page on new sort
    //   }
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(loadTracks.pending, state => {
        state.status = "loading"
        state.error = null
      })
      .addCase(loadTracks.rejected, (state, action) => {
        state.status = "rejected"
        state.error = action.payload ?? "Cannot load data"
      })
      .addCase(loadTracks.fulfilled, (state, action) => {
        state.status = "received"
        state.list = action.payload.data.data
        state.meta = action.payload.data.meta
      })
      .addCase(addTrack.pending, state => {
        state.status = "loading"
        state.error = null
      })
      .addCase(addTrack.rejected, (state, action) => {
        state.status = "rejected"
        state.error = action.payload ?? "Failed to add track"
      })
      .addCase(addTrack.fulfilled, (state, action) => {
        state.status = "received"
        state.list.unshift(action.payload)
      })
      .addCase(editTrack.pending, state => {
        state.status = "loading"
        state.error = null
      })
      .addCase(editTrack.rejected, (state, action) => {
        state.status = "rejected"
        state.error = action.payload ?? "Failed to update track"
      })
      .addCase(editTrack.fulfilled, (state, action) => {
        state.status = "received"
        const index = state.list.findIndex(
          track => track.id === action.payload.id,
        )
        if (index !== -1) {
          state.list[index] = action.payload
        }
      })
      .addCase(deleteTrack.pending, state => {
        state.status = "loading"
        state.error = null
      })
      .addCase(deleteTrack.rejected, (state, action) => {
        state.status = "rejected"
        state.error = action.payload ?? "Failed to delete track"
      })
      .addCase(deleteTrack.fulfilled, (state, action) => {
        state.status = "received"
        state.list = state.list.filter(track => track.id !== action.payload)
      })
  },
})
