import React from 'react';

interface LoadingDialogProps {
  'data-test-id'?: string;
}

const LoadingDialog = (htmlAttributes: LoadingDialogProps): JSX.Element => {
  return (
    <div className="w-full h-full bg-black bg-opacity-60 fixed top-0 right-0" {...htmlAttributes}>
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white absolute z-[1000] left-1/2 top-1/2 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingDialog;
