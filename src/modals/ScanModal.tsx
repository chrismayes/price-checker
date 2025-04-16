import React from 'react';
import { Box, Button } from '@mui/material';
import ModalWrapper from '../components/ModalWrapper';

interface ScanModalProps {
  open: boolean;
  onClose: () => void;
  videoRef: React.RefObject<HTMLDivElement>;
}

const ScanModal: React.FC<ScanModalProps> = ({ open, onClose, videoRef }) => {
  return (
    <ModalWrapper open={open} onClose={onClose}>
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
    </ModalWrapper>
  );
};

export default ScanModal;
