import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline, Snackbar, Alert } from '@mui/material';
import AppRoutes from './AppRoutes';
import Footer from './components/Footer';
import Header from './components/Header';
import { BreadcrumbProvider } from './components/BreadcrumbContext';
import { getTheme } from './theme';

const App: React.FC = () => {
  const [logoutAlertOpen, setLogoutAlertOpen] = useState(false);

  // State to manage the current theme mode (light or dark)
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('themeMode'); // Retrieve saved theme mode from localStorage
    return savedMode === 'dark' ? 'dark' : 'light'; // Default to light mode if no saved mode exists
  });

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  // Function to handle the logout alert display
  const handleLogoutAlert = () => {
    setLogoutAlertOpen(true);
    setTimeout(() => {
      setLogoutAlertOpen(false); // Automatically close the alert after 4 seconds
    }, 4000);
  };

  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent styling across browsers */}
      <BreadcrumbProvider> {/* Provides breadcrumb context to the app */}
        <Header toggleTheme={toggleTheme} currentMode={mode} onLogout={handleLogoutAlert} />
        <Box>
          <Box sx={{ flexGrow: 1, mb: 5 }}>
            <AppRoutes /> {/* Defines the application's routes */}
          </Box>
        </Box>
        <Footer />
      </BreadcrumbProvider>
      <Snackbar
        open={logoutAlertOpen}
        autoHideDuration={5000}
        onClose={() => setLogoutAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setLogoutAlertOpen(false)} severity="info" sx={{ width: '100%' }}>You have been logged out</Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default App;
