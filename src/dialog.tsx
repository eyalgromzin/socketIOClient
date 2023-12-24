// ModalDialog.tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, Button } from '@mui/material';

interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
}

const ModalDialog: React.FC<ModalDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Critical</DialogTitle>

      <button onClick={() => onClose()}> ...click here to close... </button>
      {/* You can customize the content of the dialog here */}
      {/* For example, you can add more DialogContent or DialogActions */}
      {/* <DialogContent>Additional content goes here</DialogContent> */}
      {/* <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default ModalDialog;
