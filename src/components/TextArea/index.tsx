import React from 'react';

import _get from 'lodash/get';

import { Answer } from 'types/answer';

export const textAreaDataTestIds = {
  base: 'text-area__base',
};

type TextAreaProps = {
  questionId: string;
  items: Answer[];
  onValueChange?: (id: string, value: string) => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const TextArea = ({ questionId, items, onValueChange = () => {} }: TextAreaProps): JSX.Element => {
  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    const answerId = _get(items, 0)?.id ?? '';
    onValueChange?.(answerId, event.target.value);
  };

  return (
    <textarea
      id={`text-area-${questionId}`}
      className="block appearance-none bg-white bg-opacity-[.18] rounded-[12px] w-full h-28 focus:outline-none focus:ring-transparent px-3 mt-2 py-3 text-white text-regular tracking-survey-tight focus:bg-opacity-30"
      onChange={handleOnChange}
      data-test-id={textAreaDataTestIds.base}
    />
  );
};

export default TextArea;
