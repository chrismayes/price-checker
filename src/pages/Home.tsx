import React from 'react';
import { Container, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Home Page
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/browse">
            <ListItemText primary="Browse Groceries" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/add">
            <ListItemText primary="Add a Grocery" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/check">
            <ListItemText primary="Check a Grocery" />
          </ListItemButton>
        </ListItem>
      </List>
    </Container>
  );
};

export default Home;
