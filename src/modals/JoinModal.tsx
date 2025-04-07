import React, { useState } from 'react';
import { Typography, TextField, Button, Alert, CircularProgress } from '@mui/material';
import ModalWrapper from '../components/ModalWrapper';

interface JoinModalProps {
  open: boolean;
  onClose: () => void;
}

const JoinModal: React.FC<JoinModalProps> = ({ open, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setFirstName('');
    setEmail('');
    setSuccess(false);
    setError(null);
    setIsSubmitting(false);
    onClose();
  };

  const apiUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch(`${apiUrl}/api/email-list/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: firstName,
          email,
          origin: 'app completion notification form',
        }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const errorData = await response.json();
        const errorMessage =
          errorData.email?.[0] || errorData.name?.[0] || 'An error occurred while submitting the form.';
        setError(errorMessage);
      }
    } catch (error) {
      setError('Signup failed due to a network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWrapper open={open} onClose={handleClose}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success ? (
        <>
          <Typography variant="h6" component="h2" gutterBottom>
            Thank you!
          </Typography>
          <Typography variant="body1" gutterBottom>
            You will be notified when the app goes live.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClose} fullWidth sx={{ mt: 2 }}>
            Close
          </Button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" component="h2" gutterBottom>
            Be the First to Know!
          </Typography>
          <Typography variant="body1" gutterBottom>
            The site is still under development. If you'd like to be the first to be notified when the app goes live, please leave your name and email address.
          </Typography>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            inputProps={{ autoCorrect: 'off' }}
            autoComplete="first-name"
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            inputProps={{ autoCapitalize: 'none', autoCorrect: 'off' }}
            autoComplete="email"
            required
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
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
          <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleClose}>
            Cancel
          </Button>
        </form>
      )}
    </ModalWrapper>
  );
};

export default JoinModal;
