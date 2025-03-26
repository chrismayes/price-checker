// src/pages/Login.tsx
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Link, Box, Alert } from '@mui/material';
import SignupModal from '../modals/SignupModal';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      window.location.href = '/';
    } catch (error: any) {
      setError(error.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }} fullWidth>
          Login
        </Button>
      </form>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/forgot-password" underline="hover">
          Forgot Password?
        </Link>
        <Link
          component="button"
          variant="body2"
          underline="hover"
          onClick={() => setSignupModalOpen(true)}
        >
          Sign Up
        </Link>
      </Box>
      <SignupModal open={signupModalOpen} onClose={() => setSignupModalOpen(false)} />
    </Container>
  );
};

export default Login;
