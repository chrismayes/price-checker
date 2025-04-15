import React from 'react';
import { Modal, Box } from '@mui/material';

interface ModalWrapperProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose} role="dialog">
      <div className="thin-scrollbar no-focus-outline modal-outer-container">
        <Box sx={{m: 4, p: 3, boxShadow: 24, borderRadius: 2, bgcolor: 'background.paper'}}>
          {children}
        </Box>
      </div>
    </Modal>
  );
};

export default ModalWrapper;
