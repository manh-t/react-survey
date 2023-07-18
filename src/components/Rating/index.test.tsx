import React from 'react';

import { act, render, screen, within } from '@testing-library/react';

import { Answer } from 'types/answer';
import { DisplayType } from 'types/question';

import Rating, { ratingDataTestIds } from '.';

describe('Rating', () => {
  it('renders a rating component', () => {
    const ratingProps = {
      questionId: 'question-id',
      items: [
        { id: '1', resourceType: 'answer', text: 'sdf' },
        { id: '2', resourceType: 'answer', text: 'sdf' },
        { id: '3', resourceType: 'answer', text: 'sdf' },
        { id: '4', resourceType: 'answer', text: 'sdf' },
        { id: '5', resourceType: 'answer', text: 'sdf' },
      ],
      displayType: DisplayType.Star,
    };

    render(<Rating {...ratingProps} />);

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
        items: [
          { id: '1', resourceType: 'answer', text: 'sdf' },
          { id: '2', resourceType: 'answer', text: 'sdf' },
          { id: '3', resourceType: 'answer', text: 'sdf' },
          { id: '4', resourceType: 'answer', text: 'sdf' },
          { id: '5', resourceType: 'answer', text: 'sdf' },
        ],
        displayType: DisplayType.Star,
        onValueChanged: onValueChanged,
      };

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
