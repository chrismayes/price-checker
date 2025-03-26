import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  const isAuthenticated = Boolean(localStorage.getItem('access_token'));

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Grocery Price Checker. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          {isAuthenticated && (
            <Link component={RouterLink} to="/account" sx={{ mx: 1 }}>
              Account
            </Link>
          )}
          <Link component={RouterLink} to="/about" sx={{ mx: 1 }}>
            About
          </Link>
          <Link component={RouterLink} to="/contact" sx={{ mx: 1 }}>
            Contact Us
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
