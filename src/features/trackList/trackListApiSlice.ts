import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type {
  Meta,
  TrackList,
  Track,
  UpdateTrackDto,
  CreateTrackDto,
} from "../../types/track"
import type { ExtraType } from "../../types/extra"
import type { Status } from "../../types/status"
import type { AxiosResponse } from "axios"

export const loadTrackList = createAsyncThunk<
  {
    data: {
      data: TrackList
      meta: Meta
    }
  },
  undefined,
  {
    extra: ExtraType
    rejectValue: string
  }
>(
  "tracks/load-tracks",
  async (_, { extra: { client, api }, rejectWithValue }) => {
    try {
      return await client.get(api.ALL_TRACKS)
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

type TrackListSlice = {
  status: Status
  error: string | null
  list: TrackList
}

const initialState: TrackListSlice = {
  status: "idle",
  error: null,
  list: [],
}

export const trackListSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadTrackList.pending, state => {
        state.status = "loading"
        state.error = null
      })
      .addCase(loadTrackList.rejected, (state, action) => {
        state.status = "rejected"
        state.error = action.payload ?? "Cannot load data"
      })
      .addCase(loadTrackList.fulfilled, (state, action) => {
        state.status = "received"
        state.list = action.payload.data.data
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
