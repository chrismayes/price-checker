import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, List, ListItemButton,
  ListItemText, CircularProgress, Alert,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { formatAddress } from '../utils/addressUtils';
import { apiFetch } from '../apiFetch';

interface Store {
  id: number;
  name: string;
  address_line1: string;
  address_line2?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone_number: string;
  email?: string | null;
  website?: string | null;
  description?: string | null;
  latitude: number;
  longitude: number;
  opening_hours: string;
}

const Stores: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await apiFetch(`${apiUrl}/api/shops`);
        setStores(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching shops.');
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, [apiUrl]);

  // Filter stores based on the searchTerm.
  const filteredStores = stores.filter((store) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      store.name.toLowerCase().includes(lowerSearch) ||
      store.address_line1.toLowerCase().includes(lowerSearch) ||
      (store.address_line2 && store.address_line2.toLowerCase().includes(lowerSearch)) ||
      store.city.toLowerCase().includes(lowerSearch) ||
      store.state.toLowerCase().includes(lowerSearch) ||
      store.postal_code.toLowerCase().includes(lowerSearch) ||
      store.country.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Your Stores
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here you can set up and manage the stores and supermarkets you shop at. Add new stores, update their details, and organize your shopping preferences.
      </Typography>
      <TextField
        label="Search Stores"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <List>
        {filteredStores.map((store) => (
          <ListItemButton key={store.id} component={RouterLink} to={`/stores/${store.id}`}>
            <ListItemText primary={store.name} secondary={`${formatAddress(store)} | ${store.phone_number}`} />
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
};

export default Stores;
