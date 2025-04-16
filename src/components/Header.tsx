import React, { useState, useEffect } from 'react';
import BreadcrumbsNav from './BreadcrumbsNav';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  Link,
  Tooltip,
} from '@mui/material';
import { jwtDecode } from 'jwt-decode';

// Icons
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface TokenPayload {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface HeaderProps {
  toggleTheme: () => void;
  currentMode: 'light' | 'dark';
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, currentMode, onLogout }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [token, setToken] = useState<string | null>(localStorage.getItem('access_token'));
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    // Listen for authentication changes (e.g., login/logout).
    const handleAuthChange = () => {
      setToken(localStorage.getItem('access_token'));
    };
    window.addEventListener('authChange', handleAuthChange);
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  useEffect(() => {
    // Decode the token to extract the user's first name or username.
    if (!token) {
      setFirstName(null);
      return;
    }
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      setFirstName(decoded.first_name || decoded.username);
    } catch (err) {
      // Handle invalid or expired token by logging the user out.
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.dispatchEvent(new Event('authChange'));
      onLogout();
      navigate('/login?message=session_expired');
    }
  }, [token, navigate, onLogout]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.dispatchEvent(new Event('authChange'));
    onLogout();
    navigate('/');
  };

  return (
    <AppBar position="static" color="primary">
      <HeaderBanner isMobile={isMobile} currentMode={currentMode} />
      <HeaderToolbar
        toggleTheme={toggleTheme}
        currentMode={currentMode}
        onLogout={handleLogout}
        token={token || undefined}
        firstName={firstName || undefined}
        isMobile={isMobile}
      />
    </AppBar>
  );
};

// Component for the header banner, including the logo and title.
const HeaderBanner: React.FC<{
  isMobile: boolean;
  currentMode: 'light' | 'dark';
}> = ({ isMobile, currentMode }) => {
  const theme = useTheme();
  return (
    <Toolbar
      sx={{
        justifyContent: 'flex-start',
        backgroundColor: theme.palette.background.default,
        paddingLeft: '0 !important',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mr: isMobile ? 0 : 1 }}>
        <RouterLink to="/">
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}${currentMode === 'dark' ? '/dark' : ''}/logo.png`}
            alt="Logo"
            style={
              isMobile
                ? { height: '100%', maxHeight: '70px', objectFit: 'contain' }
                : { height: '100%', maxHeight: '100px', objectFit: 'contain' }
            }
          />
        </RouterLink>
      </Box>
      <Typography
        variant={isMobile ? 'h4' : 'h2'}
        color="primary"
        component="div"
        sx={(theme) => ({
          fontFamily: '"Lobster Two", cursive',
          textShadow: `${
            currentMode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200]
          } 4px 4px`,
        })}
      >
        Grocery Price Checker
      </Typography>
    </Toolbar>
  );
};

// Component for the header toolbar, including breadcrumbs, account actions, and theme toggle.
const HeaderToolbar: React.FC<{
  toggleTheme: () => void;
  currentMode: 'light' | 'dark';
  onLogout: () => void;
  token?: string;
  firstName?: string;
  isMobile: boolean;
}> = ({ toggleTheme, currentMode, onLogout, token, firstName, isMobile }) => (
  <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
    <BreadcrumbsNav />
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {token && firstName ? (
        <>
          <Tooltip title="Account details" arrow>
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
              <PersonIcon sx={{ mr: isMobile ? 0 : 0.5 }} /> {!isMobile && firstName}
            </Button>
          </Tooltip>
          <Tooltip title="Logout" arrow>
            <IconButton color="inherit" onClick={onLogout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Link
          component={RouterLink}
          to="/login"
          color="inherit"
          underline="hover"
          sx={{ textDecoration: 'none' }}
        >
          <Typography variant="body2" color="inherit" sx={{ fontSize: 'inherit' }}>
            Login
          </Typography>
        </Link>
      )}
      <Tooltip
        title={currentMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        arrow
      >
        <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 1 }}>
          {currentMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>
    </Box>
  </Toolbar>
);

export default Header;
