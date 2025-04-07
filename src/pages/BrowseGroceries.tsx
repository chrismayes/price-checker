import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, Typography, List, ListItem, ListItemText, CircularProgress,
  Avatar, ListItemAvatar, Button, Grid, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewGroceryModal, { Grocery } from '../modals/ViewGroceryModal';
import AddGroceryModal from '../modals/AddGroceryModal';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';

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

  const fetchGroceries = useCallback(async () => {
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
  }, [apiUrl]);

  useEffect(() => {
    fetchGroceries();
  }, [fetchGroceries]);

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

  const clearFormFields = () => {
    setNewGrocery(initialGroceryState);
  };

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
                onClick={() => openViewModal(grocery)}
                sx={{ cursor: 'pointer' }}
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

      <ViewGroceryModal open={viewModalOpen} onClose={closeViewModal} grocery={selectedGrocery} />
      <AddGroceryModal
        open={addModalOpen}
        onClose={closeAddModal}
        newGrocery={newGrocery}
        handleInputChange={handleInputChange}
        handleAddGrocery={handleAddGrocery}
        clearFormFields={clearFormFields}
      />
      <DeleteConfirmationModal open={deleteModalOpen} onClose={closeDeleteModal} onConfirm={confirmDeleteGrocery} />
    </Container>
  );
};

export default BrowseGroceries;
