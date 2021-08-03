import { ReactNode } from 'react';

import dynamic from 'next/dynamic';

import { CustomDialogContent } from './ModalDialogStyle';
const Dialog = dynamic(() => import('@material-ui/core/Dialog'));

interface ModalDialogProps {
  isOpen: boolean;
  close: () => void;
  modalContent: ReactNode;
}

const ModalDialog = ({ isOpen, close, modalContent }: ModalDialogProps) => {
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

export default ModalDialog;
