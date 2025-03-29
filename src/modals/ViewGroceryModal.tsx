import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

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
  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'calc(100% - 20px)',
          maxWidth: 500,
          maxHeight: '80vh',
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
          {grocery && (
            <>
              <Box
                component="img"
                src={grocery.image_url || '/images/default-grocery.png'}
                alt={grocery.name}
                sx={{ width: '100%', height: 'auto', mb: 2, borderRadius: 1 }}
              />
              <Typography variant="h5" gutterBottom>
                {grocery.name}
              </Typography>
              {grocery.barcode_number && (
                <Typography>
                  <strong>Barcode:</strong> {grocery.barcode_number}
                </Typography>
              )}
              {grocery.brand && (
                <Typography>
                  <strong>Brand:</strong> {grocery.brand}
                </Typography>
              )}
              {grocery.category && (
                <Typography sx={{ mt: 1 }}>
                  <strong>Category:</strong> {grocery.category}
                </Typography>
              )}
              {grocery.size && (
                <Typography sx={{ mt: 1 }}>
                  <strong>Size:</strong> {grocery.size}
                </Typography>
              )}
              {grocery.description && (
                <Typography sx={{ mt: 1 }}>
                  <strong>Description:</strong> {grocery.description}
                </Typography>
              )}
              {grocery.store_name && (
                <Typography sx={{ mt: 1 }}>
                  <strong>Store:</strong> {grocery.store_name}
                  {grocery.store_price && ` ($${grocery.store_price})`}
                </Typography>
              )}
              <Typography sx={{ mt: 1 }}>
                <strong>Entry Type:</strong>{' '}
                {grocery.manually_entered ? 'Manually Entered' : 'Automatically Retrieved'}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Barcode Lookup Status:</strong>{' '}
                {grocery.barcode_lookup_failed ? 'Failed' : 'Successful'}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Created At:</strong> {new Date(grocery.created_at).toLocaleString()}
              </Typography>
              <Button variant="contained" sx={{ mt: 3 }} onClick={onClose}>
                Close
              </Button>
            </>
          )}
        </Box>
      </div>
    </Modal>
  );
};

export default ViewGroceryModal;
