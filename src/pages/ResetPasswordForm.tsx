import React, { useState, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

// Custom hook to extract query parameters from the URL
const useQuery = (): URLSearchParams => {
  return new URLSearchParams(useLocation().search);
};

const ResetPasswordForm: React.FC = () => {
  const query = useQuery();
  const uid: string = query.get('uid') || '';
  const token: string = query.get('token') || '';
  const [newPassword, setNewPassword] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/api/reset-password/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, token, new_password: newPassword }),
    });
    const data = await response.json();
    if (data.message) {
      setFeedback(data.message);
    } else if (data.error) {
      setFeedback(data.error);
    } else {
      setFeedback('Unexpected error.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mt: 4 }}>
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          sx={{ mt: 2 }}
        />
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Reset Password
        </Button>
      </form>
      {feedback && (
        <Typography sx={{ mt: 2 }} color="textSecondary">
          {feedback}
        </Typography>
      )}
    </Container>
  );
};

export default ResetPasswordForm;
