import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Button, Alert } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiFetch } from '../apiFetch';

const ConfirmEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const query = new URLSearchParams(location.search);
  const uid = query.get('uid');
  const token = query.get('token');

  useEffect(() => {
    const confirmEmail = async () => {
      if (!uid || !token) {
        setError('Invalid confirmation link.');
        setLoading(false);
        setIsSubmitting(false);
        return;
      }
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const data = await apiFetch(`${apiUrl}/api/confirm-email/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uid, token }),
        });
        setFeedback(data.message || 'Email confirmed. You can now log in.');
        setSuccess(true);
      } catch (err: any) {
        setError(err.message || 'An error occurred while confirming your email.');
      } finally {
        setLoading(false);
        setIsSubmitting(false);
      }
    };
    confirmEmail();
  }, [uid, token]);

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <>
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          <Button variant="contained" onClick={handleGoToLogin} sx={{ mt: 2 }}>Go to Login</Button>
        </>
      ) : success ? (
        <Typography variant="h5" gutterBottom>{feedback}</Typography>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>{feedback}</Typography>
          <Button
            variant="contained"
            onClick={handleGoToLogin}
            sx={{ mt: 2 }}
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Submitting...' : 'Go to Login'}
          </Button>
        </>
      )}
    </Container>
  );
};

export default ConfirmEmail;
