import React from 'react';

import { ReactComponent as NimbleLogoWhite } from 'assets/images/icons/nimble-logo-white.svg';
import Shimmer from 'components/Shimmer';

interface DashboardHeaderProps {
  dateTime: string;
  daysAgo: string;
  profileUrl: string;
  shouldShowShimmer?: boolean;
  children: React.ReactNode;
  'data-test-id'?: string;
}
const DashboardHeader = ({
  dateTime,
  daysAgo,
  profileUrl,
  shouldShowShimmer = true,
  children,
  ...rest
}: DashboardHeaderProps): JSX.Element => {
  return (
    <header className="flex flex-col min-h-screen" {...rest}>
      <div className="flex justify-between pt-8">
        {shouldShowShimmer ? <Shimmer classAttributes="w-[117px] h-[18px] rounded-[14px]" /> : <NimbleLogoWhite />}
        {shouldShowShimmer ? (
          <Shimmer classAttributes="w-[36px] h-[36px] rounded-full" />
        ) : (
          <img className="w-[36px] h-[36px] rounded-full" src={profileUrl} alt="user avatar" />
        )}
      </div>
      <div className="flex justify-between">
        <div className="w-1/5"></div>
        <div className="flex flex-col text-white mt-10 flex-1">
          {shouldShowShimmer ? (
            <Shimmer classAttributes="w-[117px] h-[18px] rounded-[14px]" />
          ) : (
            <p className="text-x-small font-extrabold">{dateTime}</p>
          )}
          {shouldShowShimmer ? (
            <div className="mt-[14px]">
              <Shimmer classAttributes="w-[100px] h-[18px] rounded-[14px]" />
            </div>
          ) : (
            <p className="text-x-large font-extrabold mt-1">{daysAgo}</p>
          )}
        </div>
        <div className="w-1/5"></div>
      </div>
      <div className="flex justify-between mt-8">
        <div className="w-1/5"></div>
        <div className="flex-1">{children}</div>
        <div className="w-1/5"></div>
      </div>
    </header>
  );
};

export default DashboardHeader;
