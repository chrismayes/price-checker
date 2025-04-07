import React, { useState, useEffect, useRef } from 'react';
import { Modal, Box, Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';

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
      const response = await fetch(`${apiUrl}/api/forgot-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        let errorMessage = 'Request failed.';
        if (data && typeof data === 'object') {
          errorMessage = Object.entries(data)
            .map(([field, errors]) => {
              if (Array.isArray(errors)) {
                return `${field}: ${errors.join(' ')}`;
              }
              return `${field}: ${errors}`;
            })
            .join(' | ');
        }
        setFeedback({ type: 'error', text: errorMessage });
      } else {
        setFeedback({
          type: 'success',
          text: data.message || 'Password reset instructions have been sent to your email.',
        });
        startCooldown();
      }
    } catch (error: any) {
      setFeedback({ type: 'error', text: error.message || 'Network error.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="thin-scrollbar no-focus-outline"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'calc(100% - 20px)',
          maxWidth: 600,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            m: 4,
            p: 3,
            boxShadow: 24,
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
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
        </Box>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
