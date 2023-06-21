import React from 'react';

interface ElevatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isFullSize: boolean;
}

const ElevatedButton = ({ children, isFullSize, ...attributes }: ElevatedButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className={
        'bg-white text-black-chinese font-bold text-regular rounded-[10px] focus:outline-none focus:shadow-outline h-14' +
        (isFullSize ? ' w-full' : '')
      }
      {...attributes}
    >
      {children}
    </button>
  );
};

export default ElevatedButton;
