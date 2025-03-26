// src/modals/AddGroceryModal.tsx
import React from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

interface AddGroceryModalProps {
  open: boolean;
  onClose: () => void;
  newGrocery: { [key: string]: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddGrocery: () => void;
  clearFormFields: () => void;
}

const AddGroceryModal: React.FC<AddGroceryModalProps> = ({
  open,
  onClose,
  newGrocery,
  handleInputChange,
  handleAddGrocery,
  clearFormFields,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'calc(100% - 20px)',
          maxWidth: 400,
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
            value={newGrocery[field]}
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
          <Button variant="text" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddGroceryModal;
