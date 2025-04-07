import React, { useState } from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import StoreIcon from '@mui/icons-material/Store';
import JoinModal from '../modals/JoinModal';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

const Home: React.FC = () => {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('access_token');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let firstName: string | null = null;
  if (token) {
    try {
      const decoded = jwtDecode(token) as TokenPayload;
      firstName = decoded.first_name || decoded.username;
    } catch (error) {
      console.error('Token decode error:', error);
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {token ? (
        <HomeContentLoggedIn firstName={firstName} />
      ) : (
        <HomeContentLoggedOut handleOpen={handleOpen} />
      )}
      <JoinModal open={open} onClose={handleClose} />
    </Container>
  );
};

const HomeContentLoggedOut: React.FC<{ handleOpen: () => void }> = ({ handleOpen }) => {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Grocery Price Checker
      </Typography>
      <Typography variant="body1" gutterBottom>
        Grocery Price Checker helps you compare grocery prices across multiple stores, enabling you to save both money and time.
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        Why Join?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Become a member to unlock personalized features, save frequently purchased groceries, customize your preferred stores, create shopping lists, and discover the best deals across various retailers.
      </Typography>
      <Typography variant="body1" gutterBottom>
        <Box
          component="span"
          sx={{ textDecoration: 'underline', cursor: 'pointer' }}
          onClick={handleOpen}
        >
          Click here to join
        </Box>
        . Please note that the app is currently under development, and membership access will be available once the platform is ready.
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        How It Works
      </Typography>
      <Typography variant="body1" gutterBottom>
        Once logged in, you can:
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <SearchIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Search for grocery items and compare prices across different stores." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ListAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Create and manage shopping lists, analyze potential savings by shopping at one store versus another, or optimize savings by dividing your shopping across multiple stores." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <TrendingUpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Track your spending and monitor grocery price trends over time." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CameraAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Use your phone to scan barcodes to quickly add new groceries or look up existing ones in your collection." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PriceCheckIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Scan price tags while shopping to update grocery prices in your shopping list as you shop." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <StoreIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="After your shopping trip, compare your total expenditure with what it would have cost at other stores in your account." />
        </ListItem>
      </List>
    </>
  );
};

const HomeContentLoggedIn: React.FC<{ firstName: string | null }> = ({ firstName }) => {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome Back{firstName ? `, ${firstName}` : ''}!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here is your personalized dashboard. You can manage your shopping lists, track your spending, and explore the latest deals.
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        Quick Actions
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <ListAltIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View and manage your shopping lists." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <TrendingUpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Track your spending trends over time." />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <SearchIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Search for new grocery items and add them to your collection." />
        </ListItem>
      </List>
    </>
  );
};

export default Home;
