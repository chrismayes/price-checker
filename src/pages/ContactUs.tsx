import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
// Import the named export and cast it to a callable function.
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  first_name: string;
  last_name: string;
  email: string;
  // add other fields if needed
}

const ContactUs: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const apiUrl = process.env.REACT_APP_API_URL;
  const siteKey = process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY;

  // Prefill fields if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    console.log('Token from localStorage:', token);
    if (token) {
      try {
        // Cast jwtDecode to a callable function.
        const decodeFn = jwtDecode as unknown as (token: string) => DecodedToken;
        const decoded: DecodedToken = decodeFn(token);
        console.log('Decoded token:', decoded);
        // Adjust keys if your token payload uses different naming conventions.
        setName(`${decoded.first_name} ${decoded.last_name}`);
        setEmail(decoded.email);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);

    if (!recaptchaToken) {
      setFeedback({ type: 'error', text: 'Please verify that you are not a robot.' });
      window.scrollTo(0, 0);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/contact-us/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, recaptchaToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = 'Submission failed.';
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
        window.scrollTo(0, 0);
      } else {
        setFeedback({ type: 'success', text: data.message || 'Message sent successfully!' });
        window.scrollTo(0, 0);
        setSubject('');
        setMessage('');
        setRecaptchaToken(null);
      }
    } catch (error: any) {
      setFeedback({ type: 'error', text: error.message || 'Submission failed due to network error.' });
      window.scrollTo(0, 0);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Have a question or feedback? Please fill out the form below and we'll get back to you as soon as possible.
        </Typography>
        {feedback && (
          <Alert severity={feedback.type} sx={{ mb: 2 }}>
            {feedback.text}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            inputProps={{ autoCapitalize: 'none', autoCorrect: 'off' }}
            required
          />
          <TextField
            label="Subject"
            variant="outlined"
            fullWidth
            margin="normal"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <TextField
            label="Message"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <ReCAPTCHA
              sitekey={siteKey}
              onChange={(token) => setRecaptchaToken(token)}
              onExpired={() => setRecaptchaToken(null)}
            />
          </Box>
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Send Message
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ContactUs;
