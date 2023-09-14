import React from 'react';

export const dialogDataTestIds = {
  dialog: 'dialog__base',
};
interface DialogProps {
  children: React.ReactNode;
  open: boolean;
}
const Dialog = (props: DialogProps): JSX.Element => {
  const { open } = props;
  if (!open) {
    return <></>;
  }
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex" data-test-id={dialogDataTestIds.dialog}>
      <div className="relative p-6 bg-[#1E1E1E] w-full max-w-md m-auto flex-col flex rounded-[14px]">
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Dialog;
