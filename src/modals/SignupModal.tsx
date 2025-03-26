// src/modals/SignupModal.tsx
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Alert } from '@mui/material';

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

  useEffect(() => {
    if (!open) {
      setUsername('');
      setEmail('');
      setFirstName('');
      setLastName('');
      setPassword('');
      setConfirmPassword('');
      setError(null);
      setSuccess(null);
    }
  }, [open]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/signup/`, {
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

      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Signup failed.";
        if (data && typeof data === "object") {
          errorMessage = Object.entries(data)
            .map(([field, errors]) => {
              if (Array.isArray(errors)) {
                return `${field}: ${errors.join(" ")}`;
              }
              return `${field}: ${errors}`;
            })
            .join(" | ");
        }
        setError(errorMessage);
        return;
      }

      setSuccess('Signup successful! You can now log in.');
    } catch (err: any) {
      setError(err.message || 'Signup failed due to network error.');
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'calc(100% - 20px)',
          maxWidth: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        {success ? (
          // If signup is successful, show a close button
          <Button variant="contained" color="primary" onClick={onClose} fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        ) : (
          <form onSubmit={handleSignup}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
              Sign Up
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default SignupModal;
