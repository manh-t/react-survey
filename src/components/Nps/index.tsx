import React, { useEffect, useState } from 'react';

import classNames from 'classnames';

import { Answer } from 'types/answer';

export const npsDataTestIds = {
  base: 'nps__base',
};

interface NpsProps {
  items: Answer[];
  onValuesChanged: (answers: Answer[]) => void;
}

const Nps = ({ items, onValuesChanged }: NpsProps): JSX.Element => {
  const [currentScore, setCurrentScore] = useState(Math.round(items.length / 2));

  const addBorders = (index: number): string => {
    let borderAttributes = '';
    if (index === 0) {
      borderAttributes = 'border-[1px] rounded-l-xl';
    } else if (index === items.length - 1) {
      borderAttributes = 'border-t-[1px] border-b-[1px] border-r-[1px] rounded-r-xl';
    } else {
      borderAttributes = 'border-t-[1px] border-b-[1px] border-r-[1px]';
    }
    return borderAttributes;
  };

  const onScoreChanged = (index: number) => {
    const selectedValues = items.slice(0, index + 1);
    setCurrentScore(index);
    onValuesChanged(selectedValues);
  };

  useEffect(() => {
    setCurrentScore(Math.round(items.length / 2));
  }, [items]);

  return (
    <div className="flex justify-center" data-test-id={npsDataTestIds.base}>
      <div className="flex flex-col w-[335px]">
        <div className="flex justify-center h-[56px]">
          {items.map((item, index) => (
            <div key={item.id} className={classNames('border-white border-opacity-50', addBorders(index))}>
              <button
                className={classNames('px-[11px] py-[18px] text-white', { 'opacity-50': index > currentScore })}
                onClick={() => onScoreChanged(index)}
              >
                {index + 1}
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between font-extrabold text-regular tracking-survey-tight mt-4">
          <div className="text-white/50">Not at all Likely</div>
          <div className="text-white">Extremely Likely</div>
        </div>
      </div>
    </div>
  );
};

export default Nps;
