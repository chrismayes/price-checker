import React, { useState, useEffect } from 'react';
import {
  Container, Typography, List, ListItem, ListItemText, CircularProgress,
  Avatar, ListItemAvatar, Modal, Box, Button, TextField, Grid, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Grocery {
  id: number;
  barcode_number?: string;
  name: string;
  description?: string;
  category?: string;
  brand?: string;
  size?: string;
  image_url?: string;
  store_name?: string;
  store_price?: string;
  manually_entered: boolean;
  barcode_lookup_failed: boolean;
  created_at: string;
}

const BrowseGroceries: React.FC = () => {
  const [groceries, setGroceries] = useState<Grocery[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrocery, setSelectedGrocery] = useState<Grocery | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [groceryToDelete, setGroceryToDelete] = useState<number | null>(null);

  const [newGrocery, setNewGrocery] = useState({
    name: '',
    description: '',
    category: '',
    brand: '',
    size: '',
    image_url: '',
    store_name: '',
    store_price: '',
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchGroceries = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/api/groceries/`);
      if (!response.ok) throw new Error('Failed to fetch groceries');
      const data = await response.json();
      setGroceries(data);
    } catch (error) {
      console.error('Error fetching groceries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroceries();
  }, [apiUrl]);

  // View Modal handlers
  const openViewModal = (grocery: Grocery) => {
    setSelectedGrocery(grocery);
    setViewModalOpen(true);
  };
  const closeViewModal = () => {
    setSelectedGrocery(null);
    setViewModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGrocery({ ...newGrocery, [e.target.name]: e.target.value });
  };

  const handleAddGrocery = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/groceries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newGrocery, manually_entered: true }),
      });
      if (!response.ok) throw new Error('Failed to add grocery');
      closeAddModal();
      await fetchGroceries();
    } catch (error) {
      console.error('Error adding grocery:', error);
    }
  };

  // Delete Modal handlers
  const openDeleteModal = (id: number) => {
    setGroceryToDelete(id);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setGroceryToDelete(null);
  };

  const confirmDeleteGrocery = async () => {
    if (groceryToDelete !== null) {
      try {
        const response = await fetch(`${apiUrl}/api/groceries/${groceryToDelete}/`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete grocery');
        await fetchGroceries();
      } catch (error) {
        console.error('Error deleting grocery:', error);
      } finally {
        closeDeleteModal();
      }
    }
  };

  const initialGroceryState = {
    name: '',
    description: '',
    category: '',
    brand: '',
    size: '',
    image_url: '',
    store_name: '',
    store_price: '',
  };

  // Clear form fields
  const clearFormFields = () => {
    setNewGrocery(initialGroceryState);
  };

  // Enhanced Add Modal handlers
  const openAddModal = () => {
    clearFormFields();
    setAddModalOpen(true);
  };
  const closeAddModal = () => {
    clearFormFields();
    setAddModalOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h3" component="h1" gutterBottom>
          Browse Groceries
        </Typography>
        <Button variant="contained" color="primary" onClick={openAddModal}>
          Add Grocery
        </Button>
      </Grid>

      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {groceries.map((grocery) => (
            <ListItem
              key={grocery.id}
              alignItems="flex-start"
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => openDeleteModal(grocery.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar
                  alt={grocery.name}
                  src={grocery.image_url || '/images/default-grocery.png'}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => openViewModal(grocery)}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${grocery.name} ${grocery.size ? `(${grocery.size})` : ''}`}
                secondary={
                  <>
                    {grocery.brand && `Brand: ${grocery.brand} | `}
                    {grocery.category && `Category: ${grocery.category} | `}
                    {grocery.store_name && `Store: ${grocery.store_name} ($${grocery.store_price}) | `}
                    {grocery.manually_entered
                      ? 'Manually Entered'
                      : grocery.barcode_lookup_failed
                      ? 'Barcode Lookup Failed'
                      : 'Barcode Lookup Successful'}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Updated View Grocery Modal */}
      <Modal open={viewModalOpen} onClose={closeViewModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          {selectedGrocery && (
            <>
              <Box
                component="img"
                src={selectedGrocery.image_url || '/images/default-grocery.png'}
                alt={selectedGrocery.name}
                sx={{ width: '100%', height: 'auto', mb: 2, borderRadius: 1 }}
              />
              <Typography variant="h5" gutterBottom>
                {selectedGrocery.name}
              </Typography>
              {selectedGrocery.barcode_number && (
                <Typography><strong>Barcode:</strong> {selectedGrocery.barcode_number}</Typography>
              )}
              {selectedGrocery.brand && (
                <Typography><strong>Brand:</strong> {selectedGrocery.brand}</Typography>
              )}
              {selectedGrocery.category && (
                <Typography sx={{ mt: 1 }}><strong>Category:</strong> {selectedGrocery.category}</Typography>
              )}
              {selectedGrocery.size && (
                <Typography sx={{ mt: 1 }}><strong>Size:</strong> {selectedGrocery.size}</Typography>
              )}
              {selectedGrocery.description && (
                <Typography sx={{ mt: 1 }}><strong>Description:</strong> {selectedGrocery.description}</Typography>
              )}
              {selectedGrocery.store_name && (
                <Typography sx={{ mt: 1 }}>
                  <strong>Store:</strong> {selectedGrocery.store_name}
                  {selectedGrocery.store_price && ` ($${selectedGrocery.store_price})`}
                </Typography>
              )}
              <Typography sx={{ mt: 1 }}>
                <strong>Entry Type:</strong> {selectedGrocery.manually_entered ? 'Manually Entered' : 'Automatically Retrieved'}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Barcode Lookup Status:</strong> {selectedGrocery.barcode_lookup_failed ? 'Failed' : 'Successful'}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Created At:</strong> {new Date(selectedGrocery.created_at).toLocaleString()}
              </Typography>
              <Button variant="contained" sx={{ mt: 3 }} onClick={closeViewModal}>
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Add Grocery Modal */}
      <Modal open={addModalOpen} onClose={closeAddModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Add Grocery
          </Typography>
          {['name', 'description', 'category', 'brand', 'size', 'image_url', 'store_name', 'store_price'].map((field) => (
            <TextField
              key={field}
              label={field.replace('_', ' ').toUpperCase()}
              name={field}
              value={(newGrocery as any)[field]}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleAddGrocery}>
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={clearFormFields}>
              Clear Fields
            </Button>
            <Button variant="text" onClick={closeAddModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={deleteModalOpen} onClose={closeDeleteModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 350, bgcolor: 'background.paper', boxShadow: 24, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>Confirm Delete</Typography>
          <Typography>Are you sure you want to delete this grocery?</Typography>
          <Button variant="contained" color="error" onClick={confirmDeleteGrocery} sx={{ mt: 2, mr: 1 }}>
            Delete
          </Button>
          <Button variant="outlined" onClick={closeDeleteModal} sx={{ mt: 2 }}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default BrowseGroceries;
