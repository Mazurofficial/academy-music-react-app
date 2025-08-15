import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import BulkDelete from '@/components/TrackList/TrackControls/BulkDelete';
import * as hooks from '@/app/hooks';
import {
   clearSelectedTracks,
   deleteExTracksBulk,
   selectAllTracks,
   toggleBulkDeleteMode,
} from '@/features/trackList/trackListSlice';
import {
   selectBulkDeleteMode,
   selectSelectedTrackIds,
   selectTrackListMeta,
} from '@/features/trackList/trackListSelectors';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import * as bulkDeleteModule from '@/apollo/mutations/bulkDeleteTracks';
import { act } from 'react-dom/test-utils';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';

describe('BulkDelete', () => {
   const dispatchMock = vi.fn();
   const defaultSelectedTrackIds = ['1', '2'];
   const defaultLimit = 10;

   beforeEach(() => {
      vi.clearAllMocks();
      vi.spyOn(hooks, 'useAppDispatch').mockReturnValue(dispatchMock);
      vi.spyOn(hooks, 'useAppSelector').mockImplementation((selector) => {
         if (selector === selectBulkDeleteMode) return false;
         if (selector === selectSelectedTrackIds) return [];
         if (selector === selectTrackListMeta) return { limit: defaultLimit };
         return undefined;
      });
      vi.spyOn(bulkDeleteModule, 'useBulkDeleteTracks').mockReturnValue({
         bulkDeleteTracks: vi.fn().mockResolvedValue({
            isOk: () => true,
            value: { success: ['1', '2'], failed: [] },
         }),
         loading: false,
         error: undefined,
      });
   });

   it('renders Bulk Delete button when not in bulk delete mode', () => {
      render(
         <MockedProvider>
            <MemoryRouter>
               <ThemeProvider theme={theme}>
                  <BulkDelete />
               </ThemeProvider>
            </MemoryRouter>
         </MockedProvider>
      );
      expect(screen.getByTestId('select-mode-toggle')).toBeInTheDocument();
      expect(screen.getByText(/Bulk Delete/i)).toBeInTheDocument();
   });

   it('toggles bulk delete mode when toggle button is clicked', () => {
      render(
         <MockedProvider>
            <MemoryRouter>
               <ThemeProvider theme={theme}>
                  <BulkDelete />
               </ThemeProvider>
            </MemoryRouter>
         </MockedProvider>
      );
      const toggleBtn = screen.getByTestId('select-mode-toggle');
      fireEvent.click(toggleBtn);
      expect(dispatchMock).toHaveBeenCalledWith(toggleBulkDeleteMode());
   });

   it('shows Cancel when in bulk delete mode', () => {
      vi.spyOn(hooks, 'useAppSelector').mockImplementation((selector) => {
         if (selector === selectBulkDeleteMode) return true;
         if (selector === selectSelectedTrackIds) return [];
         if (selector === selectTrackListMeta) return { limit: defaultLimit };
         return undefined;
      });
      render(
         <MockedProvider>
            <MemoryRouter>
               <ThemeProvider theme={theme}>
                  <BulkDelete />
               </ThemeProvider>
            </MemoryRouter>
         </MockedProvider>
      );
      expect(screen.getByText('Cancel')).toBeInTheDocument();
   });

   it('shows Select all button when in bulk delete mode and not all selected', () => {
      vi.spyOn(hooks, 'useAppSelector').mockImplementation((selector) => {
         if (selector === selectBulkDeleteMode) return true;
         if (selector === selectSelectedTrackIds) return ['1', '2'];
         if (selector === selectTrackListMeta) return { limit: 5 };
         return undefined;
      });
      render(
         <MockedProvider>
            <MemoryRouter>
               <ThemeProvider theme={theme}>
                  <BulkDelete />
               </ThemeProvider>
            </MemoryRouter>
         </MockedProvider>
      );
      expect(screen.getByTestId('select-all')).toBeInTheDocument();
   });

   it('dispatches selectAllTracks when Select all is clicked', () => {
      vi.spyOn(hooks, 'useAppSelector').mockImplementation((selector) => {
         if (selector === selectBulkDeleteMode) return true;
         if (selector === selectSelectedTrackIds) return ['1', '2'];
         if (selector === selectTrackListMeta) return { limit: 5 };
         return undefined;
      });
      render(
         <MockedProvider>
            <MemoryRouter>
               <ThemeProvider theme={theme}>
                  <BulkDelete />
               </ThemeProvider>
            </MemoryRouter>
         </MockedProvider>
      );
      const selectAllBtn = screen.getByTestId('select-all');
      fireEvent.click(selectAllBtn);
      expect(dispatchMock).toHaveBeenCalledWith(selectAllTracks());
   });

   it('shows bulk delete button when tracks are selected in bulk delete mode', () => {
      vi.spyOn(hooks, 'useAppSelector').mockImplementation((selector) => {
         if (selector === selectBulkDeleteMode) return true;
         if (selector === selectSelectedTrackIds)
            return defaultSelectedTrackIds;
         if (selector === selectTrackListMeta) return { limit: defaultLimit };
         return undefined;
      });
      render(
         <MockedProvider>
            <MemoryRouter>
               <ThemeProvider theme={theme}>
                  <BulkDelete />
               </ThemeProvider>
            </MemoryRouter>
         </MockedProvider>
      );
      expect(screen.getByTestId('bulk-delete-button')).toBeInTheDocument();
   });

   it('does not call deleteTracksBulk if no tracks are selected', () => {
      vi.spyOn(hooks, 'useAppSelector').mockImplementation((selector) => {
         if (selector === selectBulkDeleteMode) return true;
         if (selector === selectSelectedTrackIds) return [];
         if (selector === selectTrackListMeta) return { limit: defaultLimit };
         return undefined;
      });
      render(
         <MockedProvider>
            <MemoryRouter>
               <ThemeProvider theme={theme}>
                  <BulkDelete />
               </ThemeProvider>
            </MemoryRouter>
         </MockedProvider>
      );
      expect(
         screen.queryByTestId('bulk-delete-button')
      ).not.toBeInTheDocument();
   });

   it('does not dispatch deleteTracksBulk if confirm is cancelled', () => {
      vi.spyOn(hooks, 'useAppSelector').mockImplementation((selector) => {
         if (selector === selectBulkDeleteMode) return true;
         if (selector === selectSelectedTrackIds)
            return defaultSelectedTrackIds;
         if (selector === selectTrackListMeta) return { limit: defaultLimit };
         return undefined;
      });
      vi.spyOn(window, 'confirm').mockReturnValue(false);

      render(
         <MockedProvider>
            <MemoryRouter>
               <ThemeProvider theme={theme}>
                  <BulkDelete />
               </ThemeProvider>
            </MemoryRouter>
         </MockedProvider>
      );
      const deleteBtn = screen.getByTestId('bulk-delete-button');
      fireEvent.click(deleteBtn);

      expect(dispatchMock).not.toHaveBeenCalledWith(
         deleteExTracksBulk({ success: defaultSelectedTrackIds, failed: [] })
      );
   });

   it('clearSelectedTracks and Off BulkDeleteMode if confirm window', async () => {
      vi.spyOn(hooks, 'useAppSelector').mockImplementation((selector) => {
         if (selector === selectBulkDeleteMode) return true;
         if (selector === selectSelectedTrackIds)
            return defaultSelectedTrackIds;
         if (selector === selectTrackListMeta) return { limit: defaultLimit };
         return undefined;
      });
      vi.spyOn(window, 'confirm').mockReturnValue(true);

      render(
         <MockedProvider>
            <MemoryRouter>
               <ThemeProvider theme={theme}>
                  <BulkDelete />
               </ThemeProvider>
            </MemoryRouter>
         </MockedProvider>
      );
      const deleteBtn = screen.getByTestId('bulk-delete-button');
      // eslint-disable-next-line @typescript-eslint/no-deprecated, @typescript-eslint/require-await
      await act(async () => {
         fireEvent.click(deleteBtn);
      });

      // expect(dispatchMock).toHaveBeenCalledWith(
      //    deleteTracksBulk({ ids: defaultSelectedTrackIds })
      // );
      expect(dispatchMock).toHaveBeenCalledWith(clearSelectedTracks());
      expect(dispatchMock).toHaveBeenCalledWith(toggleBulkDeleteMode());
   });
});
