import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import BreadcrumbsNav from './BreadcrumbsNav';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

const Header: React.FC = () => {
  const navigate = useNavigate();

  // Try to retrieve and decode the token
  const token = localStorage.getItem('access_token');
  let firstName: string | null = null;
  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      firstName = decoded.first_name || decoded.username;
    } catch (error) {
      console.error('Token decode error:', error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          alignItems: 'stretch',
          flexWrap: 'wrap'
        }}
      >
        {/* Left Section: Logo, Header Text, and Breadcrumbs */}
        <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <img
              src="/images/logo-image.png"
              alt="Logo"
              style={{ height: '100%', maxHeight: '100px', objectFit: 'contain' }}
            />
          </Box>
          {/* Header Text and Breadcrumbs */}
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mt: 2 }}>
            <Typography variant="h3" component="div" sx={{ fontFamily: '"Lobster Two", cursive' }}>
              Grocery Price Checker
            </Typography>
            <BreadcrumbsNav />
          </Box>
        </Box>

        {/* Right Section: User Controls */}
        {token && firstName && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/account"
              sx={{
                textTransform: 'none',
                mr: 1,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <PersonIcon sx={{ mr: 0.5 }} />
              {firstName}
            </Button>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
