import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>About Grocery Price Checker</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" paragraph>
          Grocery Price Checker is a user-friendly application designed to help you compare prices at your favorite grocery stores. Our platform makes it easy to scan product barcodes and retrieve up-to-date pricing information, helping you make informed decisions and save money.
        </Typography>
        <Typography variant="body1" paragraph>
          Whether you are shopping on a budget or simply curious about where to find the best deals, our goal is to provide transparency in grocery pricing. We are committed to continuously updating our data and features to offer you a seamless experience.
        </Typography>
        <Typography variant="body1" paragraph>
          Join us on a journey to simplify your shopping experience and make every purchase a smarter one.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
