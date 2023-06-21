import React from 'react';

import DashboardEmpty from 'components/Dashboard/Empty';
import DashboardHeader from 'components/Dashboard/Header';

const DashBoardScreen = (): JSX.Element => {
  return (
    <div className="bg-black w-full h-full pt-8 pl-8 pr-8">
      <DashboardHeader dateTime="Monday, JUNE 15" daysAgo="Today" profileUrl="https://i.pravatar.cc/150?img=3">
        <div className="w-full h-full flex justify-center mt-36">
          <DashboardEmpty />
        </div>
      </DashboardHeader>
    </div>
  );
};

export default DashBoardScreen;
