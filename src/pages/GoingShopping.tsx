import React from 'react';
import { Container, Typography } from '@mui/material';

const GoingShopping: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Going Shopping
      </Typography>
      <Typography variant="body1" gutterBottom>
        I'm now headed out to the store to shop. Use this page to track your shopping trip, update prices, and check off items from your shopping list.
      </Typography>
    </Container>
  );
};

export default GoingShopping;
