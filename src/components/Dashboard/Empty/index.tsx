import React from 'react';

export const dashboardEmptyDataTestIds = {
  base: 'dashboard-empty__base',
};

const DashboardEmpty = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center" data-test-id={dashboardEmptyDataTestIds.base}>
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
