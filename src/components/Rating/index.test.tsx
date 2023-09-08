import React from 'react';

import { act, render, screen, within } from '@testing-library/react';

import { answerFabricator } from 'tests/fabricator';
import { Answer } from 'types/answer';
import { DisplayType } from 'types/question';

import Rating, { ratingDataTestIds } from '.';

describe('Rating', () => {
  const answers = answerFabricator.times(5);

  it('renders a rating component', () => {
    const ratingProps = {
      questionId: 'question-id',
      items: answers,
      displayType: DisplayType.Star,
    };

    const onValueChanged = () => {
      // Do nothing
    };

    console.log(answers);

    render(<Rating onValueChanged={onValueChanged} {...ratingProps} />);

    const rating = screen.getByTestId(ratingDataTestIds.base);

    expect(rating).toBeVisible();
  });

  describe('given the last value is clicked', () => {
    it('returns the proper value', () => {
      let selectedValue = '';
      const onValueChanged = (answer: Answer) => {
        selectedValue = answer.id;
      };
      const ratingProps = {
        questionId: 'question-id',
        items: answers,
        displayType: DisplayType.Star,
        onValueChanged: onValueChanged,
      };
      console.log(answers);

      render(<Rating {...ratingProps} />);

      const rating = screen.getByTestId(ratingDataTestIds.base);

      act(() =>
        within(rating)
          .getAllByRole('button', {
            name: '⭐️',
          })
          .at(4)
          ?.click()
      );

      expect(selectedValue).toBe('5');
    });
  });
});
