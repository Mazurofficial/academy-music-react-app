import type { RootState } from "./../../app/store"
export const selectIsModalVisible = (state: RootState) => state.modal.isVisible
export const selectModalType = (state: RootState) => state.modal.type
export const selectTrackToEdit = (state: RootState) => state.modal.trackToEdit
