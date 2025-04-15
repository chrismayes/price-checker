import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, Snackbar, Alert } from '@mui/material';
import AppRoutes from './AppRoutes';
import Footer from './components/Footer';
import Header from './components/Header';
import { BreadcrumbProvider } from './components/BreadcrumbContext';
import { getTheme } from './theme';

const App: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode === 'dark' ? 'dark' : 'light';
  });
  const [logoutAlertOpen, setLogoutAlertOpen] = useState(false);

  const toggleTheme = () => {
    setMode(prev => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  const handleLogoutAlert = () => {
    setLogoutAlertOpen(true);
    setTimeout(() => {
      setLogoutAlertOpen(false);
    }, 5000);
  };

  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BreadcrumbProvider>
        <Header toggleTheme={toggleTheme} currentMode={mode} onLogout={handleLogoutAlert} />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Box sx={{ flexGrow: 1, mb: 5 }}>
            <AppRoutes />
          </Box>
          <Footer />
        </Box>
      </BreadcrumbProvider>
      <Snackbar
        open={logoutAlertOpen}
        autoHideDuration={5000}
        onClose={() => setLogoutAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setLogoutAlertOpen(false)} severity="info" sx={{ width: '100%' }}>
          You have been logged out.
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;
