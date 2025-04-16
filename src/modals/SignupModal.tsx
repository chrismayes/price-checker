import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Alert, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import ModalWrapper from '../components/ModalWrapper';
import { apiFetch } from '../apiFetch';

// Icons
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ open, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility.
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility.
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Reset modal state when it is closed.
    if (!open) {
      setUsername('');
      setEmail('');
      setFirstName('');
      setLastName('');
      setPassword('');
      setConfirmPassword('');
      setError(null);
      setSuccess(null);
      setShowPassword(false);
      setShowConfirmPassword(false);
      setIsSubmitting(false);
    }
  }, [open]);

  // Handle form submission for signing up.
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Client-side validations.
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      setError('Username can only contain alphanumeric characters.');
      return;
    }

    setIsSubmitting(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      await apiFetch(`${apiUrl}/api/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          first_name: firstName,
          last_name: lastName,
          password,
        }),
      });
      setSuccess('Signup successful! A confirmation email has been sent. Please verify your email before logging in.');
    } catch (err: any) {
      setError(err.message || 'Signup failed due to network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <Typography variant="h5" gutterBottom>Sign Up</Typography>
      {error && (<Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>)}
      {success && (<Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>)}
      {success ? (
        <Button variant="contained" color="primary" onClick={onClose} fullWidth sx={{ mt: 2 }}>Close</Button>
      ) : (
        <form onSubmit={handleSignup}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            inputProps={{ autoCapitalize: 'none', autoCorrect: 'off' }}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{ autoCapitalize: 'none', autoCorrect: 'off' }}
            required
          />
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            InputProps={{
              autoCapitalize: 'none',
              autoCorrect: 'off',
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Submitting...' : 'Sign Up'}
          </Button>
          <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }} onClick={onClose}>Cancel</Button>
        </form>
      )}
    </ModalWrapper>
  );
};

export default SignupModal;
