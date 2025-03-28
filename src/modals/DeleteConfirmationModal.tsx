import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="thin-scrollbar no-focus-outline"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'calc(100% - 20px)',
          maxWidth: 600,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            m: 4,
            p: 3,
            boxShadow: 24,
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Confirm Delete
          </Typography>
          <Typography>Are you sure you want to delete this grocery?</Typography>
          <Button variant="contained" color="error" onClick={onConfirm} sx={{ mt: 2, mr: 1 }}>
            Delete
          </Button>
          <Button variant="outlined" onClick={onClose} sx={{ mt: 2 }}>
            Cancel
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
