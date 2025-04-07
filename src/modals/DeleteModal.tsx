import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import ModalWrapper from '../components/ModalWrapper';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  itemName: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, onDelete, itemName }) => {
  return (
    <ModalWrapper open={open} onClose={onClose}>
      <Typography variant="h6" gutterBottom>
        Confirm Deletion
      </Typography>
      <Typography variant="body1" gutterBottom>
        Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="outlined" color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
      </Box>
    </ModalWrapper>
  );
};

export default DeleteModal;
