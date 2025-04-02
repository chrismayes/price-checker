import React, { useState, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Custom hook to extract query parameters from the URL
const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};

const ResetPasswordForm: React.FC = () => {
  const query = useQuery();
  const uid: string = query.get('uid') || '';
  const token: string = query.get('token') || '';
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [feedback, setFeedback] = useState<{ message: string; severity: 'error' | 'success' } | null>(null);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [resetSuccessful, setResetSuccessful] = useState<boolean>(false);
  const navigate = useNavigate();

  // Validate password restrictions.
  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/\d/.test(password)) {
      return 'Password must contain at least one number.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);

    // Validate new password restrictions.
    const pwdError = validatePassword(newPassword);
    if (pwdError) {
      setFeedback({ message: pwdError, severity: 'error' });
      return;
    }
    if (newPassword !== confirmPassword) {
      setFeedback({ message: 'Passwords do not match.', severity: 'error' });
      return;
    }

    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/reset-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, token, new_password: newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setFeedback({ message: data.message || 'Password reset successfully.', severity: 'success' });
        // Clear the form fields and disable the reset button
        setNewPassword('');
        setConfirmPassword('');
        (document.activeElement as HTMLElement)?.blur();
        setResetSuccessful(true);
      } else {
        setFeedback({ message: data.error || 'Password reset failed.', severity: 'error' });
      }
    } catch (err: any) {
      setFeedback({ message: err.message || 'An error occurred.', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 4 }}>
        Reset Password
      </Typography>
      {feedback && (
        <Alert severity={feedback.severity} sx={{ mt: 2 }}>
          {feedback.message}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          type={showNewPassword ? 'text' : 'password'}
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          sx={{ mt: 2 }}
          inputProps={{ autoCapitalize: 'none', autoCorrect: 'off' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          sx={{ mt: 2 }}
          inputProps={{ autoCapitalize: 'none', autoCorrect: 'off' }}
          InputProps={{
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
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
          disabled={resetSuccessful} // Disable after success
        >
          Reset Password
        </Button>
        {resetSuccessful && (
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate('/login')}
          >
            Go to Login
          </Button>
        )}
      </form>
    </Container>
  );
};

export default ResetPasswordForm;
