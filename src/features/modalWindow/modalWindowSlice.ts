import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import type { Track } from "../../types/track"

type modalState = {
  isVisible: boolean
  type: "add" | "edit" | "upload" | undefined
  trackToEdit?: Track["id"]
}

const initialState: modalState = {
  isVisible: false,
  type: "add",
}

export const modalWindowSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: state => {
      state.isVisible = true
    },
    closeModal: state => {
      state.isVisible = false
      state.type = undefined
    },
    setModalEdit: (state, action: PayloadAction<Track["id"]>) => {
      state.type = "edit"
      state.trackToEdit = action.payload
    },
    setModalUpload: (state, action: PayloadAction<Track["id"]>) => {
      state.type = "upload"
      state.trackToEdit = action.payload
    },
    setModalAdd: state => {
      state.type = "add"
    },
  },
})

export const {
  openModal,
  closeModal,
  setModalEdit,
  setModalAdd,
  setModalUpload,
} = modalWindowSlice.actions
