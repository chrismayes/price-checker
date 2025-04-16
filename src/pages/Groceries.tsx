import React from 'react';
import { Container, Typography } from '@mui/material';

const Groceries: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>Manage Your Groceries</Typography>
      <Typography variant="body1" gutterBottom>
        Here you can manage the groceries in your database. Add new items, update their details, and organize them by category or brand.
      </Typography>
    </Container>
  );
};

export default Groceries;
