import React from 'react';

import Shimmer from 'components/Shimmer';

interface DashboardContentProps {
  'data-test-id'?: string;
}

const DashboardContent = ({ ...attributes }: DashboardContentProps): JSX.Element => {
  return (
    <div className="flex flex-col w-full" {...attributes}>
      <Shimmer classAttributes="h-[302px] rounded-[12px]" />
      <div className="flex flex-row justify-between mt-[38px]">
        <div className="flex flex-col justify-between">
          <Shimmer classAttributes="w-[318px] h-[18px] rounded-[14px]" />
          <Shimmer classAttributes="w-[212px] h-[18px] rounded-[14px]" />
        </div>
        <Shimmer classAttributes="w-[56px] h-[56px] rounded-full" />
      </div>
    </div>
  );
};

export default DashboardContent;
