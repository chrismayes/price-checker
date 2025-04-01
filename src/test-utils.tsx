import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'rrd';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {ui}
      </ThemeProvider>
    </MemoryRouter>
  );
};

export * from '@testing-library/react';
export { renderWithProviders };