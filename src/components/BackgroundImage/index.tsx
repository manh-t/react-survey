import React from 'react';

interface BackgroundImageProps {
  children: React.ReactNode;
  backgroundUrl?: string;
}

const BackgroundImage = ({ backgroundUrl, children }: BackgroundImageProps): JSX.Element => {
  return backgroundUrl ? (
    <div className={`h-screen w-screen relative`}>
      <img src={backgroundUrl} alt="background" className="absolute w-full h-full z-[-1]" />
      <div className="h-full backdrop-blur-[50px] bg-gradient-to-b from-black/20 to-black">{children}</div>
    </div>
  ) : (
    <div className="absolute w-full h-full z-[-1] bg-black">{children}</div>
  );
};

export default BackgroundImage;
