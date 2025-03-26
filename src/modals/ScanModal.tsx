// src/modals/ScanModal.tsx
import React from 'react';
import { Modal, Box, Button } from '@mui/material';

interface ScanModalProps {
  open: boolean;
  onClose: () => void;
  videoRef: React.RefObject<HTMLDivElement>;
}

const ScanModal: React.FC<ScanModalProps> = ({ open, onClose, videoRef }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      keepMounted
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '95%',
          maxWidth: '640px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
        }}
      >
        <Box
          ref={videoRef}
          className="videoContainer"
          sx={{
            width: '95%',
            height: '45vh',
            margin: 'auto',
            overflow: 'hidden',
          }}
        />
        <Button variant="contained" color="secondary" onClick={onClose} sx={{ mt: 2 }}>
          Cancel Scanning
        </Button>
      </Box>
    </Modal>
  );
};

export default ScanModal;
