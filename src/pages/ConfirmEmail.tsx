import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Extract uid and token from query parameters.
  const query = new URLSearchParams(location.search);
  const uid = query.get('uid');
  const token = query.get('token');

  useEffect(() => {
    const confirmEmail = async () => {
      if (!uid || !token) {
        setError('Invalid confirmation link.');
        setLoading(false);
        return;
      }

      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/confirm-email/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid, token }),
        });
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Email confirmation failed.');
        } else {
          setFeedback(data.message || 'Email confirmed. You can now log in.');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while confirming your email.');
      }
      setLoading(false);
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
          <Typography variant="h5" color="error" gutterBottom>
            {error}
          </Typography>
          <Button variant="contained" onClick={handleGoToLogin} sx={{ mt: 2 }}>
            Go to Login
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            {feedback}
          </Typography>
          <Button variant="contained" onClick={handleGoToLogin} sx={{ mt: 2, }}>
            Go to Login
          </Button>
        </>
      )}
    </Container>
  );
};

export default ConfirmEmail;
