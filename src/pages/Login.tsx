import React, { useState } from 'react';
import {
  Container, TextField, Button, Typography, Link, Box,
  Alert, InputAdornment, IconButton, CircularProgress,
} from '@mui/material';
import SignupModal from '../modals/SignupModal';
import ForgotPasswordModal from '../modals/ForgotPasswordModal';
import { useLocation } from 'react-router-dom';
import { apiFetch } from '../apiFetch';

// Icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false); // State to control the forgot password modal visibility
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search); // Parse query parameters from the URL
  const message = params.get('message'); // Extract the "message" query parameter

  // Handle login form submission.
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const data = await apiFetch(`${apiUrl}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: identifier, password }),
      });
      // Save tokens to localStorage and redirect to the home page
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {message === 'token_expired' && (<Alert severity="warning" sx={{ mb: 2 }}>Your session has expired. Please log in again.</Alert>)}
      {error && (<Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>)}

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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting} // Disable the button while submitting
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >{isSubmitting ? 'Logging in...' : 'Login'}</Button>
      </form>

      {/* Links for forgot password and signup */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Link
          component="button"
          variant="body2"
          underline="hover"
          onClick={() => setForgotModalOpen(true)}
        >
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

      {/* Modals for signup and forgot password */}
      <SignupModal open={signupModalOpen} onClose={() => setSignupModalOpen(false)} />
      <ForgotPasswordModal open={forgotModalOpen} onClose={() => setForgotModalOpen(false)} />
    </Container>
  );
};

export default Login;
