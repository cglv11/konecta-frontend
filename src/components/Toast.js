import React from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';

const Toast = ({ open, message, onClose, severity = 'info' }) => {
  const backgroundColor = severity === 'error' ? '#f44336' : '#323232';

  return (
    <Snackbar
        open={open}
        onClose={onClose}
        autoHideDuration={2000}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
    >
        <SnackbarContent 
            message={message} 
            style={{ marginTop: 70, backgroundColor }} 
        />
    </Snackbar>
  );
};

export default Toast;

