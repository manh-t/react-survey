import React from 'react';

export const textAreaDataTestIds = {
  base: 'text-area__base',
};

type TextAreaProps = {
  onValueChange?: (value: string) => void;
};

const TextArea = ({ onValueChange }: TextAreaProps): JSX.Element => {
  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    onValueChange?.(event.target.value);
  };
  return (
    <textarea
      className="block appearance-none bg-white bg-opacity-[.18] rounded-[12px] w-full h-28 focus:outline-none focus:ring-transparent px-3 mt-2 py-3 text-white text-regular tracking-survey-tight focus:bg-opacity-30"
      onChange={handleOnChange}
      data-test-id={textAreaDataTestIds.base}
    />
  );
};

export default TextArea;
