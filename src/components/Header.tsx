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
  Link,
  Tooltip,
} from '@mui/material';
import BreadcrumbsNav from './BreadcrumbsNav';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { jwtDecode } from 'jwt-decode';

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
    navigate('/');
    onLogout();
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{
        justifyContent: 'flex-start',
        backgroundColor: theme.palette.background.default,
        paddingLeft: '0px !important'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: isMobile ? 0 : 1 }}>
          <RouterLink to="/">
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}${currentMode === 'dark' ? '/dark' : ''}/logo.png`}
              alt="Logo"
              style={isMobile ? { height: '100%', maxHeight: '70px', objectFit: 'contain' }
                              : { height: '100%', maxHeight: '100px', objectFit: 'contain' }}
            />
          </RouterLink>
        </Box>
        <Typography
          variant={isMobile ? 'h4' : 'h2'}
          color="primary"
          component="div"
          sx={(theme) => ({
            fontFamily: '"Lobster Two", cursive',
            textShadow: `${currentMode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200]} 4px 4px`
          })}
        >
          Grocery Price Checker
        </Typography>
      </Toolbar>
      <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
        <BreadcrumbsNav />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {token && firstName && (
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
                <IconButton color="inherit" onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
          {!token && (
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
    </AppBar>
  );
};

export default Header;
