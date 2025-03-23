import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const AddGrocery: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Add a Grocery
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField label="Grocery Name" fullWidth margin="normal" required />
        <TextField label="Quantity" type="number" fullWidth margin="normal" required />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Grocery
        </Button>
      </Box>
    </Container>
  );
};

export default AddGrocery;
