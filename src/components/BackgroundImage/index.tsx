import React from 'react';

export const backgroundImageTestIds = {
  base: 'background-image',
};

interface BackgroundImageProps {
  children: React.ReactNode;
  backgroundUrl?: string;
}

const BackgroundImage = ({ backgroundUrl, children }: BackgroundImageProps): JSX.Element => {
  return backgroundUrl ? (
    <div className="h-screen w-screen relative" data-test-id={backgroundImageTestIds.base}>
      <img src={backgroundUrl} alt="background" className="absolute w-full h-full z-[-1]" />
      <div className="h-full backdrop-blur-[50px] bg-gradient-to-b from-black/20 to-black">{children}</div>
    </div>
  ) : (
    <div className="absolute w-full h-full z-[-1] bg-black" data-test-id={backgroundImageTestIds.base}>
      {children}
    </div>
  );
};

export default BackgroundImage;
