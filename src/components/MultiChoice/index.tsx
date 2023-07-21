import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import Checkbox from 'components/Checkbox';
import { Answer } from 'types/answer';

export const multiChoiceDataTestIds = {
  base: 'multi-choice__base',
};

interface MultiChoiceProps {
  items: Answer[];
  isPickOne: boolean;
  onValuesChanged: (answers: Answer[]) => void;
}

const MultiChoice = ({ items, isPickOne, onValuesChanged }: MultiChoiceProps): JSX.Element => {
  const [selectedValues, setSelectedValues] = useState<Answer[]>([]);

  const isSelected = (answer: Answer): boolean => {
    return !!selectedValues.find((item) => item.id === answer.id);
  };

  const getExtraClassNames = (answer: Answer): string => {
    return isSelected(answer) ? '' : 'opacity-50';
  };

  const DEFAULT_TEXT_CLASSNAMES = 'text-white text-[20px] leading-[25px] tracking-survey-wider self-end';

  const toggleCheckbox = (answer: Answer) => {
    let newSelectedValues = [];

    if (isSelected(answer)) {
      newSelectedValues = selectedValues.filter((currentAnswer) => currentAnswer.id !== answer.id);
    } else {
      if (isPickOne) {
        newSelectedValues = [answer];
      } else {
        newSelectedValues = [...selectedValues, answer];
      }
    }

    setSelectedValues(newSelectedValues);
    onValuesChanged(newSelectedValues);
  };

  useEffect(() => {
    setSelectedValues([]);
  }, []);

  return (
    <div className="flex flex-col w-full" data-test-id={multiChoiceDataTestIds.base}>
      {items.map((item, index) => (
        <div key={item.id} className="flex flex-col">
          <div role="presentation" className="flex justify-between mb-[13px] items-center" onClick={() => toggleCheckbox(item)}>
            <p className={classNames(DEFAULT_TEXT_CLASSNAMES, getExtraClassNames(item))}>{item.text}</p>
            <Checkbox isValueChecked={isSelected(item)} />
          </div>
          {index !== items.length - 1 && <div className="h-[0.5px] bg-white opacity-50 w-full mb-[13px]"></div>}
        </div>
      ))}
    </div>
  );
};

export default MultiChoice;
