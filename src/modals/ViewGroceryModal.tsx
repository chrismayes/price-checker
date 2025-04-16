import React from 'react';
import { Typography, Box } from '@mui/material';
import ModalWrapper from '../components/ModalWrapper';

export interface Grocery {
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

interface ViewGroceryModalProps {
  open: boolean;
  onClose: () => void;
  grocery: Grocery | null;
}

const ViewGroceryModal: React.FC<ViewGroceryModalProps> = ({ open, onClose, grocery }) => {
  if (!grocery) return null;

  return (
    <ModalWrapper open={open} onClose={onClose}>
      <Typography variant="h5" gutterBottom>{grocery.name}</Typography>
      {grocery.image_url && (
        <Box
          component="img"
          src={grocery.image_url}
          alt={grocery.name}
          sx={{ width: '100%', maxHeight: 300, objectFit: 'contain', mb: 2 }}
        />
      )}
      {grocery.description && (
        <Typography variant="body1" gutterBottom>{grocery.description}</Typography>
      )}
      {grocery.category && (
        <Typography variant="body2" gutterBottom><strong>Category:</strong> {grocery.category}</Typography>
      )}
      {grocery.brand && (
        <Typography variant="body2" gutterBottom><strong>Brand:</strong> {grocery.brand}</Typography>
      )}
      {grocery.size && (
        <Typography variant="body2" gutterBottom><strong>Size:</strong> {grocery.size}</Typography>
      )}
    </ModalWrapper>
  );
};

export default ViewGroceryModal;
