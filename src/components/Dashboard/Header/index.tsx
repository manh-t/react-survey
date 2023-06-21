import React from 'react';

import { ReactComponent as NimbleLogoWhite } from 'assets/images/icons/nimble-logo-white.svg';

interface DashboardHeaderProps {
  dateTime: string;
  daysAgo: string;
  profileUrl: string;
  children: React.ReactNode;
}
const DashboardHeader = ({ dateTime, daysAgo, profileUrl, children }: DashboardHeaderProps): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row justify-between pt-8">
        <NimbleLogoWhite />
        <img className="w-[36px] h-[36px] rounded-full" src={profileUrl} alt="user avatar" />
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-1/5"></div>
        <div className="flex flex-col text-white mt-10 flex-1">
          <p className="text-x-small font-extrabold">{dateTime}</p>
          <p className="text-x-large font-extrabold mt-1">{daysAgo}</p>
        </div>
        <div className="w-1/5"></div>
      </div>
      <div className="flex flex-row justify-between mt-8 grow">
        <div className="w-1/5"></div>
        <div className="flex-1">{children}</div>
        <div className="w-1/5"></div>
      </div>
    </div>
  );
};

export default DashboardHeader;
