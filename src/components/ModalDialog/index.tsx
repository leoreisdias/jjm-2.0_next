import { ReactNode } from 'react';

import { Dialog } from '@material-ui/core';

import { CustomDialogContent } from './ModalDialogStyle';

interface ModalDialogProps {
  isOpen: boolean;
  close: () => void;
  modalContent: ReactNode;
}

export const ModalDialog = ({ isOpen, close, modalContent }: ModalDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={close}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <CustomDialogContent>{modalContent}</CustomDialogContent>
    </Dialog>
  );
};
