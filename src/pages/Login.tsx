import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SignupModal from '../modals/SignupModal';
import ForgotPasswordModal from '../modals/ForgotPasswordModal';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: identifier, password }),
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
          label="Username or Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          inputProps={{ autoCapitalize: 'none', autoCorrect: 'off' }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            autoCapitalize: 'none',
            autoCorrect: 'off',
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }} fullWidth>
          Login
        </Button>
      </form>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Link component="button" variant="body2" underline="hover" onClick={() => setForgotModalOpen(true)}>
          Forgot Password?
        </Link>
        <Link component="button" variant="body2" underline="hover" onClick={() => setSignupModalOpen(true)}>
          Sign Up
        </Link>
      </Box>
      <SignupModal open={signupModalOpen} onClose={() => setSignupModalOpen(false)} />
      <ForgotPasswordModal open={forgotModalOpen} onClose={() => setForgotModalOpen(false)} />
    </Container>
  );
};

export default Login;
