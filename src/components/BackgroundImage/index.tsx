import React from 'react';

interface BackgroundImageProps {
  children: React.ReactNode;
  backgroundUrl?: string;
  'data-test-id'?: string;
}

const BackgroundImage = ({ backgroundUrl, children, ...attributes }: BackgroundImageProps): JSX.Element => {
  return backgroundUrl ? (
    <div className={`h-screen w-screen relative`} {...attributes}>
      <img src={backgroundUrl} alt="background" className="absolute w-full h-full z-[-1]" />
      <div className="h-full backdrop-blur-[50px] bg-gradient-to-b from-black/20 to-black">{children}</div>
    </div>
  ) : (
    <div className="absolute w-full h-full z-[-1] bg-black" {...attributes}>
      {children}
    </div>
  );
};

export default BackgroundImage;
