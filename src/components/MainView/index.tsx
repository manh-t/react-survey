import React from 'react';

export const mainViewTestIds = {
  base: 'main-view',
};

interface MainViewProps {
  children: React.ReactNode;
  backgroundUrl?: string;
}

const MainView = ({ backgroundUrl, children }: MainViewProps): JSX.Element => {
  return backgroundUrl ? (
    <div className="h-screen w-screen relative" data-test-id={mainViewTestIds.base}>
      <img src={backgroundUrl} alt="background" className="absolute w-full h-full z-[-1]" />
      <div className="h-full backdrop-blur-[50px] bg-gradient-to-b from-black/20 to-black">{children}</div>
    </div>
  ) : (
    <div className="absolute w-full h-full z-[-1] bg-black" data-test-id={mainViewTestIds.base}>
      {children}
    </div>
  );
};

export default MainView;
