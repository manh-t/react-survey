import React, { useEffect, useState } from 'react';

import { Answer } from 'types/answer';
import { DisplayType } from 'types/question';

export const ratingDataTestIds = {
  base: 'rating__base',
};

interface RatingProps {
  questionId: string;
  items: Answer[];
  displayType: DisplayType;
  onValueChanged?: (answer: Answer) => void;
}

const Rating = ({ questionId, items, displayType, onValueChanged }: RatingProps): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOnSelectRating = (index: number, answer: Answer) => {
    setSelectedIndex(index);

    onValueChanged?.(answer);
  };

  const faceModes = ['😡', '😕', '😐', '🙂', '😄'];

  const generateDisplayTypeContent = (index: number): string => {
    switch (displayType) {
      case DisplayType.Heart:
        return '❤️';
      case DisplayType.Star:
        return '⭐️';
      case DisplayType.Smiley:
        return faceModes.at(index) ?? faceModes[4];
      case DisplayType.Thumbs:
      default:
        return '👍🏻';
    }
  };

  const buildClassAttribute = (index: number): string => {
    if (displayType === DisplayType.Smiley) {
      return selectedIndex === index ? '' : 'opacity-50';
    } else {
      return selectedIndex >= index ? '' : 'opacity-50';
    }
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [questionId]);

  return (
    <div
      className="flex justify-center text-large font-extrabold tracking-survey-tighter gap-4"
      data-test-id={ratingDataTestIds.base}
    >
      {items.map((item, index) => {
        return (
          <button key={item.id} className={buildClassAttribute(index)} onClick={() => handleOnSelectRating(index, item)}>
            {generateDisplayTypeContent(index)}
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
