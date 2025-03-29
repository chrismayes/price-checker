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
              // Conditionally add InputProps only if field is "image_url"
              {...(field === 'image_url'
                ? { InputProps: { inputProps: { autoCapitalize: 'none', autoCorrect: 'off' } } }
                : {})}
            />
          ))}
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleAddGrocery}>
            Submit
          </Button>
          <Button variant="outlined" color="warning" fullWidth sx={{ mt: 2 }} onClick={clearFormFields}>
            Clear Fields
          </Button>
          <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }} onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

export default AddGroceryModal;
