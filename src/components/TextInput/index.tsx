import React from 'react';

interface TextInputProps {
  label?: string;
  inputAttributes: {
    id: string;
    type: string;
    required?: boolean;
    placeholder?: string;
    'data-test-id'?: string;
  };
}
const TextInput = ({ label, inputAttributes }: TextInputProps): JSX.Element => {
  return (
    <div>
      {label !== null && (
        <label className="text-white text-[15px] font-extrabold" htmlFor={inputAttributes.id}>
          {label}
        </label>
      )}
      <input
        {...inputAttributes}
        className="block appearance-none bg-white bg-opacity-[.18] rounded-[12px] w-full h-14 focus:outline-none focus:ring-transparent px-3 text-white text-[17px]"
        placeholder={inputAttributes.placeholder}
      />
    </div>
  );
};

export default TextInput;
