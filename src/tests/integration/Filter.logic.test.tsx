import { screen, waitFor, fireEvent } from '@testing-library/react';
import { server } from '@/mocks/browser';
import Filter from '@/components/TrackList/TrackControls/Filter';
import { renderWithProviders } from '@/utils/test-utils';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import LocationDisplayHelper from '@/tests/helpers/LocationDisplayHelper';
import { MockedProvider } from '@apollo/client/testing';
import { GET_GENRES } from '@/apollo/api';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';

beforeAll(() => {
   server.listen();
});

afterEach(() => {
   server.resetHandlers();
});

afterAll(() => {
   server.close();
});

const genresMock = {
   request: {
      query: GET_GENRES,
   },
   result: {
      data: {
         genres: ['Rock', 'Hip Hop', 'Jazz'],
      },
   },
};

describe('Filter Integration Tests', () => {
   it('loads and displays genres from API in the filter dropdown', async () => {
      renderWithProviders(
         <MockedProvider mocks={[genresMock]} addTypename={false}>
            <ThemeProvider theme={theme}>
               <MemoryRouter>
                  <Filter />
               </MemoryRouter>
            </ThemeProvider>
         </MockedProvider>
      );

      const select = await screen.findByTestId('filter-genre');
      fireEvent.mouseDown(select);

      await waitFor(() => {
         expect(
            screen.getByRole('option', { name: 'All' })
         ).toBeInTheDocument();
      });

      expect(select).toBeInTheDocument();

      await waitFor(() => {
         expect(
            screen.getByRole('option', { name: 'Rock' })
         ).toBeInTheDocument();
         expect(
            screen.getByRole('option', { name: 'Hip Hop' })
         ).toBeInTheDocument();
         expect(
            screen.getByRole('option', { name: 'Jazz' })
         ).toBeInTheDocument();
      });

      expect(screen.getByRole('option', { name: 'All' })).toBeInTheDocument();
   });

   it('allows selecting a valid genre and updates the select value', async () => {
      renderWithProviders(
         <MockedProvider mocks={[genresMock]} addTypename={false}>
            <ThemeProvider theme={theme}>
               <MemoryRouter>
                  <Filter />
               </MemoryRouter>
            </ThemeProvider>
         </MockedProvider>
      );

      const select = screen.getByTestId('filter-genre');
      fireEvent.mouseDown(select);

      await waitFor(() => {
         expect(
            screen.getByRole('option', { name: 'Rock' })
         ).toBeInTheDocument();
      });

      fireEvent.change(screen.getByTestId('filter-genre'), {
         target: { value: 'Rock' },
      });

      expect(screen.getByTestId('filter-genre')).toHaveValue('Rock');
   });

   it('allows selecting "All" to clear the filter', async () => {
      renderWithProviders(
         <MockedProvider mocks={[genresMock]} addTypename={false}>
            <ThemeProvider theme={theme}>
               <MemoryRouter>
                  <Filter />
               </MemoryRouter>
            </ThemeProvider>
         </MockedProvider>
      );

      const select = screen.getByTestId('filter-genre');
      fireEvent.mouseDown(select);

      await waitFor(() => {
         expect(
            screen.getByRole('option', { name: 'All' })
         ).toBeInTheDocument();
      });

      fireEvent.change(screen.getByTestId('filter-genre'), {
         target: { value: '' },
      });

      expect(screen.getByTestId('filter-genre')).toHaveValue('');
   });

   it('prevents selecting invalid genres and logs error', async () => {
      const consoleSpy = vi
         .spyOn(console, 'error')
         .mockImplementation(() => undefined);

      renderWithProviders(
         <MockedProvider mocks={[genresMock]} addTypename={false}>
            <ThemeProvider theme={theme}>
               <MemoryRouter>
                  <Filter />
               </MemoryRouter>
            </ThemeProvider>
         </MockedProvider>
      );

      const select = screen.getByTestId('filter-genre');
      fireEvent.mouseDown(select);

      await waitFor(() => {
         expect(
            screen.getByRole('option', { name: 'Rock' })
         ).toBeInTheDocument();
      });

      Object.defineProperty(select, 'value', {
         writable: true,
         value: 'InvalidGenre',
      });

      fireEvent.change(select, { target: { value: 'InvalidGenre' } });

      expect(consoleSpy).toHaveBeenCalledWith("Genre doesn't exist");

      consoleSpy.mockRestore();
   });

   it('updates URL search params when genre is selected', async () => {
      renderWithProviders(
         <MockedProvider mocks={[genresMock]} addTypename={false}>
            <ThemeProvider theme={theme}>
               <MemoryRouter>
                  <Filter />
                  <LocationDisplayHelper />
               </MemoryRouter>
            </ThemeProvider>
         </MockedProvider>
      );

      const select = screen.getByTestId('filter-genre');
      fireEvent.mouseDown(select);

      await waitFor(() => {
         expect(
            screen.getByRole('option', { name: 'Rock' })
         ).toBeInTheDocument();
      });

      fireEvent.change(screen.getByTestId('filter-genre'), {
         target: { value: 'Rock' },
      });

      await waitFor(() => {
         expect(screen.getByTestId('location')).toHaveTextContent('genre=Rock');
      });
   });

   it('removes genre from URL when "All" is selected', async () => {
      renderWithProviders(
         <MockedProvider mocks={[genresMock]} addTypename={false}>
            <ThemeProvider theme={theme}>
               <MemoryRouter>
                  <Filter />
                  <LocationDisplayHelper />
               </MemoryRouter>
            </ThemeProvider>
         </MockedProvider>
      );

      const select = screen.getByTestId('filter-genre');
      fireEvent.mouseDown(select);

      await waitFor(() => {
         expect(
            screen.getByRole('option', { name: 'All' })
         ).toBeInTheDocument();
      });

      fireEvent.change(screen.getByTestId('filter-genre'), {
         target: { value: '' },
      });

      await waitFor(() => {
         expect(screen.getByTestId('location')).not.toHaveTextContent('genre');
      });
   });
});
