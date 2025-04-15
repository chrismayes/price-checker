import { createTheme, Theme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark'): Theme =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#9B88AF' : '#9CAF88',
        contrastText: mode === 'dark' ? '#000000' : '#FFFFFF',
      },
      secondary: {
        main: mode === 'dark' ? '#F06292' : '#DC004E',
      },
      text: {
        primary: mode === 'dark' ? '#B0B0B0' : '#808080',
        secondary: mode === 'dark' ? '#D0D0D0' : '#FFFFFF',
      },
      background: {
        default: mode === 'dark' ? '#1D1D1D' : '#FFFFFF',
        paper: mode === 'dark' ? '#242424' : '#F9F9F9',
      },
    },
    typography: {
      allVariants: {
        color: mode === 'dark' ? '#B0B0B0' : '#808080',
      },
    },
  });
