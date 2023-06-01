import { createTheme } from '@mui/material';

export const muitheme = createTheme({
  palette: {
    primary: {
      main: '#87cefa',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f3f6fb',
    },
  },
  typography: {
    fontFamily: [
      'PlusJakartaSans-ExtraBold',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
