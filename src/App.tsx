import React from 'react';
import { Box } from '@mui/material';
import AppRoutes from './AppRoutes';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      {/* Main content area */}
      <Box sx={{ flexGrow: 1, mb: 5 }}>
        <AppRoutes />
      </Box>
      {/* Footer will stick to the bottom if content is short */}
      <Footer />
    </Box>
  );
};

export default App;
