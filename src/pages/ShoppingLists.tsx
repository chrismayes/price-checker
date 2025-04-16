import React from 'react';
import { Container, Typography } from '@mui/material';

const ShoppingLists: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>Manage Your Shopping Lists</Typography>
      <Typography variant="body1" gutterBottom>
        Here you can create, review, and manage your shopping lists. Plan your shopping trips and keep track of your grocery needs.
      </Typography>
    </Container>
  );
};

export default ShoppingLists;
