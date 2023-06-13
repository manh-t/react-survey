import React from 'react';

type TextInputProps = {
  label?: string;
  inputAttributes: {
    id: string;
    type: string;
    required?: boolean;
    placeholder?: string;
    'data-test-id'?: string;
  };
  extraClassName?: string;
};

const TextInput = ({ label, inputAttributes, extraClassName }: TextInputProps): JSX.Element => {
  return (
    <div>
      {label !== null && (
        <label className="text-white text-small font-extrabold" htmlFor={inputAttributes.id}>
          {label}
        </label>
      )}
      <input
        {...inputAttributes}
        className={
          'block appearance-none bg-white bg-opacity-[.18] rounded-[12px] w-full h-14 focus:outline-none focus:ring-transparent px-3 text-white text-regular ' +
          extraClassName
        }
        placeholder={inputAttributes.placeholder}
      />
    </div>
  );
};

export default TextInput;
