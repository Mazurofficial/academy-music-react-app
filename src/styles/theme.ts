import { createTheme } from '@mui/material/styles';

const theme = createTheme({
   palette: {
      primary: {
         main: '#2563eb', // $primary-color
         dark: '#1d4ed8', // $primary-hover-color
      },
      secondary: {
         main: '#1d4ed8', // $secondary-color
      },
      error: {
         main: '#C03221', // $red-color
         dark: '#9a180a', // $red-color-hover
      },
      background: {
         default: '#f9fafb', // $bg-color
         paper: '#ffffff',
      },
      text: {
         primary: '#111827', // $text-color
         secondary: '#111111', // $dark-color
      },
   },
   typography: {
      fontFamily: ['Geologica', 'sans-serif'].join(','), // $font-main
      fontSize: 16, // $font-size-base
   },
});

export default theme;
