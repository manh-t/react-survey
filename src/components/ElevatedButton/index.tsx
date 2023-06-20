import React from 'react';

interface ElevatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isFullSize: boolean;
}

const ElevatedButton = ({ children, isFullSize, ...attributes }: ElevatedButtonProps): JSX.Element => {
  const fullWidth = isFullSize ? 'w-full' : '';
  return (
    <button
      type="button"
      className={`bg-white text-black-chinese font-bold text-regular rounded-[10px] focus:outline-none focus:shadow-outline h-14 ${fullWidth}`}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default ElevatedButton;
