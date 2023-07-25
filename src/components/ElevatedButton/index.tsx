import React from 'react';

import classNames from 'classnames';

interface ElevatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isFullWidth: boolean;
  className?: string;
}

const ElevatedButton = ({
  children,
  isFullWidth,
  className = 'bg-white text-black-chinese',
  ...attributes
}: ElevatedButtonProps): JSX.Element => {
  const DEFAULT_CLASS_NAMES =
    'font-bold text-regular tracking-survey-tight rounded-[10px] focus:outline-none focus:shadow-outline h-14';

  return (
    <button
      type="button"
      className={classNames(DEFAULT_CLASS_NAMES, className, { 'w-full': isFullWidth, 'px-8': !isFullWidth })}
      {...attributes}
    >
      {children}
    </button>
  );
};

export default ElevatedButton;
