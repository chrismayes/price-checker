import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  username: string;
  email: string;
  // Add additional fields if your token includes them.
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Account Details
        </Typography>
        {payload ? (
          <Box>
            <Typography variant="body1">
              <strong>Username:</strong> {payload.username}
            </Typography>
            {payload.email && (
              <Typography variant="body1">
                <strong>Email:</strong> {payload.email}
              </Typography>
            )}
            {/* You can add additional account details here */}
          </Box>
        ) : (
          <Typography variant="body1">
            No account details available. Please log in.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Account;
