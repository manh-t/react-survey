import React, { useEffect, useState } from 'react';

import TextInput from 'components/TextInput';
import { Answer } from 'types/answer';
import { AnswerRequest } from 'types/request/surveySubmitRequest';

interface MultiInputProps {
  questionId: string;
  items: Answer[];
  onValuesChanged?: (answers: AnswerRequest[]) => void;
  'data-test-id'?: string;
}
const MultiInputs = ({ questionId, items, onValuesChanged, ...rest }: MultiInputProps): JSX.Element => {
  const [selectedValues, setSelectedValues] = useState<AnswerRequest[]>([]);

  const handleValuesChanged = (answer: Answer, content: string) => {
    const newSelectedValues = selectedValues;
    const itemIndex = newSelectedValues.findIndex((value) => value.id === answer.id);
    if (itemIndex !== -1) {
      newSelectedValues[itemIndex].answer = content;
    }
    setSelectedValues(newSelectedValues);
    onValuesChanged?.(newSelectedValues);
  };

  useEffect(() => {
    const newSelectedValues: AnswerRequest[] = [];
    for (let i = 0; i < items.length; i++) {
      newSelectedValues.push({
        id: items[i].id,
        answer: '',
      });
    }
    setSelectedValues(newSelectedValues);
  }, [questionId, items]);

  return (
    <div id={`multi-inputs-${questionId}`} {...rest}>
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
