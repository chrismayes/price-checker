import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import ModalWrapper from '../components/ModalWrapper';
import { apiFetch } from '../apiFetch';

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [cooldown, setCooldown] = useState<number>(0);
  const [requestSent, setRequestSent] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  // Ref for the timer to clear it when needed
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!open) {
      setEmail('');
      setFeedback(null);
      setCooldown(0);
      setRequestSent(false);
      setIsSubmitting(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [open]);

  // Start the cooldown timer for 30 seconds
  const startCooldown = () => {
    setCooldown(30);
    setRequestSent(true);
    timerRef.current = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);
    try {
      const data = await apiFetch(`${apiUrl}/api/forgot-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setFeedback({
        type: 'success',
        text: data.message || 'Password reset instructions have been sent to your email.',
      });
      startCooldown();
    } catch (err: any) {
      setFeedback({ type: 'error', text: err.message || 'Network error.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <Typography variant="h5" gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Enter your email address below and we'll send you instructions to reset your password.
      </Typography>
      {feedback && (
        <Alert severity={feedback.type} sx={{ mb: 2 }}>
          {feedback.text}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputProps={{ autoCapitalize: 'none', autoCorrect: 'off' }}
          required
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isSubmitting || cooldown > 0}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {isSubmitting ? 'Submitting...' : cooldown > 0
            ? `Send Reset Instructions Again (${cooldown})`
            : 'Send Reset Instructions'}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={onClose}
        >
          {requestSent ? 'Done' : 'Cancel'}
        </Button>
      </Box>
    </ModalWrapper>
  );
};

export default ForgotPasswordModal;
