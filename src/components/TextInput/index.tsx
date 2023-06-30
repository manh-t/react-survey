import React from 'react';

import classNames from 'classnames';

type TextInputProps = {
  label?: string;
  labelDataTestId?: string;
  inputAttributes: {
    id: string;
    type: string;
    required?: boolean;
    placeholder?: string;
    'data-test-id'?: string;
  };
  className?: string;
};

const TextInput = ({ label, labelDataTestId, inputAttributes, className }: TextInputProps): JSX.Element => {
  const DEFAULT_CLASS_NAMES =
    'block appearance-none bg-white bg-opacity-[.18] rounded-[12px] w-full h-14 focus:outline-none focus:ring-transparent px-3 mt-2 text-white text-regular tracking-survey-tight focus:bg-opacity-30';

  return (
    <div>
      {label !== null && (
        <label
          className="text-white text-small tracking-survey-normal font-extrabold"
          htmlFor={inputAttributes.id}
          data-test-id={labelDataTestId}
        >
          {label}
        </label>
      )}
      <input
        {...inputAttributes}
        className={classNames(DEFAULT_CLASS_NAMES, className)}
        placeholder={inputAttributes.placeholder}
      />
    </div>
  );
};

export default TextInput;
