import React, { useState } from 'react';
import { Typography, TextField, Button, Alert, CircularProgress, Box } from '@mui/material';
import ModalWrapper from '../components/ModalWrapper';

interface AddGroceryModalProps {
  open: boolean;
  onClose: () => void;
  newGrocery: { [key: string]: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddGrocery: () => void;
  clearFormFields: () => void;
}

const AddGroceryModal: React.FC<AddGroceryModalProps> = ({ open, onClose, handleAddGrocery }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setName('');
    setCategory('');
    setBrand('');
    setSize('');
    setError(null);
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!name.trim()) {
      setError('Name is required.');
      setIsSubmitting(false);
      return;
    }

    try {
      handleAddGrocery();
      handleClose();
    } catch (err: any) {
      setError(err.message || 'Failed to add grocery.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWrapper open={open} onClose={handleClose}>
      <Typography variant="h6" gutterBottom>
        Add Grocery
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
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
          label="Category"
          variant="outlined"
          fullWidth
          margin="normal"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <TextField
          label="Brand"
          variant="outlined"
          fullWidth
          margin="normal"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <TextField
          label="Size"
          variant="outlined"
          fullWidth
          margin="normal"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Adding...' : 'Add Grocery'}
          </Button>
        </Box>
      </form>
    </ModalWrapper>
  );
};

export default AddGroceryModal;
