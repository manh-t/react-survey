import React from 'react';

import classnames from 'classnames';

interface ElevatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isFullWidth: boolean;
}

const ElevatedButton = ({ children, isFullWidth, ...attributes }: ElevatedButtonProps): JSX.Element => {
  const DEFAULT_CLASS_NAMES =
    'bg-white text-black-chinese font-bold text-regular tracking-survey-tight rounded-[10px] focus:outline-none focus:shadow-outline h-14';
  return (
    <button type="button" className={classnames(DEFAULT_CLASS_NAMES, { 'w-full': isFullWidth })} {...attributes}>
      {children}
    </button>
  );
};

export default ElevatedButton;
