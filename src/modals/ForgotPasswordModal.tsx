import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Alert } from '@mui/material';

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState<string>('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  // Clear form fields and feedback when the modal is closed
  useEffect(() => {
    if (!open) {
      setEmail('');
      setFeedback(null);
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);

    try {
      // POST the user's email to the /api/forgot-password/ endpoint
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
      }
    } catch (error: any) {
      setFeedback({ type: 'error', text: error.message || 'Network error.' });
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
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
              Send Reset Instructions
            </Button>
            <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }} onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </div>
    </Modal>
  );
};

export default ForgotPasswordModal;
