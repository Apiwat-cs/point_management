import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { SnackbarState } from '@/hooks/pms/usePmsNotification';

interface PmsSnackbarProps {
  state: SnackbarState;
  onClose: () => void;
  autoHideDuration?: number;
}

const PmsSnackbar: React.FC<PmsSnackbarProps> = ({ state, onClose, autoHideDuration = 3000 }) => {
  return (
    <Snackbar
      open={state.open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={state.severity}
        variant="filled"
        sx={{
          width: '100%',
          borderRadius: '12px',
          fontWeight: 700,
          color: '#fff'
        }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  );
};

export default PmsSnackbar;
