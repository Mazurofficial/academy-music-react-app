import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/utils/test-utils';
import Pagination from '@/components/TrackList/Pagination/Pagination';
import { MemoryRouter } from 'react-router-dom';
import LocationDisplayHelper from '@/tests/helpers/LocationDisplayHelper';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';

describe('Pagination (black-box)', () => {
   const setup = (page: number, totalPages: number) => {
      const preloadedState = {
         tracks: {
            meta: {
               page,
               totalPages,
               total: 0,
               limit: 10,
            },
            status: 'idle' as const,
            error: null,
            list: {
               byId: {},
               ids: [],
            },
            query: {},
         },
      };

      return renderWithProviders(
         <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={['?page=' + page.toString()]}>
               <Pagination />
               <LocationDisplayHelper />
            </MemoryRouter>
         </ThemeProvider>,
         {
            preloadedState: {
               tracks: {
                  ...preloadedState.tracks,
                  bulkDeleteMode: false,
                  selectedTrackIds: [],
               },
            },
         }
      );
   };

   it('renders pagination when totalPages >= 1', () => {
      setup(2, 5);
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
      expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
   });

   it('goes to next page on Next click (updates URL)', () => {
      setup(2, 5);
      fireEvent.click(screen.getByTestId('pagination-next'));
      expect(screen.getByTestId('location').textContent).toContain('page=3');
   });

   it('goes to previous page on Prev click (updates URL)', () => {
      setup(3, 5);
      fireEvent.click(screen.getByTestId('pagination-prev'));
      expect(screen.getByTestId('location').textContent).toContain('page=2');
   });

   it('disables Prev button on first page', () => {
      setup(1, 5);
      expect(screen.getByTestId('pagination-prev')).toBeDisabled();
   });

   it('disables Next button on last page', () => {
      setup(5, 5);
      expect(screen.getByTestId('pagination-next')).toBeDisabled();
   });
});
