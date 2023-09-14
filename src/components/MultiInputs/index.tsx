import React, { useState } from 'react';

import TextInput from 'components/TextInput';
import { Answer } from 'types/answer';
import { AnswerRequest } from 'types/request/surveySubmitRequest';

export const multiInputsDataTestIds = {
  base: 'multi-inputs__base',
};

interface MultiInputProps {
  questionId: string;
  items: Answer[];
  onValuesChanged: (answers: AnswerRequest[]) => void;
}
const MultiInputs = ({ items, onValuesChanged }: MultiInputProps): JSX.Element => {
  const [selectedValues, setSelectedValues] = useState<AnswerRequest[]>([]);

  const handleValuesChanged = (answer: Answer, content: string) => {
    const newSelectedValues = [
      ...selectedValues.filter((value) => value.id !== answer.id),
      {
        id: answer.id,
        answer: content,
      },
    ];
    setSelectedValues(newSelectedValues);
    onValuesChanged(newSelectedValues);
  };

  return (
    <div data-test-id={multiInputsDataTestIds.base}>
      {items.map((item) => (
        <div key={item.id}>
          <TextInput
            inputAttributes={{
              id: `answer-text-input__${item.id}`,
              required: true,
              type: 'text',
              placeholder: item.text,
              onChange: (event) => handleValuesChanged(item, event.target.value),
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default MultiInputs;
