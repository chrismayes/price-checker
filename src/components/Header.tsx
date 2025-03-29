import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Retrieve and decode token if available
  const token = localStorage.getItem('access_token');
  let firstName: string | null = null;
  if (token) {
    try {
      const decoded = jwtDecode(token) as TokenPayload;
      firstName = decoded.first_name || decoded.username;
    } catch (error) {
      console.error('Token decode error:', error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.dispatchEvent(new Event('authChange'));
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary">
      {/* Top Toolbar: Logo and Header Text */}
      <Toolbar sx={{ justifyContent: 'flex-start', backgroundColor: "white" }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
          <img
            src="/images/logo-image.png"
            alt="Logo"
            style={isMobile ? { height: '100%', maxHeight: '70px', objectFit: 'contain' } :
                              { height: '100%', maxHeight: '100px', objectFit: 'contain' }}
          />
        </Box>
        <Typography
          variant={isMobile ? "h4" : "h3"}
          color="primary"
          component="div"
          sx={{ fontFamily: '"Lobster Two", cursive', textShadow: "#eee 4px 4px" }}
        >
          Grocery Price Checker
        </Typography>
      </Toolbar>
      {/* Dense Toolbar: Breadcrumbs left; Account link & Logout right */}
      <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
        <BreadcrumbsNav />
        {token && firstName && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/account"
              sx={{
                textTransform: 'none',
                display: 'flex',
                alignItems: 'center',
                mr: 1,
              }}
            >
              <PersonIcon sx={{ mr: isMobile ? 0 : 0.5 }} />
              {!isMobile && firstName}
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
