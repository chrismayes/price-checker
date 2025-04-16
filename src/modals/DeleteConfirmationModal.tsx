import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import ModalWrapper from '../components/ModalWrapper';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

// A modal to confirm deletion of a Grocery item
const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({open, onClose, onConfirm}) => {
  return (
    <ModalWrapper open={open} onClose={onClose}>
      <Typography variant="h6" gutterBottom>Confirm Delete</Typography>
      <Typography>Are you sure you want to delete this grocery?</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="outlined" onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={onConfirm}>Delete</Button>
      </Box>
    </ModalWrapper>
  );
};

export default DeleteConfirmationModal;
