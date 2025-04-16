import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Box, Link } from '@mui/material';
import { useBreadcrumb } from '../components/BreadcrumbContext';
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
  image_url?: string | null;
}

const ViewStore: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setOverrideLabel } = useBreadcrumb();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const data = await apiFetch(`${apiUrl}/api/shops/${id}`);
        setStore(data);
        setOverrideLabel(data.name); // Update the breadcrumb label with the store name.
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching store details.');
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, [apiUrl, id, setOverrideLabel]);

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
  }
  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }
  if (!store) {
    return (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Alert severity="warning">Store not found.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>{store.name}</Typography>
      {store.image_url && (
        <Box
          component="img"
          src={store.image_url}
          alt={store.name}
          sx={{ width: '100%', maxHeight: 300, objectFit: 'contain', mb: 2 }}
        />
      )}
      <Typography variant="body1" gutterBottom>
        <strong>Address:</strong> {store.address_line1}
        {store.address_line2 && `, ${store.address_line2}`}, {store.city}, {store.state}, {store.postal_code}, {store.country}
      </Typography>
      <Typography variant="body1" gutterBottom><strong>Phone:</strong> {store.phone_number}</Typography>
      {store.email && (<Typography variant="body1" gutterBottom><strong>Email:</strong> {store.email}</Typography>)}
      {store.website && (
        <Typography variant="body1" gutterBottom>
          <strong>Website: </strong>
          <Link href={store.website} target="_blank" rel="noopener noreferrer" underline="hover">
            {store.website}
          </Link>
        </Typography>
      )}
      {store.description && (<Typography variant="body1" gutterBottom><strong>Description:</strong> {store.description}</Typography>)}
      <Typography variant="body1" gutterBottom><strong>Opening Hours:</strong> {store.opening_hours}</Typography>
    </Container>
  );
};

export default ViewStore;
