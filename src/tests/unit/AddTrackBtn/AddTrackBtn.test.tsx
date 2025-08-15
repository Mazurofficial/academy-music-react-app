import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { vi, test, expect } from 'vitest'; // Add this import
import AddTrackBtn from '@/components/Header/AddTrackBtn/AddTrackBtn';
import {
   openModal,
   setModalAdd,
} from '@/features/modalWindow/modalWindowSlice';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';

const mockStore = configureStore([]);

test('dispatches openModal and setModalAdd actions on click', () => {
   const store = mockStore({});
   store.dispatch = vi.fn(); // Replace jest.fn() with vi.fn()

   render(
      <Provider store={store}>
         <ThemeProvider theme={theme}>
            <AddTrackBtn />
         </ThemeProvider>
      </Provider>
   );

   const button = screen.getByTestId('create-track-button');
   fireEvent.click(button);

   expect(store.dispatch).toHaveBeenCalledWith(openModal());
   expect(store.dispatch).toHaveBeenCalledWith(setModalAdd());
});
