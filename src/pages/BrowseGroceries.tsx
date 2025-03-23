import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

interface Grocery {
  id: number;
  name: string;
  quantity: number;
  created_at: string;
}

const BrowseGroceries: React.FC = () => {
  const [groceries, setGroceries] = useState<Grocery[]>([]);
  const [loading, setLoading] = useState(true);

  // Get the API URL from environment variables
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/groceries/`);
        if (!response.ok) {
          throw new Error('Failed to fetch groceries');
        }
        const data = await response.json();
        setGroceries(data);
      } catch (error) {
        console.error('Error fetching groceries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroceries();
  }, [apiUrl]);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Browse Groceries
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {groceries.map((grocery) => (
            <ListItem key={grocery.id}>
              <ListItemText
                primary={grocery.name}
                secondary={`Quantity: ${grocery.quantity}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default BrowseGroceries;
