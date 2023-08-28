import React from 'react';

import { ReactComponent as NimbleLogoWhite } from 'assets/images/icons/nimble-logo-white.svg';
import Shimmer from 'components/Shimmer';

export const dashboardHeaderDataTestIds = {
  base: 'dashboard-header__base',
};

interface DashboardHeaderProps {
  dateTime: string;
  daysAgo: string;
  profileUrl?: string;
  shouldShowShimmer?: boolean;
  children: React.ReactNode;
}
const DashboardHeader = ({
  dateTime,
  daysAgo,
  profileUrl,
  shouldShowShimmer = false,
  children,
}: DashboardHeaderProps): JSX.Element => {
  return (
    <header className="flex flex-col w-full h-full items-center" data-test-id={dashboardHeaderDataTestIds.base}>
      <div className="flex justify-between w-full pt-8 pl-8 pr-8">
        {shouldShowShimmer ? <Shimmer classAttributes="w-[117px] h-[18px] rounded-[14px]" /> : <NimbleLogoWhite />}
        {shouldShowShimmer ? (
          <Shimmer classAttributes="w-[36px] h-[36px] rounded-full" />
        ) : (
          <img className="w-[36px] h-[36px] rounded-full" src={profileUrl} alt="user avatar" />
        )}
      </div>
      <div className="flex flex-col text-white mt-10 w-1/2">
        {shouldShowShimmer ? (
          <Shimmer classAttributes="w-[117px] h-[18px] rounded-[14px]" />
        ) : (
          <p className="text-x-small font-extrabold">{dateTime.toUpperCase()}</p>
        )}
        {shouldShowShimmer ? (
          <div className="mt-[14px]">
            <Shimmer classAttributes="w-[100px] h-[18px] rounded-[14px]" />
          </div>
        ) : (
          <p className="text-x-large font-extrabold mt-1">{daysAgo}</p>
        )}
      </div>
      <div className="flex-1 w-1/2 h-full pt-8">{children}</div>
    </header>
  );
};

export default DashboardHeader;
