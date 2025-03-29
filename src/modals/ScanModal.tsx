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
            p: 1,
            pt: 2,
            boxShadow: 24,
            borderRadius: 2,
            bgcolor: 'background.paper',
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
          <Button variant="outlined" color="info" fullWidth onClick={onClose} sx={{ my: 1 }}>
            Cancel Scanning
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

export default ScanModal;
