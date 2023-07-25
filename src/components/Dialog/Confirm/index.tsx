import React from 'react';

import ElevatedButton from 'components/ElevatedButton';

import Dialog from '..';

export const confirmDialogDataTestIds = {
  base: 'confirm-dialog__base',
  positiveButton: 'confirm-dialog__positive-button',
  negativeButton: 'confirm-dialog__negative-button',
};

interface ConfirmDialogProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
const ConfirmDialog = ({ open, onClose, title, children, onConfirm }: ConfirmDialogProps): JSX.Element => {
  if (!open) {
    return <></>;
  }

  return (
    <div data-test-id={confirmDialogDataTestIds.base}>
      <Dialog open={open}>
        <h2 className="text-x-regular text-white font-extrabold">{title}</h2>
        <div className="py-5 text-regular text-white opacity-70">{children}</div>
        <div className="flex justify-end">
          <div className="p-1">
            <ElevatedButton
              isFullWidth={false}
              className="bg-white bg-opacity-[.18] text-white"
              onClick={() => {
                onClose();
                onConfirm();
              }}
              data-test-id={confirmDialogDataTestIds.positiveButton}
            >
              Yes
            </ElevatedButton>
          </div>
          <div className="p-1">
            <ElevatedButton
              isFullWidth={false}
              className="bg-white text-black-chinese px-5"
              onClick={() => onClose()}
              data-test-id={confirmDialogDataTestIds.negativeButton}
            >
              Cancel
            </ElevatedButton>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
