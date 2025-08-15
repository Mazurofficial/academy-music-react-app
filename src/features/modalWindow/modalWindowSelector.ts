import type { RootState } from '@/app/store';

// Select modal window status
export const selectIsModalVisible = (state: RootState) => state.modal.isVisible;

// Select modal window type ("add" | "edit" | "upload")
export const selectModalType = (state: RootState) => state.modal.type;

// Select ID of track to edit
export const selectTrackToEdit = (state: RootState) => state.modal.trackToEdit;
