import { createTheme, Theme } from '@mui/material/styles';

// Theme configuration for light and dark modes
export const getTheme = (mode: 'light' | 'dark'): Theme => {
  const base = createTheme({
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

  return createTheme(base, {
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& input:-webkit-autofill': {
              WebkitTextFillColor: base.palette.text.primary,
              WebkitBoxShadow: `0 0 0px 1000px ${base.palette.background.paper} inset`,
              transition: 'background-color 5000s ease-in-out 0s', // remove flicker
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '& input:-webkit-autofill': {
              WebkitTextFillColor: base.palette.text.primary,
              WebkitBoxShadow: `0 0 0px 1000px ${base.palette.background.paper} inset`,
              transition: 'background-color 5000s ease-in-out 0s', // remove flicker
            },
          },
        },
      },
    },
  });
};
