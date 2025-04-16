import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

const Account: React.FC = () => {
  const token = localStorage.getItem('access_token');
  let payload: TokenPayload | null = null;
  try {
    if (token) {
      payload = jwtDecode<TokenPayload>(token);
    }
  } catch (error) {
    console.error('Failed to decode token', error);
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Account Details</Typography>
      {payload ? (
        <Box>
          <Typography variant="body1"><strong>First Name:</strong> {payload.first_name}</Typography>
          <Typography variant="body1"><strong>Last Name:</strong> {payload.last_name}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {payload.email}</Typography>
          <Typography variant="body1"><strong>Username:</strong> {payload.username}</Typography>
        </Box>
      ) : (
        <Typography variant="body1">No account details available. Please log in.</Typography>
      )}
    </Container>
  );
};

export default Account;
