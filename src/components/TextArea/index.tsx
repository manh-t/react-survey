import React from 'react';

import _get from 'lodash/get';

import { Answer } from 'types/answer';
import { AnswerRequest } from 'types/request/surveySubmitRequest';

export const textAreaDataTestIds = {
  base: 'text-area__base',
};

type TextAreaProps = {
  items: Answer[];
  onValueChange: (answerRequest: AnswerRequest) => void;
};

const TextArea = ({ items, onValueChange }: TextAreaProps): JSX.Element => {
  const currentAnswer = _get(items, 0);

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();

    const answerRequest = {
      id: currentAnswer?.id ?? '',
      answer: event.target.value,
    };
    onValueChange(answerRequest);
  };

  return (
    <textarea
      className="block appearance-none bg-white bg-opacity-[.18] rounded-[12px] w-full h-28 focus:outline-none focus:ring-transparent px-3 mt-2 py-3 text-white text-regular tracking-survey-tight focus:bg-opacity-30"
      placeholder={currentAnswer?.helpText}
      defaultValue={currentAnswer?.defaultValue}
      onChange={handleOnChange}
      data-test-id={textAreaDataTestIds.base}
    />
  );
};

export default TextArea;
