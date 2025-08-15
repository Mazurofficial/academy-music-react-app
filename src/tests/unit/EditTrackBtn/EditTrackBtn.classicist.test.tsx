import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@/utils/test-utils';
import EditTrackBtn from '@/components/TrackList/List/Track/TrackBtns/EditTrackBtn';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/theme';

describe('EditTrackBtn (black-box)', () => {
   const defaultId = '001';

   it('opens modal and sets trackToEdit on click (via state check)', () => {
      const { store } = renderWithProviders(
         <ThemeProvider theme={theme}>
            <EditTrackBtn id={defaultId} />
         </ThemeProvider>
      );

      fireEvent.click(screen.getByTestId(`edit-track-${defaultId}`));

      const state = store.getState().modal;
      expect(state.isVisible).toBe(true);
      expect(state.type).toBe('edit');
      expect(state.trackToEdit).toBe(defaultId);
   });
});
