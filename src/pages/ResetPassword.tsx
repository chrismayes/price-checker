import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiFetch } from '../apiFetch';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle form submission to reset the password
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    // Validate that the passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsSubmitting(false);
      return;
    }

    const uid = searchParams.get('uid');
    const token = searchParams.get('token');
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      await apiFetch(`${apiUrl}/api/reset-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, token, new_password: password }),
      });
      setSuccess('Password reset successfully! You can now log in with your new password.');
      // Redirect to the login page after a short delay
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setError(err.message || 'Password reset failed due to network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>Reset Password</Typography>
      {error && (<Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>)}
      {success && (<Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>)}

      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirm New Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting} // Disable the button while submitting.
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >{isSubmitting ? 'Resetting...' : 'Reset Password'}</Button>
      </form>
    </Container>
  );
};

export default ResetPassword;