import React from 'react';

interface DashboardEmptyProps {
  'data-test-id'?: string;
}

const DashboardEmpty = (attributes: DashboardEmptyProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center" {...attributes}>
      <p className="text-[64px]">😎</p>
      <p className="text-white text-large font-[850] text-center mt-8">
        You&lsquo;ve completed all the surveys.
        <br />
        Take a moment.
      </p>
    </div>
  );
};

export default DashboardEmpty;
