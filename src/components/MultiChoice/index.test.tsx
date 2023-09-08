import React from 'react';

import { act, render, screen, within } from '@testing-library/react';

import { answerFabricator } from 'tests/fabricator';
import { Answer } from 'types/answer';

import MultiChoice, { multiChoiceDataTestIds } from '.';

describe('MultiChoice', () => {
  const answers = answerFabricator.times(3);

  it('renders a multi choice component', () => {
    render(
      <MultiChoice
        items={answers}
        isPickOne={false}
        onValuesChanged={() => {
          // Do nothing
        }}
      />
    );

    const multiChoice = screen.getByTestId(multiChoiceDataTestIds.base);

    expect(multiChoice).toBeVisible();
    expect(within(multiChoice).getAllByRole('presentation')).toHaveLength(3);
  });

  describe('given can pick many choices', () => {
    describe('given the first two items is clicked', () => {
      it('renders the first two components as checked state', () => {
        let selectedValues: Answer[] = [];

        const handleValuesChanged = (answers: Answer[]) => {
          selectedValues = answers;
        };

        render(<MultiChoice items={answers} isPickOne={false} onValuesChanged={(answers) => handleValuesChanged(answers)} />);

        const multiChoice = screen.getByTestId(multiChoiceDataTestIds.base);

        act(() => {
          within(multiChoice).getAllByRole('presentation').at(0)?.click();
        });

        act(() => {
          within(multiChoice).getAllByRole('presentation').at(1)?.click();
        });

        // The checked state of an item should NOT have `opacity-50` class
        expect(within(multiChoice).getByText(answers[0].text)).not.toHaveClass('opacity-50');
        expect(within(multiChoice).getByText(answers[1].text)).not.toHaveClass('opacity-50');
        expect(selectedValues).toHaveLength(2);
      });
    });
  });

  describe('given can pick one choice', () => {
    describe('given the first item is clicked', () => {
      it('renders the first component as checked state', () => {
        let selectedValues: Answer[] = [];

        const handleValuesChanged = (answers: Answer[]) => {
          selectedValues = answers;
        };

        render(<MultiChoice items={answers} isPickOne onValuesChanged={(answers) => handleValuesChanged(answers)} />);

        const multiChoice = screen.getByTestId(multiChoiceDataTestIds.base);

        act(() => {
          within(multiChoice).getAllByRole('presentation').at(0)?.click();
        });

        // The checked state of an item should NOT have `opacity-50` class
        expect(within(multiChoice).getByText(answers[0].text)).not.toHaveClass('opacity-50');
        expect(selectedValues).toHaveLength(1);
      });
    });
  });
});
